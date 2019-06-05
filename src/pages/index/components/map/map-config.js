/*
 * @Author: mikey.yuqbin
 * @Date: 2019-05-30 16:15:05
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-06-05 15:08:08
 * 地图配置数据
 */

export default {
  /**
   * 缩放比例对应城市等级
   * 制定城市等级与地图缩放之间的关系，以过滤展示
   */
  cityLevelAndZoom: {
  },
  /**
   * 地图颜色配置参数
   * 参数说明：
   * lineStyle -- 航线
   * lineCurvature -- 航线曲率
   * waterColor -- 海洋颜色
   * landColor -- 陆地颜色
   * boundaryColor -- 国界颜色
   */
  settingConfig: {
    // 主题取名
    type1: {
      lineStyle: 'soild', // 航线
      lineCurvature: '0.5', // 航线曲率
      waterColor: '#fefefe', // 海洋颜色
      landColor: '#e6e6e6', // 陆地颜色
      boundaryColor: '#d1d1d1' // 国界颜色
    }
  },
  getMapStyle: () => {
    let that = this
    return that.makeMapStyle(that.settingConfig.type1)
  },
  /**
   * 输出map基础样式（setStyle）
   */
  makeMapStyle: (a, b, c) => {
    return [
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
  }
}
