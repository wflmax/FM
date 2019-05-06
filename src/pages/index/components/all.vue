<template>
    <div class="all-page" :class="{'active':active}">
       <p @click="back" class="back"><i class="iconfont iconfanhui"></i> </p>
        <filter-box ></filter-box>
         <happy-scroll color="rgba(0,0,0,.5)" resize>
          <div class="list">
              <div class="list-item" v-for="(item,index) in data" :key="index">
                  <div class="top-sub flex flex-yc flex-between">
                      <p>
                          {{stationCoord.city(item.routes[0].type,item.routes[0].depCode)}}
                          <span>{{item.routes[0].depPlanTime.slice(11,16)}}</span>
                      </p>
                      <p class="drun" v-if="item.routes[0].type=='t'">
                          {{item.routes[0].trainNo}}
                          <span>{{item.routes[0].trainCategory}}</span>
                      </p>
                      <p class="drun" v-else>
                          {{item.routes[0].flightNo}}
                          <span>{{item.routes[0].stopFlag?'直飞':'经停'}}</span>
                      </p>
                      <p>
                          {{stationCoord.city(item.routes[0].type,item.routes[0].arrCode)}}
                          <span>{{item.routes[0].arrPlanTime.slice(11,16)}}</span>
                      </p>
                      <p class="drun" v-if="item.routes[1].type=='t'">
                          {{item.routes[1].trainNo}}
                          <span>{{item.routes[1].trainCategory}}</span>
                      </p>
                      <p class="drun" v-else>
                          {{item.routes[1].flightNo}}
                          <span>{{item.routes[1].stopFlag?'直飞':'经停'}}</span>
                      </p>
                      <p>
                        {{stationCoord.city(item.routes[1].type,item.routes[1].arrCode)}}
                          <span>{{item.routes[1].arrPlanTime.slice(11,16)}}</span>
                      </p>
                  </div>
                  <div class="bottom">{{item.routes[1].arrPlanTime.slice(11,16)}}到达 全程{{coverMin(item.planCost)}} 约<span class="price"> {{item.price}}元</span></div>
              </div>

          </div>
        </happy-scroll>
    </div>
</template>

<script>
import filterBox from "./filter";
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import {coverMin}  from '@/config/utils'
import { stationCoord, airlineCoord} from "@/config/utils";
export default {
    components: {
        filterBox,
        HappyScroll
    },
    data() {
        return {
          coverMin:coverMin,
          stationCoord:stationCoord,
          airlineCoord:airlineCoord
        };
    },
    props: {
        data: {},
        active:{
          type:Boolean,
          default:false
        }
    },
    mounted() {},
    methods: {
        //转换时间
        back() {
          this.$emit('back')
        }
    }
};
</script>
<style lang="less" scoped>
.back{position: absolute;left:10px;top:10px;}
.all-page{
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
  right: -600px;
  z-index: 11;
  transition:right .5s;
  background: rgba(255, 255, 255, 1);
  &.active{
    right: 0;
    transition:right .5s;
  }
}
.list{padding-bottom: 40px;height: 100%;}
.top {
    font-size: 16px;
    font-weight: bold;
}
.list-item {
    padding: 20px ;
    width:500px ;
    margin-left: 20px;
    border-bottom: 1px solid #cdcdcd;
    .top-sub {
        span {
            display: block;
            padding-top: 10px;
            color: #666;
        }
        text-align: center;
    }
    .drun {
        position: relative;
        color: #666;
        font-size: 14px;
        ::before {
            content: "";
            position: absolute;
            left: -25%;
            width: 150%;
            height: 1px;
            background: #ccc;
            line-height: 50px;
            top: 50%;
        }
    }
    .bottom{
      text-align: right;
      padding-top:20px ;
      color: #999;
    }
}
</style>

