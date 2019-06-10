<!--首页-->
<template>
  <div class="pages">
    <Header></Header>
    <!-- <Map :data="dataRoute.datas" v-if="dataRoute"></Map> -->
    <!-- 搜索面板 -->
    <div class="search-panel" :class="{'hide':showSearch}">
      <div class="panel-contorl abs" @click="showSearch=!showSearch">
        <i class="iconfont" :class="{'iconsousuo':showSearch,'iconleft':!showSearch}"></i>
        查询
      </div>
      <div class="main-box">
        <div class="main-type flex flex-yc">
          <label>查询类型</label>
          <el-radio
            v-model="searchType"
            v-for="(item,index) in searchTypeOption"
            :key="'s'+index"
            :label="item[0]"
            :disabled="item[0]!=1"
          >{{item[1]}}</el-radio>
        </div>
        <div class="main-body">
          <div class="item flex flex-yc">
            <label>出发地</label>
            <div class="item-input">
              <el-select
                v-model="depInfo.name"
                filterable
                @change="depAndTarChange('dep')"
                :filter-method="depSearch"
                placeholder="请选择出发城市">
                <div v-if="depInfo.optionType">
                  <el-option v-for="(item, index) in depSearchResult"
                    @click="depInfo.code = item[1]"
                    :key="index" :label="item[0]" :value="item[0]">
                      <span style="color: blue" v-text="item[0]"></span>
                      <span v-text="item[1]"></span>
                      <span v-text="'englishName'"></span>
                  </el-option>
                </div>
                <div v-else >
                  <div class="letter-container">
                    <span v-for="(item, index) in hotAndLetterKey"
                      @click="changeCityLetter(item)"
                      :key="index"
                      :class="{'current': letterCityCode === item}"
                      v-text="item.replace('hot', '热门城市')">
                    </span>
                  </div>
                  <div class="letter-city-con">
                    <el-option
                      @click="depInfo.code = item[0]"
                      class="letter-city-item"
                      v-for="(item, index) in cityList" :key="index" :label="item[1]" :value="item[1]">
                      <span v-text="item[1]"></span>
                    </el-option>
                  </div>
                </div>
              </el-select>
            </div>
          </div>
          <div class="item flex flex-yc">
            <label>目的地</label>
            <div class="item-input">
              <el-select v-model="tarInfo.name"
                filterable
                @change="depAndTarChange('tar')"
                :filter-method="tarSearch"
                placeholder="请选择">
                <div v-if="tarInfo.optionType">
                  <el-option v-for="(item, index) in tarSearchResult" :key="index" :label="item[0]" :value="item[0]">
                      <span style="color: blue" v-text="item[0]"></span>
                      <span v-text="item[1]"></span>
                      <span v-text="'englishName'"></span>
                  </el-option>
                </div>
                <div v-else>
                  <div class="letter-container">
                    <span v-for="(item, index) in hotAndLetterKey"
                      @click="letterCityCode = item"
                      :key="index"
                      :class="{'current': letterCityCode === item}"
                      v-text="item.replace('hot', '热门城市')">
                    </span>
                  </div>
                  <div class="letter-city-con">
                    <el-option
                      class="letter-city-item"
                      v-for="(item, index) in cityList" :key="index" :label="item[1]" :value="item[1]">
                      <span v-text="item[1]"></span>
                    </el-option>
                  </div>
                </div>
              </el-select>
            </div>
          </div>
          <div class="item flex flex-yc">
            <label>出行日期</label>
            <div class="item-input">
              <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </div>
          <button type="button" @click="getData">查询</button>
        </div>
      </div>
    </div>
    <!-- 结果展示面板 -->
    <div class="routes-panel" :class="{'current': routesPanelFlag}" v-if="dataRoute">
      <!-- 窗口开关 -->
      <div class="panel-switch" @click="switchRoutesPanel()">
        <span v-show="routesPanelFlag">
          收起
          <svg t="1559531303271" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="1143"
            xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="20">
            <path d="M392.7 76.3l489.1 403.1c18.9 16.9 18.9 46.5 0 63.4L392.7 947.7c-27.4 24.4-70.8 5-70.8-31.7V107.9c0.1-36.6 43.4-56.1 70.8-31.6z" p-id="1144" fill="rgba(153,153,153,1)"></path>
          </svg>
        </span>
        <span v-show="!routesPanelFlag">
          展开
          <svg xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            t="1559531597217" class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            p-id="1473"
            width="14"
            height="20">
            <path d="M631.3 76.3l-489.2 403c-18.9 16.9-18.9 46.5 0 63.4l489.1 405.1c27.4 24.4 70.8 5 70.8-31.7V107.9c0-36.6-43.4-56.1-70.7-31.6z" p-id="1474" fill="rgba(153,153,153,1)"/>
          </svg>
        </span>
      </div>
      <!-- 路线详细 -->
      <div class="routes-warp">
        <happy-scroll color="rgba(0,0,0,.5)">
          <recommendRoute :data="dataRoute.happy" :title="'最为舒适'"></recommendRoute>
          <recommendRoute :data="dataRoute.early" :title="'最早到达'"></recommendRoute>
          <recommendRoute :data="dataRoute.cheap" :title="'价格最低'"></recommendRoute>
          <recommendRoute :data="dataRoute.short" :title="'最短时长'"></recommendRoute>
        </happy-scroll>
        <all :data="dataRoute.datas" :active="showAll" @back="showAll=false"></all>
      </div>
      <div class="intro flex flex-between" @click="showAll=true">
        <p>共涉及{{dataRoute.lines.length}}种行程路线、{{dataRoute.datas.length}}种出行方案</p>
        <p>
          查看所有方案
          <i class="iconfont iconright"></i>
        </p>
      </div>
    </div>
    <!-- 反馈窗口 -->
    <feed-back></feed-back>
  </div>
