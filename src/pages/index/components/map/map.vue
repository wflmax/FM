<template>
<div>
    <GmapMap
        :center="{lat:config.centerLat, lng:config.centerLng}"
        :zoom="config.zoom"
        ref="mapRef"
        :options="mapOption"
        class="map-contanter"
    ></GmapMap>
    <div class="tip-box" ref="tipBox"></div>
</div>

</template>
<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { stationCoord, cityCoord } from '@/config/utils'
import { mapKey } from '@/config/env'
var MarkerWithLabel = null
Vue.use(VueGoogleMaps, {
  load: {
    key: mapKey,
    libraries: 'places',
    language: 'zh-CN'
  },
  loadCn: true
})

export default {
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      map: null,
      config: {
        zoom: 3,
        centerLat: 39.334053,
        centerLng: 159.02045
      },
      mapConstant: {
        cityLevel: 1,
        markerSize: 32,
        uSymbol:
                    'M593.180416 494.907717c0 28.253484-22.89443 51.16531-51.158147 51.16531-28.260647 0-51.172473-22.911826-51.172473-51.16531 0-28.269857 22.911826-51.16531 51.172473-51.16531C570.285986 443.742407 593.180416 466.63786 593.180416 494.907717z',
        lineSymbol: {
          path: 'M 0,-1 0,1',
          strokeOpacity: 0.5,
          strokeColor: '#2f819c', // 虚线
          strokeWeight: 1
        },
        markersArray: [],
        polylines: [],
        lastInfoWindow: [],
        lasthighId: null
      },
      flightMakers: [],
      trainMakers: [],
      flightRoutes: [],
      trainRoutes: [],
      mapOption: {
        backgroundColor: '#fefefe',
        minZoom: 4,
        maxZoom: 7,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true
      },
      color: {
        f: '#F1656A',
        t: '#1EBBEF'
      },
      settingConfig: {
        lineStyle: 'soild', // 航线
        lineCurvature: '0.5', // 航线曲率
        waterColor: '#fefefe', // 海洋颜色
        landColor: '#e6e6e6', // 陆地颜色
        boundaryColor: '#d1d1d1' // 国界颜色
      },
      bounds: null,
      labelPosition: ['_left', '_top', '_right', '_bottom'],
      citysLevel: {}// 设置同一城市站点的排序 优化label堆叠
    }
  },
  mounted () {
    this.$refs.mapRef.$mapPromise.then(map => {
      this.map = map
      MarkerWithLabel = require('markerwithlabel')(google.maps)
      this.map.setOptions({
        styles: this.mapStyle(
          this.settingConfig.waterColor,
          this.settingConfig.landColor,
          this.settingConfig.boundaryColor
        )
      })
      this.bounds = new google.maps.LatLngBounds()
      this.convertData()
      this.map.fitBounds(this.bounds)
    })
  },
  methods: {
    /**
         * 地图自定义样式
         */
    mapStyle (a, b, c) {
      var ms = [
        {
          'featureType': 'all',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'weight': '2.00'
            }
          ]
        },
        {
          'featureType': 'all',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#9c9c9c'
            }
          ]
        },
        {
          'featureType': 'all',
          'elementType': 'labels.text',
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'administrative.province',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'administrative.province',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'administrative.locality',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'landscape',
          'elementType': 'all',
          'stylers': [
            {
              'color': '#f2f2f2'
            }
          ]
        },
        {
          'featureType': 'landscape',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#ffffff'
            }
          ]
        },
        {
          'featureType': 'landscape.man_made',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#ffffff'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'all',
          'stylers': [
            {
              'saturation': -100
            },
            {
              'lightness': 45
            },
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#eeeeee'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#7b7b7b'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#ffffff'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'all',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'all',
          'stylers': [
            {
              'color': '#46bcec'
            },
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#c8d7d4'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#070707'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#ffffff'
            }
          ]
        }
      ]
      return ms
    },
    /**
         * 数据装置
         */
    convertData () {
      this.clearMap()
      // let flightMakers = [],
      //   trainMakers = [],
      //   trainArr = [],
      //   flightArr = [],
      //   flightlines = [],
      //   trainlines = [],
      //   f_line = [],
      //   t_line = []
      let [flightMakers, trainMakers, trainArr, flightArr, flightlines, trainlines, fLine, tLine] = [[], [], [], [], [], [], [], []]

      for (let r in this.data) {
        let route = this.data[r].routes
        for (let i in route) {
          let item = route[i]
          let line = item.depCode + '' + item.arrCode
          if (item.type === 'f') {
            if (!flightMakers.includes(item.arrCode)) {
              flightMakers.push(item.arrCode)
              this.drawMaker('f', item.arrCode)
            }
            if (!flightMakers.includes(item.depCode)) {
              flightMakers.push(item.depCode)
              this.drawMaker('f', item.depCode)
            }
            if (!fLine.includes(line)) {
              this.drawLines('f', [item.depCode, item.arrCode])
              fLine.push(line)
            }
          } else {
            if (!trainMakers.includes(item.arrCode)) {
              trainMakers.push(item.arrCode)
              this.drawMaker('t', item.arrCode)
            }
            if (!trainMakers.includes(item.depCode)) {
              trainMakers.push(item.depCode)
              this.drawMaker('t', item.depCode)
            }
            if (!tLine.includes(line)) {
              tLine.push(line)
              this.drawLines('t', [item.depCode, item.arrCode])
            }
          }
        }
      }
      this.flightMakers = flightMakers
      this.trainMakers = trainMakers
      this.flightRoutes = fLine
      this.trainRoutes = tLine
    },

    /**
         * 绘制站点
         */
    drawMaker (type, code) {
      let self = this
      let coord = stationCoord.coord(type, code)
      let cityCode = stationCoord.city(type, code)
      let latLng = new google.maps.LatLng(
        Number(coord[2]),
        Number(coord[1])
      )
      // console.log('<<<<<', latLng.lat(), latLng.lng())
      let citys = stationCoord.city(type, code)
      if (this.cityLevel[cityCode] !== undefined) {
        this.cityLevel[cityCode]++
      } else {
        this.cityLevel[cityCode] = 0
      }
      let labelIndex = this.cityLevel[cityCode]
      this.bounds.extend(latLng)
      let icon_opt = {
        path: self.mapConstant.uSymbol,
        fillColor: self.color[type],
        fillOpacity: 0.4,
        scale: 0.05,
        strokeWeight: 0,
        zIindex: this.hoverOffset + 1,
        anchor: new google.maps.Point(550, 500)
      }
      let marker = new MarkerWithLabel({
        position: latLng,
        map: self.map,
        title: coord[0] + '(' + code + ')',
        // title: `${latLng.lat()}, ${latLng.lng()}`,
        cityCoord: citys,
        codeInfo: coord[0],
        labelContent: coord[0],
        icon: icon_opt,
        labelIndex: labelIndex,
        labelClass: 'markerlabels markerlabels' + this.labelPosition[labelIndex], // the CSS class for the label
        labelAnchor: new google.maps.Point(0, 0)
      })
      this.mapZoomChanged(marker)
      this.mapConstant.markersArray.push(marker)
    },
    /**
         * 绘制线路
         */
    drawLines (type, points) {
      let flightPlanCoordinates = [],
        from = '',
        to = ''
      for (let n = 0; n < points.length; n++) {
        let coods = stationCoord.coord(type, points[n])
        n == 0 ? from = coods[0] : to = coods[0]
        let myLatLng = {
          lat: parseFloat(coods[2]),
          lng: parseFloat(coods[1])
        }
        flightPlanCoordinates.push(myLatLng)
      };
      let newPolyline = this.curvedPolylinePoint(flightPlanCoordinates)
      let flightPathOption = {
        path: newPolyline,
        from: from,
        to: to,
        geodesic: true,
        strokeColor: this.color[type],
        strokeOpacity: 0.4,
        strokeWeight: 1
      }
      let flightPath = new google.maps.Polyline(flightPathOption)
      this.mapConstant.polylines.push(flightPath)
      flightPath.setMap(this.map)
      this.polylineOver(flightPath) // 鼠标滑过事件
    },
    /**
         * 地图缩放事件
         */
    mapZoomChanged (markers) {
      var listener = google.maps.event.addListener(
        this.map,
        'zoom_changed',
        (event) => {
          let city = markers.cityCoord
          if (this.map.getZoom() <= 5 && markers.labelIndex == 0) {
            markers.set('labelContent', city)
          } else if (this.map.getZoom() <= 5 && markers.labelIndex > 0) {
            markers.set('labelContent', '')
          } else {
            markers.set('labelContent', markers.codeInfo) // 显示标注
          }
        }
      )
      return listener
    },

    /**
         * Poyline 航线鼠标滑过事件
         */
    polylineOver (Polyline) {
      var listener = google.maps.event.addListener(Polyline, 'mousemove', (event) => {
        var overlay = new google.maps.OverlayView()
        overlay.draw = function () {}
        overlay.setMap(this.map)
        var position = overlay.getProjection().fromLatLngToContainerPixel(event.latLng)
        if (typeof yOffset === 'undefined') {
          var yOffset = 0
        }
        var tipX = Math.round(position.x + 10) + 'px'
        var tipY = Math.round(position.y - yOffset + 10) + 'px'
        this.$refs.tipBox.innerText = Polyline['from'] + '-' + Polyline['to']
        overlay, position = null
        this.$refs.tipBox.style.left = tipX
        this.$refs.tipBox.style.top = tipY
      })
      return listener
    },
    /**
         * 模拟Polyline 曲线
         */
    curvedPolylinePoint (Coordinates) {
      var resolution = resolution || 0.02
      var toRad = 57.295779513082316,
        toDeg = 0.017453292519943295
      var s = google.maps
      var g = Coordinates,
        f = resolution,
        b = [],
        a = [],
        d, t = g[0]['lat'],
        F = g[0]['lng'],
        m = g[1]['lat'],
        z = g[1]['lng'],
        p = m - t,
        k = z - F,
        n, v = 0,
        w
      n = 0.1 * (m - t)
      v = 1
      Math.abs(k) > 180 && (k = k / toRad,
      k = k > 0 ? -(2 * Math.PI - k) : 2 * Math.PI + k,
      k = k / toDeg)
      var tem = Math.abs(k)
      if (t > 0 && m > 0) {
        if (p > 0) {
          var offsets = tem * 0.05
        } else {
          var offsets = -tem * 0.05
        }
      } else {
        var offsets = 3
      }
      g = []
      for (d = 0; d <= 1; d += f) {
        offsets = offsets * Math.sin(Math.PI * d / 1),
        b.push(d),
        a.push(offsets)
      }
      for (f = 0; f < b.length; f++) {
        d = n * a[f],
        d = t + p * b[f] + d * v,
        w = F + k * b[f],
        g.push(new s.LatLng(d, w))
      }
      g.push(new s.LatLng(m, z))
      return g
    },
    /**
         * 清除画布重置相关数据
         */
    clearMap () {
      var _nPolylineSumCount = this.mapConstant.polylines.length
      var _markersArrayCount = this.mapConstant.markersArray.length
      if (_nPolylineSumCount != 0) {
        for (var i = 0; i < _nPolylineSumCount; i++) {
          this.mapConstant.polylines[i].setMap(null)
        }
        this.mapConstant.polylines = []
      };
      if (_markersArrayCount != 0) {
        for (var s = 0; s < _markersArrayCount; s++) {
          var mfo = this.mapConstant.markersArray[s]
          mfo.setMap(null)
        }
        this.mapConstant.markersArray = []
      }
      this.flightMakers = []
      this.trainMakers = []
      this.flightRoutes = []
      this.trainRoutes = []
      this.cityLevel = {}
    }
  }
}
</script>

<style lang="less" scoped>
.map-contanter {
    height: 100vh;
    width: 100%;
    position: absolute;
}
.tip-box {
    position: absolute;
    z-index: 99;
    padding: 0 5px;
    transition: left 0.5s ease-in, top 0.3s ease-out;
    max-width: 250px;
    word-break: break-all;
    background:rgba(0,0,0,.4);color: #fff;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 12px;
}

/deep/.marker-nomarl {
    height: 8px;
    width: 8px;
    background: #f56c6c;
    border-radius: 100%;
    &.t {
        background: #66b1ff;
    }
    .mlabel {
        position: absolute;
        width: 100px;
        color: #ffffff;
        text-shadow: 0 0 4px #666666, 0 0 3px #666666, 0 0 2px #666666,
            0 0 2px #666666;
        padding: 5px;
        left: 5px;
        top: -12px;
    }
}
</style>
