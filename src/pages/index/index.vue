<!--首页-->
<template>
    <div class="pages">
        <Header></Header>
        <Map :data="dataRoute.datas" v-if="dataRoute"></Map>
        <!-- 搜索面板 -->
        <div class="search-panel" :class="{'hide':showSearch}">
            <div class="panel-contorl abs" @click="showSearch=!showSearch">
                <i class="iconfont" :class="{'iconsousuo':showSearch,'iconleft':!showSearch}"></i>
                查询
            </div>
            <div class="main-box">
                <div class="main-type flex flex-yc">
                    <label>查询类型</label>
                    <el-radio
                        v-model="searchType"
                        v-for="(item,index) in searchTypeOption"
                        :key="'s'+index"
                        :label="item[0]"
                        :disabled="item[0]!=1"
                    >{{item[1]}}</el-radio>
                </div>
                <div class="main-body">
                    <div class="item flex flex-yc">
                        <label>出发地</label>
                        <div class="item-input">
                            <el-select v-model="dep" filterable placeholder="请选择出发城市"></el-select>
                        </div>
                    </div>
                    <div class="item flex flex-yc">
                        <label>目的地</label>
                        <div class="item-input">
                            <el-select v-model="arr" filterable placeholder="请选择"></el-select>
                        </div>
                    </div>
                    <div class="item flex flex-yc">
                        <label>出行日期</label>
                        <div class="item-input">
                            <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
                        </div>
                    </div>
                    <button type="button" @click="getData">查询</button>
                </div>
            </div>
        </div>
        <!-- 结果展示面板 -->
        <div class="routes-panel" v-if="dataRoute">
            <div class="routes-warp">
                <happy-scroll color="rgba(0,0,0,.5)">
                    <recommendRoute :data="dataRoute.happy" :title="'最为舒适'"></recommendRoute>
                    <recommendRoute :data="dataRoute.early" :title="'最早到达'"></recommendRoute>
                    <recommendRoute :data="dataRoute.cheap" :title="'价格最低'"></recommendRoute>
                    <recommendRoute :data="dataRoute.short" :title="'最短时长'"></recommendRoute>
                </happy-scroll>
                <all :data="dataRoute.datas" :active="showAll" @back="showAll=false"></all>
            </div>
            <div class="intro flex flex-between" @click="showAll=true">
                <p>共涉及{{dataRoute.lines.length}}种行程路线、{{dataRoute.datas.length}}种出行方案</p>
                <p>
                    查看所有方案
                    <i class="iconfont iconright"></i>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/header";
import recommendRoute from "./components/recommend-route";
import Map from "./components/map";
import all from "./components/all";
import dataRoute from "./data";
import cityGps from "@/service/cityDict";
import { HappyScroll } from "vue-happy-scroll";
import "vue-happy-scroll/docs/happy-scroll.css";
import { getIndexData } from "@/service/getData";
import { Loading } from "element-ui";

export default {
    components: {
        Header,
        recommendRoute,
        all,
        HappyScroll,
        Map
    },
    data() {
        return {
            showSearch: true,
            dataRoute: null,
            showAll: false,
            searchType: 1,
            searchTypeOption: [[1, "Air-Rail"], [2, "Air"], [3, "Rail"]],
            date: "",
            dep: "",
            arr: "",
            cityGps: cityGps,
            loading: null
        };
    },

    mounted() {
        this.loading = Loading.service({
            lock: true,
            text: "正在加载数据...",
            background: "rgba(0, 0, 0, 0.5)"
        });
        this.getData();
    },
    methods: {
        getData() {
            let obj = {
                type: this.type,
                dep: this.dep,
                arr: this.arr,
                date: this.date
            };
            this.dataRoute = dataRoute;
            setTimeout(() => {
                this.loading.close();
            }, 4000);
            return;
            getIndexData(obj).then(res => {
                this.dataRoute = dataRoute;
            });
        }
    }
};
</script>
<style lang="less" scoped>
.autocomplete-input {
    border: 1px solid #000;
    height: 30px;
}
.search-panel {
    position: fixed;
    width: 360px;
    height: 440px;
    background: rgb(255, 255, 255, 1);
    box-shadow: 0px 3px 9px 1px rgba(17, 70, 188, 0.09),
        0px -3px 9px 1px rgba(17, 70, 188, 0.09);
    z-index: 10;
    top: 150px;
    left: 0;
    transition: left 0.5s;
    &.hide {
        left: -360px;
        transition: left 0.5s;
    }
    .main-box {
        margin: 20px;
        .main-type {
            border-bottom: 1px dashed #d3d3d3;
            line-height: 58px;
            span {
                display: inline-block;
                padding-left: 25px;
                padding-right: 10px;
                position: relative;
                &:before {
                    content: "";
                    position: absolute;
                    left: 0;
                    height: 14px;
                    width: 14px;
                    border-radius: 100%;
                    border: 1px solid #e9e9e9;
                    top: 50%;
                    margin-top: -7.5px;
                }
                &.active {
                    &::before {
                        border-color: #1146bc;
                    }
                    &:after {
                        content: "";
                        position: absolute;
                        left: 4px;
                        height: 7px;
                        width: 7px;
                        border-radius: 100%;
                        top: 50%;
                        background: #1146bc;
                        margin-top: -3.5px;
                    }
                }
            }
        }
        label {
            font-size: 16px;
            color: #333;
            width: 80px;
            margin-right: 10px;
        }
    }
    .el-select {
        display: block;
    }
    .el-date-editor.el-input {
        width: 100%;
    }
    .main-body {
        .item {
            padding: 30px 0 0 0;
            .item-input {
                height: 40px;
                width: 95%;
                input {
                    width: 100%;
                    line-height: 40px;
                    background: none;
                }
            }
        }
        button {
            background-color: #1146bc;
            color: #fff;
            width: 100%;
            margin-top: 50px;
            height: 40px;
            line-height: 40px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 400px;
        }
    }
}
.panel-contorl {
    background: #1146bc;
    cursor: pointer;
    height: 140px;
    width: 50px;
    padding: 30px 15px;
    right: -51px;
    top: 50%;
    margin-top: -70px;
    box-shadow: 2px 3px 18px 0px #6186d6;
    i {
        display: block;
        font-size: 24px;
    }
    color: #fff;
    font-size: 18px;
    border-radius: 5px;
}
.routes-panel {
    width: 538px;
    height: 80vh;
    // display: none;
    position: fixed;
    right: 10px;
    top: 120px;
    background: #fff;
    padding-bottom: 40px;
    z-index: 9;
    box-shadow: 0px 3px 9px 1px rgba(17, 70, 188, 0.09),
        0px -3px 9px 1px rgba(17, 70, 188, 0.09);
    border-radius: 10px;
    padding: 26px 0 0;
    overflow: hidden;
    .panel-warp {
        height: 100%;
        overflow: hidden;
    }
    .intro {
        font-weight: bold;
        position: absolute;
        bottom: 0;
        background: #1146bc;
        width: 100%;
        left: 0;
        height: 40px;
        line-height: 40px;
        padding: 0 4%;
        color: #fff;
        z-index: 9;
    }
}
.routes-warp {
    padding-bottom: 90px;
    height: 80vh;
    overflow: hidden;
}
</style>

