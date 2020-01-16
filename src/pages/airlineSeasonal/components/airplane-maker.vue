<template>
    <!-- 飞机制造商及机型分布 -->
    <div class="model-item">
        <boxDecorate></boxDecorate>
        <div class="model-title flex flex-yc">飞机制造商及机型分布</div>
        <div class="model-body">
            <div class="airplane-maker flex flex-yc flex-between">
                <div class="left flex flex-yc" v-if="models.length > 0">
                    <div
                        class="item flex flex-yc flex-between"
                        v-for="(item,index) in cmodels"
                        :key="index"
                    >
                        <p class="name">{{item.model}}</p>
                        <p class="line">
                            <span :style="{width:item.rate+'%'}"></span>
                        </p>
                        <p class="num">{{item.rate}}%</p>
                    </div>
                </div>
                <div class="chart">
                    <div class="cl flex flex-yc">
                        <p class="t">空客占比<span>100%</span></p>
                    </div>
                </div>
            </div>
            <div class="plane-item">
                <div class="flex flex-yc flex-between">
                    <div class="plane-img">
                        <img src="@/assets/img/airlineSeasonal/319-100.png" alt />
                    </div>
                    <div class="chart">
                        <happyIndex :index="index1" class="plane-chart"></happyIndex>
                    </div>
                </div>
                <div class="des flex flex-yc flex-between">
                    <p>飞机机型：A319-100</p>
                    <p>平均机龄：11.1年</p>
                    <p>座位布局：3-3</p>
                </div>
            </div>
            <div class="plane-item">
                <div class="flex flex-yc flex-between">
                    <div class="plane-img">
                        <img src="@/assets/img/airlineSeasonal/320-200.png" alt />
                    </div>
                    <div class="chart">
                        <happyIndex :index="index2" class="plane-chart"></happyIndex>
                    </div>
                </div>
                <div class="des flex flex-yc flex-between">
                    <p>飞机机型：A320-200</p>
                    <p>平均机龄：6.7年</p>
                    <p>座位布局：3-3</p>
                </div>
            </div>
            <div class="plane-item">
                <div class="flex flex-yc flex-between">
                    <div class="plane-img">
                        <img src="@/assets/img/airlineSeasonal/320-neo.png" alt />
                    </div>
                    <div class="chart">
                        <happyIndex :index="index3" class="plane-chart"></happyIndex>
                    </div>
                </div>
                <div class="des flex flex-yc flex-between">
                    <p>飞机机型：A320-NEO</p>
                    <p>平均机龄：1.1年</p>
                    <p>座位布局：3-3</p>
                </div>
            </div>
            <div class="plane-item">
                <div class="flex flex-yc flex-between">
                    <div class="plane-img">
                        <img src="@/assets/img/airlineSeasonal/321-200.png" alt />
                    </div>
                    <div class="chart">
                        <happyIndex :index="index4" class="plane-chart"></happyIndex>
                    </div>
                </div>
                <div class="des flex flex-yc flex-between">
                    <p>飞机机型：A321-200</p>
                    <p>平均机龄：2.8年</p>
                    <p>座位布局：3-3</p>
                </div>
            </div>
            <div class="plane-item">
                <div class="flex flex-yc flex-between">
                    <div class="plane-img">
                        <img src="@/assets/img/airlineSeasonal/330-200.png" alt />
                    </div>
                    <div class="chart">
                        <happyIndex :index="index5" class="plane-chart"></happyIndex>
                    </div>
                </div>
                <div class="des flex flex-yc flex-between">
                    <p>飞机机型：A330-200</p>
                    <p>平均机龄：2.8年</p>
                    <p>座位布局：2-4-2</p>
                </div>
            </div>
            <div class="plane-item">
                <div class="flex flex-yc flex-between">
                    <div class="plane-img">
                        <img src="@/assets/img/airlineSeasonal/330-300.png" alt />
                    </div>
                    <div class="chart">
                        <happyIndex :index="index6" class="plane-chart"></happyIndex>
                    </div>
                </div>
                <div class="des flex flex-yc flex-between">
                    <p>飞机机型：A330-300</p>
                    <p>平均机龄：2.3年</p>
                    <p>座位布局：2-4-2</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import boxDecorate from "./box-decorate";