</template>
<script>
import Header from '@/components/header'
import recommendRoute from './components/recommend-route'
import Map from './components/map/map'
import all from './components/all'
import dataRoute from './data'
import cityGps from '@/service/cityDict'
import stationDict from '@/service/stationDict'
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import { getIndexData } from '@/service/getData'
import { Loading } from 'element-ui'
import FeedBack from './components/feed-back/feed-back'
import {hotCityInterface, cityCoord} from '../../config/utils'
import DATA_CONFIG from './data-config'

export default {
  components: {
    Header,
    recommendRoute,
    all,
    HappyScroll,
    Map,
    'feed-back': FeedBack
  },
  data () {
    return {
      // 索引
      letterCityCode: 'hot',
      // 配置数据
      dataConfig: DATA_CONFIG,
      // 结果面板展示标志位
      routesPanelFlag: false,
      // 被搜索的数据的索引集合
      depSearchIndex: [],
      tarSearchIndex: [],
      showSearch: true,
      dataRoute: null,
      showAll: false,
      searchType: 1,
      searchTypeOption: [[1, 'Air-Rail'], [2, 'Air'], [3, 'Rail']],
      date: '',
      // 出发站
      depInfo: {
        depCode: '',
        name: '',
        // 0 - 热门+拼音排序   1 - 搜索后的界面
        optionType: 0
      },
      // 目的地
      tarInfo: {
        tarCode: '',
        name: '',
        // 0 - 热门+拼音排序   1 - 搜索后的界面
        optionType: 0
      },
      cityGps: cityGps,
      loading: null
    }
  },
  beforeUpdate () {
    console.time('渲染时间')
  },
  updated () {
    console.timeEnd('渲染时间')
  },
  created () {
  },
  watch: {
  },
  computed: {
    // hotAndLetterKey
    hotAndLetterKey: function () {
      return hotCityInterface.getLetterKeys()
    },
    // 城市选项
    cityList: function () {
      let that = this
      let code = that.letterCityCode
      if (code === 'hot') {
        return hotCityInterface.getHotCityList()
      } else {
        return hotCityInterface.getLetterCity(code)
      }
    },
    // 目的地搜索结果集合
    tarSearchResult: function () {
      let that = this
      return that.getSearchResult(that.tarSearchIndex)
    },
    // 出发站搜索结果集合
    depSearchResult: function () {
      let that = this
      return that.getSearchResult(that.depSearchIndex)
    },
    // 所有站点（包括飞机火车）
    allSiteInfoList: function () {
      let that = this
      return [].concat(that.flightInfoList, that.trainInfoList)
    },
    // 所有站点数据字符串形式（一条数据一个字符串，比如，['卡塔卡马斯机场', '-85.89445', '14.830556', 'CAA'],）
    // 变成：'卡塔卡马斯机场,-85.89445,14.830556,CAA'
    // 用于el-select 搜索
    allSiteInfoStrList: function () {
      let that = this
      let list = []
      let opList = that.allSiteInfoList
      for (let i = 0; i < opList.length; i++) {
        let str = opList[i].join(',')
        list.push(str)
      }
      return [...new Set(list)]
    },
    flightInfoList: function () {
      return this.getFAndTList('flight')
    },
    trainInfoList: function () {
      return this.getFAndTList('train')
    }
  },
  mounted () {
    // this.loading = Loading.service({
    //   lock: true,
    //   text: '正在加载数据...',
    //   background: 'rgba(0, 0, 0, 0.5)'
    // })
    // this.getData()
  },
  methods: {
    /**
     * 根据城市中文名称获取城市三字码
     * @param {string} name 城市名称
     */
    getCityThreeCodeFromName (name) {
      return cityCoord.getCodeFromName(name)
    },
    /**
     * 出发地or目的地 值 变化
     * @param {string} type 类型--dep/tar
     */
    depAndTarChange (type) {
      let that = this
      if (type === 'dep') {
        that.depInfo.depCode = that.getCityThreeCodeFromName(that.depInfo.name) || ''
      } else {
        that.tarInfo.tarCode = that.getCityThreeCodeFromName(that.tarInfo.name) || ''
      }
    },
    /**
     * 切换城市（hot,a-z）
     */
    changeCityLetter (code) {
      let that = this
      that.letterCityCode = code
    },
    /**
     * xx
     */
    switchRoutesPanel () {
      let that = this
      that.routesPanelFlag = !that.routesPanelFlag
    },
    /**
     * 计算搜索结果计划
     * @param {Array} indexList 搜索结果的索引集合
     */
    getSearchResult (indexList) {
      let list = []
      let siteList = this.allSiteInfoStrList
      for (let i of indexList) {
        let data = siteList[i].split(',')
        list.push(data)
      }
      return list
    },
    /**
     * 获取飞机or火车数据列表func
     * @param {string} type 类型--飞机/火车 flight -- train
     */
    getFAndTList (type) {
      let list = []
      type = type === 'flight' ? 'f' : 't'
      let keys = Object.keys(stationDict[type])
      for (let key of keys) {
        let data = stationDict[type][key]
        if (!data[3] || !data[3][0]) {
          continue
        }
        data = [cityGps[data[3]][0], data[3]]
        list.push(data)
      }
      return list
    },
    /**
     * 检测地点类型
     * @param {string} placeType 地点类型 tar-目的地/dep-出发地
     */
    depSearch (searchText) {
      let that = this
      that.depInfo.name = searchText
      that.depInfo.optionType = searchText ? 1 : 0
      that.depSearchIndex = that.searchChange(searchText)
      that.depAndTarChange('dep')
    },
    tarSearch (searchText) {
      let that = this
      that.tarInfo.name = searchText
      that.tarInfo.optionType = searchText ? 1 : 0
      that.tarSearchIndex = that.searchChange(searchText)
      that.depAndTarChange('tar')
    },
    /**
     * 改变出发站选择框条件值
     * @param {string} searchText 搜索条件
     */
    searchChange (searchText) {
      let that = this
      let strList = that.allSiteInfoStrList
      let list = []
      for (let i = 0; i < strList.length; i++) {
        let cityStr = strList[i]
        if (cityStr.indexOf(searchText) > -1) {
          list.push(i)
        } else if (searchText.length > 1) {
          let textArr = searchText.split('')
          let res = []
          for (let te of textArr) {
            res.push(cityStr.indexOf(te))
          }
          if (res[res.length - 1] < 0) {
            continue
          }
          // 匹配标志位
          let flag = false
          for (let j = 0; j < res.length - 1; j++) {
            if (res[j] > res[j + 1] || res[j] < 0 || res[j + 1] < 0) {
              flag = true
            }
          }
          if (!flag) {
            list.push(i)
          }
        }
      }
      return list
    },
    /**
     * 获取数据
     */
    getData () {
      let that = this
      that.dataRoute = dataRoute
      setTimeout(() => {
        that.loading.close()
      }, 4000)
      return getIndexData({
        type: that.type,
        dep: that.depInfo.name,
        arr: that.tarInfo.name,
        date: that.date
      }).then(res => {
        that.dataRoute = dataRoute
      })
    }
  }
}
</script>
<style lang="less" scoped>
.panel-switch {
  cursor: pointer;
  position: absolute;
  width: 40px;
  height: 300px;
  left: -40px;
  top: 30%;
  text-align: center;
  // overflow: hidden;
  transform: translate(0, -50%);
  // border: 1px solid red;
  span {
    z-index: 1;
    display: block;
    text-align: center;
    word-wrap: break-word;
    height: 90px;
    margin: 105px auto 0 auto;
    width: 30px;
    line-height: 30px;
    font-size: 18px;
  }
  &::after {
    z-index: -1;
    position: absolute;
    content: '';
    width: 120%;
    height: 100%;
    top: 0;
    right: 0;
    background: #fff;
    transform: perspective(50px) rotateY(-10deg);
    transform-origin: right;
    box-shadow: -8px 0 9px 1px rgba(17,70,188,0.09);
  }
}

