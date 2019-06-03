<template>
    <div class="filter-box">
        <div class="title flex flex-between">
            <div class="f-title">
                选择时间段
                <div class="f-box flex flex-between">
                    <div class="dep-time">
                        <p class="title">出发时间</p>
                         <span @click="setFilter('dep',item.time)"  v-for="(item,index) in times" :key="index" :class="{'active':filterData.dep==item.time}">{{item.text}}</span>
                    </div>
                    <div class="arr-time">
                        <p class="title">到达时间</p>
                        <span @click="setFilter('arr',item.time)"  v-for="(item,index) in times" :key="index" :class="{'active':filterData.arr==item.time}">{{item.text}}</span>
                    </div>
                </div>
            </div>
            <div class="f-title">
                价格排序
                <div class="f-box">
                    <span @click="setFilter('priceSort','desc')" :class="{'active':filterData.priceSort=='desc'}">从高到底</span>
                    <span @click="setFilter('priceSort','asc')" :class="{'active':filterData.priceSort=='asc'}">从低到高</span>
                </div>
            </div>
            <div class="f-title">
                选择线路
                <div class="f-box">
                    <span class="multiple"
                        @click="setFilter('routeLine',index)"
                        v-for="(item,index) in lines"
                        :key="index"
                         :class="{'active':filterData.routeLine.indexOf(index)!=-1}"
                    >{{item}}</span>
                </div>
            </div>
            <div class="f-title">
                空铁顺序
                <div class="f-box">
                    <span @click="setFilter('routeSort','tf')"  :class="{'active':filterData.routeSort=='tf'}">先铁后空</span>
                    <span @click="setFilter('routeSort','ft')"  :class="{'active':filterData.routeSort=='ft'}">先空后铁</span>
                </div>
            </div>
            <div class="f-title">
                选择航司
                <div class="f-box">
                    <span class="multiple"
                        @click="setFilter('airline',item)"
                        v-for="(item,index) in airlines"
                        :key="index"
                        :class="{'active':filterData.airline.indexOf(item)!=-1}"
                    >{{airlineCoord.name(item)}}({{item}})</span>
                </div>
            </div>
            <div class="f-title" @click="reset">重置</div>
        </div>
    </div>
</template>

<script>
import { airlineCoord } from '@/config/utils'
export default {
  data () {
    return {
      airlineCoord: airlineCoord,
      times: [{time: '0-8', text: '8点以前'}, {time: '8-11', text: '8点至11点'}, {time: '11-14', text: '11点至14点'}, {time: '14-20', text: '14点至20点'}, {time: '20-24', text: '20点以后'}],
      filterData: {
        dep: '',
        arr: '',
        priceSort: '', // desc,asc
        routeSort: '', // ft,tf
        airline: [], // [CA,CZ,..]
        routeLine: [] // [0,1,2]
      }
    }
  },
  props: {
    time: {
      type: String,
      default: ''
    },
    lines: {
      type: Array
    },
    airlines: {
      type: Array
    }
  },
  mounted () {},
  methods: {
    setFilter (type, item) {
      switch (type) {
        case 'airline':
          let i = this.filterData.airline.indexOf(item)
          if (i == -1) {
            this.filterData.airline.push(item)
          } else {
            this.filterData.airline.splice(i, 1)
          }
          break
        case 'routeLine':
          let x = this.filterData.routeLine.indexOf(item)
          if (x == -1) {
            this.filterData.routeLine.push(item)
          } else {
            this.filterData.routeLine.splice(x, 1)
          }
          break

        default:
          this.filterData[type] = this.filterData[type] == item ? '' : item
          break
      }
      this.$emit('filterCallback', this.filterData)
    },
    reset () {
      this.filterData = {
        dep: '',
        arr: '',
        priceSort: '', // desc,asc
        routeSort: '', // ft,tf
        airline: [], // [CA,CZ,..]
        routeLine: [] // [a-b,b-c]
      }
      this.$emit('filterReset')
    }
  }
}
</script>
<style lang="less" scoped>
.filter-box {
    margin: 0 30px;
    padding: 17px 0 17px 10px;
}
.f-title {
    font-size: 14px;
    position: relative;
    font-weight: bold;
    cursor: pointer;
    .f-box {
        background: #fff;
        padding: 10px 0 10px 0;
        box-shadow: 0 0 5px #dedede;
        position: absolute;
        top: 20px;
        width: 130px;
        z-index: 2;
        left: 0;
        padding: 10px 20px;
        font-weight: normal;
        overflow: hidden;
        display: none;
        &::before {
            content: "";
            height: 40px;
            width: 100%;
            position: absolute;
            top: -20px;
            left: 0;
        }
        span {
            display: block;
            padding-left: 25px;
            position: relative;
            padding-bottom: 5px;
            &::before {
                content: "";
                position: absolute;
                border: 1px solid #dcdce1;
                height: 14px;
                width: 14px;
                border-radius: 3px;
                left: 0;
                top: 3px;
                border-radius: 100%;
            }
            &.multiple{
               &::before {
                border-radius:0;
                }
            }
            &.active{
               &::before {
                border-color:#1146bc;
                }
            }
        }
        .title {
            font-weight: bold;
            margin-bottom: 8px;
        }
    }
    &:nth-child(1) {
        .f-box {
            width: 150px;
        }
    }
    &:nth-child(3) {
        .f-box {
            width: 200px;
            left: -100px;
        }
    }
    &:nth-child(5) {
        .f-box {
            left: auto;
            right: -30px;
        }
    }
    &:hover {
        .f-box {
            display: block;
        }
    }
}
</style>
