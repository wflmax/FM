<template>
    <!-- 潜力分布值 -->
    <div class="potential-warp">
        <h4 class="title">空铁联运实力值情况</h4>
        <div class="potential-info flex flex-yc">
          <div class="potential-item" v-for="(item,index) in data" :key="index">
            <div class="potential-text flex flex-yc flex-between" >
              <p class="font-nun">No.{{index+1}} {{item[0]}}</p>
              <p class=" flex flex-yc"><span class="tag">实力值</span><span class="num font-nun">+{{item[1]}}</span> </p>
            </div>
             <p class="potential-line rel"><span :style="{width:item[1]+'%'}"></span></p>
          </div>
      </div>
    </div>
</template>

<script>
import data from './../data'
import {getScore} from '../server/server'
export default {
  data () {
    return {
      data: data.potential
    }
  },
  props: {},
  created () {
    let that = this
    that.getTotal()
    setInterval(() => {
      that.getTotal()
    }, 1000 * 60 * 30)
  },
  methods: {
    // 获取接口数据
    getTotal () {
      let that = this
      getScore().then(res => {
        that.data = res
      })
    }
  }
}
</script>
