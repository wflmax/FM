<template>
    <!-- 出行时刻分布 -->
    <div class="time-warp">
        <h4 class="title"><span class="font-nun">0-24</span>点出行时刻分布</h4>
        <v-chart :options="option" class="time-chart"/>
        <div class="lengs flex">
          <p>航班量（架次）</p>
          <p>高铁量（车次）</p>
        </div>
        <div class="other-info flex flex-yc">
          <div class="flex flex-yc">
             <i class="iconfont iconfeiji"></i>
             <p>总体出港航班量<span><b class="font-nun">{{flightData.count}}</b>架次</span></p>
          </div>
          <div class="flex flex-yc">
             <i class="iconfont iconshijian"></i>
             <p>出港准点率<span><b class="font-nun">{{flightData.depOntimeRate}}</b>%</span></p>
          </div>
          <div class="flex flex-yc">
             <i class="iconfont icontingzhi"></i>
             <p>航班平均延误时长<span><b class="font-nun">{{flightData.avgDelayTime}}</b>分钟</span></p>
          </div>
        </div>
        <div class="other-info flex flex-yc train">
          <div class="flex flex-yc">
             <i class="iconfont icongaotie"></i>
             <p>总体出站高铁量<span><b class="font-nun">{{trainData.count}}</b>车次</span></p>
          </div>
          <div class="flex flex-yc">
             <i class="iconfont iconshijian"></i>
             <p>出站正点率<span><b class="font-nun">{{trainData.depOntimeRate}}</b>%</span></p>
          </div>
          <div class="flex flex-yc">
             <i class="iconfont icontingzhi"></i>
             <p>高铁平均延误时长<span><b class="font-nun">{{trainData.avgDelayTime}}</b>秒</span></p>
          </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import echarts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import data from './../data'
function timeX () {
  let arr = []
  for (let i = 0; i < 24; i++) {
    arr.push(i)
  }
  return arr
}
let flightData = data.time.flight
let trainData = data.time.train
let a = Math.max.apply(null, flightData.times)
let b = Math.max.apply(null, trainData.times)
let maxN = a > b ? a : b
let dataMax = new Array(24).fill(maxN)
export default {
  components: {
    'v-chart': echarts
  },
  data () {
    return {
      flightData: flightData,
      trainData: trainData,
      option: {
        grid: {
          left: '0',
          right: '0',
          top: '5%',
          bottom: '2%',
          containLabel: true
        },

        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'transparent'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#363e83 '
            }
          },
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: '12'
            }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'transparent'
              }
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: '#fff',
                fontWeight: 'normal',
                fontSize: '12'
              }
            },
            data: timeX()

          },
          {
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: timeX()
          }
        ],
        series: [
          {
            type: 'bar',
            xAxisIndex: 1,
            zlevel: 1,
            itemStyle: {
              normal: {
                color: 'rgba(255,255,255,0.31)',
                borderWidth: 0,
                barBorderRadius: 50
              }
            },
            barWidth: '8%',
            data: dataMax
          },
          {
            type: 'bar',
            xAxisIndex: 1,
            barGap: '100%',
            data: dataMax,
            zlevel: 1,
            barWidth: '8%',
            itemStyle: {
              normal: {
                color: 'rgba(255,255,255,0.31)',
                borderWidth: 0,
                barBorderRadius: 50
              }
            }
          },
          {
            name: '男',
            type: 'bar',
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#40C3D1'
                    },
                    {
                      offset: 1,
                      color: '#1767F2'
                    }
                  ]
                ),
                barBorderRadius: 50,
                borderWidth: 0
              }
            },
            zlevel: 2,
            barWidth: '8%',
            data: trainData.times
          },
          {
            name: '女',
            type: 'bar',
            barWidth: '8%',
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#F94A6F'
                    },
                    {
                      offset: 1,
                      color: '#CE4CE5'
                    }
                  ]
                ),
                barBorderRadius: 50,
                borderWidth: 0
              }
            },
            zlevel: 2,
            barGap: '100%',
            data: flightData.times
          }
        ]
      }
    }
  },
  props: {},
  mounted () {},
  methods: {
    init () {}
  }
}
</script>