import happyIndex from "./happy-index";
let colors = ["#FA4B4D", "#F1DB8B", "#44D024", "#1CE3FF", "#3F86E5", "#FFAD05"];

export default {
    props: {
        models: {
            type: Array,
            default: () => []
        },
        markers: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        models(val) {
            this.setOption();
        }
    },
    data() {
        return {
            colors: colors,
            cmodels: [],
            cmarker: [],
            options: {},
            index1: [3.5, 1.0, 1.0, 2.0, 3.0],
            index2: [3.5, 1.5, 1.0, 2.0, 3.0],
            index3: [3.0, 1.0, 5, 2.0, 3.0],
            index4: [4.0, 1.5, 3, 2.0, 3.0],
            index5: [4.5, 5.0, 3.5, 3.0, 3.5],
            index6: [4.5, 5.0, 5.0, 3.5, 4.0]
        };
    },
    mounted() {
        this.setOption();
    },
    methods: {
        covertModelData() {
            let temp = [];
            let num = 100;
            for (var key in this.models) {
                let item = this.models[key];

                if (item.model != "unknown") {
                    temp.push(item);
                    num = num - item.rate;
                }
            }
            // console.log(num)
            // if (num != 0) {
            //     temp.push({
            //         model: "其它",
            //         rate: num.toFixed(2)
            //     });
            // }

            this.cmodels = temp;
        },
        covertMakerData() {
            let temp = [];
            temp.push({
                value: "100",
                name: "100%",
                marker: "空客"
            });

            this.cmarker = temp;
        },
        setOption() {
            this.covertModelData();

        }
    },
    components: {
        boxDecorate,
        happyIndex,
    }
};
</script>
<style lang="less" scoped>
.airplane-maker {
    position: relative;
    padding: 1vh;
    .left {
        width: 55%;
        margin-right: 1vw;
        margin-left: 1vw;
        overflow: hidden;
        height: 15vh;
        flex-wrap: wrap;
    }
    .chart {
        position: absolute;
        width: 50%;
        height: 100%;
        right: 0;
        top: 0;
        text-align: center;
        .cl{
            width: 12vh;
            height: 12vh;
            border: 1rem solid#FA4B4D;
            border-radius: 100%;
            font-size: 1.133rem;
            margin: 2rem 0 0 5rem;
            text-align: center;
            .t{width: 100%;}
            span{font-size: 1.66rem;display: block;}
        }
    }
    .flight-chart {
        width: 100%;
        height: 80%;
        margin: 0 auto;
    }
    .item {
        position: relative;
        font-size: 1.25rem;
        width: 100%;
        .name {
            width: 20%;
        }
        .num {
            width: 30%;
        }
        .line {
            width: 6vw;
            height: 6px;
            margin: 0 0.5vw 0 0.5vw;
            position: relative;
            background: rgba(31, 228, 255, 0.1);
            border-radius: 3px;
            span {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    rgba(250, 75, 77, 0.2),
                    rgba(250, 75, 77, 1)
                );
                border-radius: 3px;
            }
        }
    }
    .info {
        font-size: 1.16rem;
        color: #fff;
        p {
            display: inline-block;
            span {
                width: 0.5rem;
                height: 0.5rem;
                background: #fff;
                margin: 0 0.2rem 0 1.2rem;
                display: inline-block;
            }
        }
    }
}
.plane-item {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding:2vh 5% 1vh;
    height: 12.5vh;
    position: relative;

    .des {
        margin-top: 0.8rem;
        color: #fff;
        font-size: 1rem;
        position: absolute;
        bottom: 0.5rem;
        left: 1rem;
        right: 1rem;
    }
    .plane-img {
        width: 45%;
        text-align: right;
        img {
            height: 5.2vh;
            width: auto;
        }
    }
    .chart {
        height: 9vh;
        width: 50%;
        position: absolute;
        right: 0;
        top: 0.5rem;
    }
    .plane-chart {
        width: 100%;
        height: 100%;
    }
}
</style>
