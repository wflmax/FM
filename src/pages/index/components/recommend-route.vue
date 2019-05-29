<template>
    <div class="top-routes" v-if="data.length>0">
        <div class="top flex flex-yc flex-between">
            <p>{{title}}:</p>
            <p>{{formatDay_zh(data[0].arrPlanTime,'arrTime')}} 到达</p>
            <p>全程约{{coverMin(data[0].planCost)}}</p>
            <p>约{{data[0].price||'--'}}元</p>
        </div>
        <div class="list">
            <div class="list-item" v-for="(item,index) in list" :key="index">
                <div class="top-sub flex flex-yc flex-between" @click="showSub(item)">
                    <p class="dep city">
                        {{stationCoord.city(item.routes[0].type,item.routes[0].depCode)}}
                        <span>{{item.routes[0].depPlanTime.slice(11,16)}}</span>
                    </p>
                    <p>
                        <i v-if="item.routes[0].type=='t'" class="iconfont iconhuoche"></i>
                        <i v-else class="iconfont iconhangban"></i>
                    </p>
                    <p class="change city">
                        {{stationCoord.city(item.routes[0].type,item.routes[0].arrCode)}}
                        <span>{{item.routes[0].arrPlanTime.slice(11,16)}}</span>
                    </p>
                    <p>
                        <i v-if="item.routes[1].type=='t'" class="iconfont iconhuoche"></i>
                        <i v-else class="iconfont iconhangban"></i>
                    </p>
                    <p class="arr city">
                        {{stationCoord.city(item.routes[1].type,item.routes[1].arrCode)}}
                        <span>{{item.routes[1].arrPlanTime.slice(11,16)}}</span>
                    </p>
                </div>
                <!-- 二级详情 -->
                <div class="sub-list" v-show="item.show">
                    <div v-for="(subItem,subIndex) in item.routes" :key="subIndex">
                        <div class="sub-item">
                            <span class="tag">第{{routeCN[subIndex]}}程</span>
                            <p class="sub-header flex flex-yc flex-between">
                                <span
                                    class="date"
                                >{{formatDay_zh(subItem.depPlanTime)}} {{formatWeekday(subItem.depPlanTime)}}</span>
                                <span class="trans">波音737-800 经济舱</span>
                            </p>
                            <!-- {{item}} -->
                            <div class="sub-info flex flex-between">
                                <p class="dep city">
                                    {{stationCoord.name(subItem.type,subItem.depCode)}}
                                    <span>{{subItem.depPlanTime.slice(11,16)}}</span>
                                </p>
                                <p class="during">
                                    <template
                                        v-if="subItem.type=='f'"
                                    >{{subItem.flightNo}} ({{subItem.aircraftModel}})</template>
                                    <template v-else>{{subItem.trainNo}} ({{subItem.trainType}})</template>
                                    <span>{{routeTime(subItem.depPlanTime,subItem.arrPlanTime)}}</span>
                                </p>
                                <p class="arr city">
                                    {{stationCoord.name(subItem.type,subItem.arrCode)}}
                                    <span>{{subItem.arrPlanTime.slice(11,16)}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="sub-item trans-item" v-if="subIndex!=item.routes.length-1">
                            <span class="tag">衔接</span>
                            <p class="sub-header flex flex-yc flex-between">
                                <span
                                    class="date"
                                >{{formatDay_zh(subItem.arrPlanTime)}} {{formatWeekday(subItem.arrPlanTime)}}</span>
                            </p>
                            <div class="sub-info flex flex-between">
                                <p class="dep city">
                                    {{stationCoord.name(subItem.type,subItem.arrCode)}}
                                    <span>{{subItem.arrPlanTime.slice(11,16)}}</span>
                                </p>
                                <p class="during">
                                    {{item.transferType}}
                                    <span>{{routeTime(item.transferDepTime,item.transferArrTime)}}</span>
                                </p>
                                <p class="arr city">
                                    {{stationCoord.name(item.routes[subIndex+1].type,item.routes[subIndex+1].depCode)}}
                                    <span>{{item.routes[subIndex+1].depPlanTime.slice(11,16)}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <input type="hidden" v-model="hiddenData">
    </div>
</template>

<script>
import {
    stationCoord,
    coverMin,
    formatDay_zh,
    formatWeekday,
    routeTime
} from "@/config/utils";
export default {
    data() {
        return {
            stationCoord: stationCoord,
            coverMin: coverMin,
            formatDay_zh: formatDay_zh,
            formatWeekday: formatWeekday,
            routeTime: routeTime,
            routeCN: {
                0: "一",
                1: "二"
            },
            list:[],
            hiddenData:1
        };
    },
    props: {
        title: {
            type: String,
            default: ""
        },
        data: {
            type: Array
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData(){
            let data=this.data;
           for (let i=0,row; row=data[i]; i++) {
					//决定哪些列表可以下拉刷新
					row.show = false;
				}
            this.list=data;


        },
        showSub(item){
            item.show=!item.show;
            this.hiddenData=!this.hiddenData;
        }
    }
};
</script>
<style lang="less" scoped>
.top-routes {
    width: 525px;
}

.top {
    margin: 0 20px 20px;
    font-size: 16px;
    font-weight: bold;
}
.list-item {
    background: #fff;
    box-shadow: 0 0 18px 2px rgba(216, 212, 212, 0.4);
    padding: 20px 25px;
    border-radius: 5px;
    margin: 20px;
    .city {
        width: 30%;
        &.dep {
            text-align: left;
        }
        &.arr {
            text-align: right;
        }
    }
    .top-sub {
        span {
            display: block;
            padding-top: 10px;
        }
        text-align: center;
    }
    .iconfont {
        font-size: 30px;
        color: #f1656a;
        &.iconhuoche {
            color: #1ebbef;
        }
    }
}
.sub-list {
    border-top: 1px solid #e3e3e3;
    margin-top: 20px;
    padding: 0 20px;
    .sub-item {
        border-bottom: 1px solid #e3e3e3;
        padding: 13px 0 13px 60px;
        position: relative;
        &:nth-last-child(1) {
            // border: none;
        }
        .tag {
            position: absolute;
            left: 0;
            width: 25px;
            height: 80px;
            padding-top: 10px;
            margin-top: -40px;
            top: 50%;
            font-size: 14px;
            text-align: center;
            border: 1px solid #e3e3e3;
        }
        .sub-header {
            margin-bottom: 20px;
        }
        .sub-info {
            text-align: center;
            span {
                display: block;
                padding-top: 10px;
            }
            .during {
                position: relative;
                width: 60%;
                &::after {
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 1px;
                    background: #e3e3e3;
                    top: 50%;
                    left: 0;
                }
            }
        }
        &.trans-item {
            .tag {
                padding-top: 20px;
            }
        }
    }
}
</style>