.autocomplete-input {
  border: 1px solid #000;
  height: 30px;
}
.search-panel {
  position: fixed;
  width: 360px;
  height: 440px;
  background: rgb(255, 255, 255, 1);
  box-shadow: 0px 3px 9px 1px rgba(17, 70, 188, 0.09),
    0px -3px 9px 1px rgba(17, 70, 188, 0.09);
  z-index: 10;
  top: 150px;
  left: 0;
  transition: left 0.5s;
  &.hide {
    left: -360px;
    transition: left 0.5s;
  }
  .main-box {
    margin: 20px;
    .main-type {
      border-bottom: 1px dashed #d3d3d3;
      line-height: 58px;
      span {
        display: inline-block;
        padding-left: 25px;
        padding-right: 10px;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          height: 14px;
          width: 14px;
          border-radius: 100%;
          border: 1px solid #e9e9e9;
          top: 50%;
          margin-top: -7.5px;
        }
        &.active {
          &::before {
            border-color: #1146bc;
          }
          &:after {
            content: "";
            position: absolute;
            left: 4px;
            height: 7px;
            width: 7px;
            border-radius: 100%;
            top: 50%;
            background: #1146bc;
            margin-top: -3.5px;
          }
        }
      }
    }
    label {
      font-size: 16px;
      color: #333;
      width: 80px;
      margin-right: 10px;
    }
  }
  .el-select {
    display: block;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .main-body {
    .item {
      padding: 30px 0 0 0;
      .item-input {
        height: 40px;
        width: 95%;
        input {
          width: 100%;
          line-height: 40px;
          background: none;
        }
      }
    }
    button {
      background-color: #1146bc;
      color: #fff;
      width: 100%;
      margin-top: 50px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: 400px;
    }
  }
}
.panel-contorl {
  background: #1146bc;
  cursor: pointer;
  height: 140px;
  width: 50px;
  padding: 30px 15px;
  right: -51px;
  top: 50%;
  margin-top: -70px;
  box-shadow: 2px 3px 18px 0px #6186d6;
  i {
    display: block;
    font-size: 24px;
  }
  color: #fff;
  font-size: 18px;
  border-radius: 5px;
}
.routes-panel {
  width: 538px;
  height: 80vh;
  // display: none;
  position: fixed;
  right: 0;
  transform: translateX(100%);
  top: 120px;
  background: #fff;
  padding-bottom: 40px;
  z-index: 9;
  box-shadow: 0px 3px 9px 1px rgba(17, 70, 188, 0.09),
    0px -3px 9px 1px rgba(17, 70, 188, 0.09);
  border-radius: 10px;
  padding: 26px 0 0;
  transition: .5s;
  &.current {
    right: 10px;
    transform: translateX(0);
  }
  .panel-warp {
    height: 100%;
    overflow: hidden;
  }
  .intro {
    font-weight: bold;
    position: absolute;
    bottom: 0;
    background: #1146bc;
    width: 100%;
    left: 0;
    height: 40px;
    line-height: 40px;
    padding: 0 4%;
    color: #fff;
    z-index: 9;
  }
}
.routes-warp {
  padding-bottom: 90px;
  height: 80vh;
  overflow: hidden;
}
.letter-container {
  background: #57A0F9;
  width: 440px;
  margin: -4px 0 0 0;
  padding: 3px 0;
  > span {
    font-size: 14px;
    height: 30px;
    line-height: 15px;
    display: inline-block;
    padding: 5px;
    margin: 2px;
    color: #fff;
    cursor: pointer;
    box-sizing: border-box;
    &.current {
      border-bottom: 2px solid #000;
    }
    &:hover {
      border-bottom: 2px solid #000;
    }
  }
}
.letter-city-item {
  display: inline-block;
}
.letter-city-con {
  width: 450px;
  text-align: center;
}
</style>
