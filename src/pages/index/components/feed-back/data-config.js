/* 数据配置文件
 * @Author: mikey.yuqb
 * @Date: 2019-06-03 14:49:32
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-06-10 14:47:47
 */
export default {
  // 反馈表单所需项目
  formConfig: [
    {
      label: '电子邮箱：',
      must: true,
      type: 'email',
      placeholder: '请输入电子邮箱'
    },
    {
      label: '联系电话：',
      must: true,
      type: 'tel',
      placeholder: '请输入联系电话'
    },
    {
      label: '姓名：',
      must: true,
      type: 'name',
      placeholder: '请输入姓名'
    },
    {
      label: '验证码：',
      must: true,
      type: 'code',
      placeholder: '请输入验证码'
    },
    {
      label: '意见反馈：',
      must: true,
      type: 'opinion',
      placeholder: '请输入您的意见反馈（1000个字符以内）'
    }
  ]
}
