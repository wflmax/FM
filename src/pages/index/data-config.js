/*
 * 说明：index.vue数据配置（文案、字母表、其他等可能随时需要修改单跟逻辑关系不大的配置数据）
 * @Author: mikey.yuqb
 * @Date: 2019-06-06 14:30:31
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-06-06 18:56:38
 */
export default {
  hotAndLetterKey: (() => {
    let list = ['hot']
    return list.concat(list, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
  })()
}
