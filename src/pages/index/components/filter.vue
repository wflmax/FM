<template>
    <div class="filter-box">
        <div class="title flex flex-between">
            <div class="f-title">
                选择时间段
                <div class="f-box">
                  div
                    <span @click="setFilter()">8点以前</span>
                    <span @click="setFilter()">8点至11点</span>
                    <span @click="setFilter()">11点至14点</span>
                    <span @click="setFilter()">14点至20点</span>
                    <span @click="setFilter()">20点以后</span>
                </div>
            </div>
            <div class="f-title">
                价格排序
                <div class="f-box">
                    <span>从高到底</span>
                    <span>从低到高</span>
                </div>
            </div>
            <div class="f-title">
                选择线路
                <div class="f-box"></div>
            </div>
            <div class="f-title">
                空铁顺序
                <div class="f-box">
                    <span>先铁后空</span>
                    <span>先空后铁</span>
                </div>
            </div>
            <div class="f-title">
                选择航司
                <div class="f-box"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fbox:{},
            fLineSort: "tf",
            fPirceSort: "desc"
        };
    },
    // props: {
    //     time: {
    //         type: String,
    //         default: ""
    //     },
    //     routes: {
    //         type: Array,
    //         default: []
    //     },
    //     airlines: {
    //         type: Array,
    //         default: []
    //     }
    // },
    mounted() {},
    methods: {
        setFilter(item) {
          if(this.fbox.hasOwnProperty(item)){
            delete  this.fbox[item];
          }else{
             this.fbox[item]=true;
          }
        }
    }
};
</script>
<style lang="less" scoped>
.filter-box{margin:0 30px;padding-top: 10px;}
.f-title {
    font-size: 14px;
}
.f-box {
    background: #fff;
    padding: 10px 0 10px 0;
    box-shadow: 0 0 5px #DEDEDE;
    position: absolute;
    top: 26px;
    width: 100%;
    z-index: 2;
    top: 30px;
    left:0;
    min-width: 200px;
    padding: 10px;
    span {
        display: block;
        padding-left: 30px;
        position: relative;
        padding-bottom: 5px;
        &::before {
            content: "";
            position: absolute;
            border: 1px solid #dcdce1;
            height:10px;
            width: 10px;
            border-radius: 3px;
            left: 0;
            top: 4px;
        }
    }
}
</style>

