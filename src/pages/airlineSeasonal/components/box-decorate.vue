<!--模块样式修饰器-->
<template>
    <div class="line-box">
        <i class="t diy"></i>
        <i class="r diy"></i>
        <i class="b"></i>
        <i class="l"></i>
    </div>
</template>
<style lang="less" scoped>
@borderColor: #e9cda2;
.line-box {
    i {
        display: block;
        position: absolute;
        border-style: solid;
        border-width: 1px;
        border-color: @borderColor transparent transparent @borderColor;
        height: 10px;
        width: 10px;
        &.t {
            left: 0;
            top: 0;
            &.diy {
                background: url(./../../../assets/img/airlineSeasonal/box-l.png) no-repeat;
                height: 2rem;
                width: 2rem;
                border: none;
                left: -2px;
                top:-2px;
            }
        }

        &.r {
            right: 0;
            top: 0;
            border-color: @borderColor @borderColor transparent transparent;
             &.diy {
                background: url(./../../../assets/img/airlineSeasonal/box-r.png) no-repeat right top;
                height: 2rem;
                width: 2rem;
                border: none;
                right: -2px;
                top:-2px;
            }
        }
        &.b {
            border-color: transparent @borderColor @borderColor transparent;
            bottom: 0;
            right: 0;
        }
        &.l {
            border-color: transparent transparent @borderColor @borderColor;
            bottom: 0;
            left: 0;
        }
    }
}
</style>
