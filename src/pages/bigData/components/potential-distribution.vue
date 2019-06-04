<template>
    <!-- 潜力分布值 -->
    <div class="potential-warp">
        <h4 class="title">空铁联运实力值情况</h4>
        <div class="potential-info flex flex-yc">
          <div class="potential-item" v-for="(item,index) in data"
          :class="{'left-curr': (index + 1) % 4 === 1, 'right-curr': (index + 1) % 4 === 0}"
          :key="index">
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
export default {
  data () {
    return {
      data: data.potential
    }
  },
  props: {},
  mounted () {},
  methods: {
  }
}
</script>
