<template>
    <div class="all-page" :class="{'active':active}">
        <p @click="back" class="back">
            <i class="iconfont iconfanhui"></i>
        </p>
        <filter-box
            :lines="lines"
            :airlines="airlineCode"
            @filterCallback="filterCallback"
            @filterReset="filterReset"
        ></filter-box>
        <happy-scroll color="rgba(0,0,0,.5)" resize>
            <div class="list">
                <div
                    class="list-item"
                    v-for="(item,index) in list"
                    :key="index"
                    v-show="isShowItem(item)"
                >
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
                            <span>{{item.routes[1].trainCategory||'&nbsp;'}}</span>
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
                    <div class="bottom">
                        {{item.routes[1].arrPlanTime.slice(11,16)}}到达 全程{{coverMin(item.planCost)}} 约
                        <span
                            class="price"
                        >{{item.price}}元</span>
                    </div>
                </div>
            </div>
        </happy-scroll>
        <input type="hidden" v-model="hiddenData">
    </div>
</template>

<script>
import filterBox from './filter'
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import { coverMin } from '@/config/utils'
import { stationCoord } from '@/config/utils'
export default {
  components: {
    filterBox,
    HappyScroll
  },
  data () {
    return {
      coverMin: coverMin,
      stationCoord: stationCoord,
      airlineCode: [],
      filterData: null,
      hiddenData: false,
      list: []
    }
  },
  props: {
    data: {
      type: Array
    },
    active: {
      type: Boolean,
      default: false
    },
    lines: {
      type: Array
    }
  },
  mounted () {
    this.convertData()
  },
  filters: {},
  methods: {
    /**
         * 数据装置
         */
    convertData () {
      let arr = []
      let data = this.data
      for (let r in data) {
        let ro = data[r].routes
        for (let i in ro) {
          if (ro[i].type == 'f') {
            let airline = ro[i].flightNo.slice(0, 2)
            if (!arr.includes(airline)) {
              arr.push(airline)
            }
            data[r].airlineCode = airline
          }
        }
      }
      this.airlineCode = arr
      this.list = data
    },
    filterCallback (data) {
      this.filterData = data
      this.hiddenData = !this.hiddenData
      if (data != null) {
        if (data.priceSort != '') {
          this.sortByKey('price', data.priceSort)
        }
      }
    },
    isShowItem (item) {
      let filters = this.filterData
      let isShow = true
      if (filters != null) {
        if (filters.dep != '') {
          let timeRange = filters.dep.split('-')
          let curTime = parseInt(item.depPlanTime.slice(11, 13))
          timeRange[0] < curTime && curTime <= timeRange[1]
            ? isShow
            : (isShow = false)
        }
        if (filters.arr != '') {
          let timeRange = filters.arr.split('-')
          let curTime = parseInt(item.arrPlanTime.slice(11, 13))
          timeRange[0] < curTime && curTime <= timeRange[1]
            ? isShow
            : (isShow = false)
        }
        if (filters.routeSort != '') {
          let type = item.routes[0].type + item.routes[1].type
          filters.routeSort == type ? isShow : (isShow = false)
        }
        if (filters.routeLine.length != 0) {
          filters.routeLine.indexOf(item.lineIndex) != -1
            ? isShow
            : (isShow = false)
        }
        if (filters.airline.length != 0) {
          filters.airline.indexOf(item.airlineCode) != -1
            ? isShow
            : (isShow = false)
        }
      }
      return isShow
    },
    filterReset () {
      this.filterData = null
      this.hiddenData = !this.hiddenData
    },
    sortByKey (key, sortBy) {
      let array = this.list
      return array.sort(function (a, b) {
        var x = Number(a[key])
        var y = Number(b[key])
        if (sortBy == 'asc') {
          return x < y ? -1 : x > y ? 1 : 0
        } else {
          return y < x ? -1 : y > x ? 1 : 0
        }
      })
    },
    back () {
      this.$emit('back')
    }
  }
}
</script>
<style lang="less" scoped>
.back {
    position: absolute;
    left: 10px;
    top: 16px;
    cursor: pointer;
    &:hover {
        transform: scale(1.2)
    }
}
.all-page {
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    right: -600px;
    z-index: 11;
    transition: right 0.5s;
    background: rgba(255, 255, 255, 1);
    &.active {
        right: 0;
        transition: right 0.5s;
    }
}
.list {
    padding-bottom: 40px;
    height: 100%;
}
.top {
    font-size: 16px;
    font-weight: bold;
}
.list-item {
    padding: 20px;
    width: 500px;
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
    .bottom {
        text-align: right;
        padding-top: 20px;
        color: #999;
    }
}
</style>
