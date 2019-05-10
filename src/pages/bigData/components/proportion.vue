<template>
    <!-- 占比 -->
    <div class="proportion-warp">
        <div class="flex flex-yc">
            <div class="proportion-flight proportion-box">
                <h4 class="title">机型占比</h4>
                <div class="proportion-body flex flex-between">
                    <div class="proportion-tag flex flex-yc">
                        <p
                            class="font-nun"
                            v-for="(item,index) in flightData"
                            :key="index"
                            v-if="index<4"
                        >
                            <span :style="{background:flightColor[index]}">{{item[0]}}</span>{{item[1]}}%</p>
                    </div>
                    <div class="proportion-circle">
                        <canvas id="flightCanvas"></canvas>
                        <div id="canvas-box"></div>
                    </div>
                    <div class="proportion-tag flex flex-end">
                        <p
                            class="font-nun right"
                            v-for="(item,index) in flightData"
                            :key="index"
                            v-if="index>=4"
                        >
                            <span :style="{background:flightColor[index]}">{{item[0]}}</span>
                            {{item[1]}}%
                        </p>
                    </div>
                </div>
            </div>
            <div class="proportion-train proportion-box">
                <h4 class="title">车型占比</h4>
                <div class="proportion-body flex flex-between">
                    <div class="proportion-tag flex flex-yc">
                        <p
                            class="font-nun"
                            v-for="(item,index) in trianData"
                            :key="index"
                            v-if="index<4"
                        >
                            <span :style="{background:trianColor[index]}">{{item[0]}}</span>{{item[1]}}%</p>
                    </div>
                    <div class="proportion-circle">
                        <canvas id="trainCanvas"></canvas>
                    </div>
                    <div class="proportion-tag flex  flex-end">
                        <p
                            class="font-nun right"
                            v-for="(item,index) in trianData"
                            :key="index"
                            v-if="index>=4"
                        >
                            <span :style="{background:trianColor[index]}">{{item[0]}}</span>{{item[1]}}%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import data from "./../data";

function Circle(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
    this.radius = radius; // 圆环半径
    this.lineWidth = lineWidth; // 圆环边的宽度
    this.strokeStyle = strokeStyle; //边的颜色
    this.fillStyle = fillStyleArray; //填充色
    this.lineCap = capType;
}
Circle.prototype.draw = function(ctx, criclex, cricley) {
    ctx.beginPath();
    ctx.arc(criclex, cricley, this.radius, 0, Math.PI * 2, true); // 坐标为90的圆，这里起始角度是0，结束角度是Math.PI*2
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    ctx.stroke(); // 这里用stroke画一个空心圆，想填充颜色的童鞋可以用fill方法
};
function Ring(radius, lineWidth, strokeStyle, fillStyleArray, capType) {
    Circle.call(this, radius, lineWidth, strokeStyle, fillStyleArray, capType);
}
Ring.prototype = Object.create(Circle.prototype);

Ring.prototype.drawRing = function(
    ctx,
    startAngle,
    percentArray,
    criclex,
    cricley
) {
    startAngle = startAngle;
    percentArray = percentArray || [];

    this.draw(ctx, criclex, cricley); // 调用Circle的draw方法画圈圈
    var _this = this;
    ctx.beginPath();
    ctx.arc(criclex, cricley, _this.radius +13, 0, 2 * Math.PI, true);
    ctx.strokeStyle = _this.strokeStyle=="#5A01BF"? "rgba(147,75,225,.35)":'rgba(65,115,255,.35)';
    ctx.fillStyle = "transparent";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(criclex, cricley, _this.radius -12, 0, 2 * Math.PI, true);
    ctx.strokeStyle =  _this.strokeStyle=="#5A01BF"? "rgba(147,75,225,.35)":'rgba(65,115,255,.35)';
    ctx.fillStyle = "transparent";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    // angle
    percentArray.forEach(function(item, index) {
        ctx.beginPath();
        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";
        var anglePerSec = (2 * Math.PI) / (100 / item);
        ctx.arc(
            criclex,
            cricley,
            _this.radius,
            startAngle,
            startAngle + anglePerSec,
            false
        );
        let clen=_this.fillStyle.length-1;
        startAngle = startAngle+anglePerSec;
        ctx.strokeStyle = _this.fillStyle[index];
        ctx.lineCap = _this.lineCap;
        ctx.stroke();

        ctx.closePath();
    });

};
export default {
    data() {
        return {
            flightData: data.proportion.flight,
            trianData: data.proportion.train,
            flightColor: [
                "#F94A6F",
                "#EE0082",
                "#FF40C2",
                "#FF47F8",
                "#B608C8",
                 "#934AE1",
                "#6200D8",

            ],
            trianColor: [
                "#1900FF",
                "#005AFF",
                "#007FFF",
                "#00C2FF",
                "#00C2FF",
                "#00F0FF",
                "#31FFF6"
            ],
        };
    },
    props: {},
    mounted() {
        var flightHight = document.getElementById("canvas-box").offsetWidth;
        var flightCanvas = document.getElementById("flightCanvas");
        flightCanvas.width = flightHight;
        flightCanvas.height = flightHight;
        var fctx = flightCanvas.getContext("2d");
        var ring = new Ring(
            flightHight / 2 - 25,
            "25",
            "#5A01BF",
             this.flightColor,
            "round"
        );
        ring.drawRing(
            fctx,
            1.5 * Math.PI,
            this.getValue(this.flightData),
            flightHight / 2,
            flightHight / 2
        ); //

        var trainCanvas = document.getElementById("trainCanvas");
        var sctx = trainCanvas.getContext("2d");
        trainCanvas.width = flightHight;
        trainCanvas.height = flightHight;
        var ring = new Ring(
            flightHight / 2 - 25,
            "25",
             "#221EAC",
            this.trianColor,
            "round"
        );
        ring.drawRing(
            sctx,
            1.5 * Math.PI,
            this.getValue(this.trianData),
            flightHight / 2,
            flightHight / 2
        ); //
    },
    methods: {
        getValue(obj) {
            let arr = [];
            for (let i in obj) {
              if(i<7){
                arr.push(obj[i][1]);
              }
            }
            return arr;
        }
    }
};
</script>

