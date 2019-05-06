<template>
    <div class="top-routes" v-if="data.length>0">
        <div class="top flex flex-yc flex-between">
            <p>{{title}}:</p>
            <p>{{data[0].arrPlanTime.slice(8,10)}}日{{data[0].arrPlanTime.slice(11,16)}}到达</p>
            <p>全程21小时21分</p>
            <p>约{{data[0].price||'--'}}元</p>
        </div>
        <div class="list">
            <div class="list-item" v-for="(item,index) in data" :key="index">
                <div class="top-sub flex flex-yc flex-between">
                    <p>
                        {{stationCoord.city(item.routes[0].type,item.routes[0].depCode)}}
                        <span>{{item.routes[0].depPlanTime.slice(11,16)}}</span>
                    </p>
                    <p>
                        <i v-if="item.routes[0].type=='t'" class="iconfont iconhuoche"></i>
                        <i v-else class="iconfont iconhangban"></i>
                    </p>
                    <p>
                        {{stationCoord.city(item.routes[0].type,item.routes[0].arrCode)}}
                        <span>{{item.routes[0].arrPlanTime.slice(11,16)}}</span>
                    </p>
                    <p>
                        <i v-if="item.routes[1].type=='t'" class="iconfont iconhuoche"></i>
                        <i v-else class="iconfont iconhangban"></i>
                    </p>
                    <p>
                        {{stationCoord.city(item.routes[1].type,item.routes[1].arrCode)}}
                        <span>{{item.routes[1].arrPlanTime.slice(11,16)}}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { stationCoord} from "@/config/utils";
export default {
    data() {
        return {
            stationCoord: stationCoord
        };
    },
    props: {
        title: {
            type: String,
            default: ""
        },
        data: {
            type: Array,
            default: ""
        }
    },
    mounted() {},
    methods: {
        //转换时间
        coverTime(time) {}
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
</style>

