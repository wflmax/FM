<template>
  <!-- 反馈窗口 -->
  <div class="feed-back-panel">
    <el-dialog
      :visible.sync="panelFlag"
      :width="'60%'"
      >
      <el-form :model="feedForm">
        <div
          v-for="(item, index) in formConfig"
          class="feed-normal"
          :class="checkFeedType(item.type)"
          :key="index"
        >
          <div class="feed-left">
            <span v-if="item.must">*</span>
            <label v-text="item.label"></label>
          </div>
          <div class="feed-right">
            <input
              v-if="item.type !== 'opinion'"
              class="feed-input"
              v-model="feedForm[item.type]"
              @keyup="checkFormValue(item.type)"
              type="text"
              :placeholder="item.placeholder"
            >
            <textarea
              v-else
              @keyup="checkFormValue(item.type)"
              cols="30"
              v-model="feedForm[item.type]"
              :placeholder="item.placeholder"
              rows="10"
            ></textarea>
            <!-- 验证码 -->
            <div class="code-con" v-if="item.type === 'code'"></div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span v-show="userInputErrorInfo.flag"
          v-text="userInputErrorInfo.tips"
          class="feed-back-error-tips">
          </span>
        <el-button @click="panelFlag = false">取 消</el-button>
        <el-button type="primary" @click="feedFormSubmit()">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Bus from '@/components/bus/bus'
import { Dialog } from 'element-ui'
import FeedData from './data-config'
import Server from 'api/air-rail-map-server'
export default {
  data () {
    return {
      // 校验错误信息
      userInputErrorInfo: {
        list: [],
        flag: false,
        tips: ''
      },
      // 弹窗开关
      panelFlag: false,
      // 配置
      formConfig: FeedData.formConfig,
      // 表单数据对象
      feedForm: {
        name: '',
        email: '',
        code: '',
        tel: '',
        opinion: ''
      }
    }
  },
  components: {
    'el-dialog': Dialog
  },
  created () {
    this.feedBack()
  },
  computed: {
    errorMap: function () {
      let that = this
      return {
        opinion: {
          flag: that.checkOpinion(),
          text: '意见反馈字数错误，请重新输入～'
        },
        code: {
          flag: that.checkCode(),
          text: '验证码字数错误，请重新输入～'
        },
        email: {
          flag: that.checkEmail(),
          text: '邮箱格式错误，请重新输入～'
        },
        tel: {
          flag: that.checkTel(),
          text: '联系电话格式错误，请重新输入～'
        },
        name: {
          flag: that.checkUserName(),
          text: '姓名长度错误，请重新输入～'
        }
      }
    }
  },
  methods: {
    // 检测邮箱 50字符内
    checkEmail () {
      let val = this.feedForm.email
      return val.length > 0 && val.length <= 50
    },
    /**
     * 检测联系电话（座机+手机）
     * 8位数字/12位数字/12位数字+1个字符
     */
    checkTel () {
      let val = this.feedForm.tel
      switch (val.length) {
        case 8:
          return !isNaN(Number(val))
        case 11:
          return !isNaN(Number(val)) && Number(val[0]) === 1
        case 12:
          return !isNaN(Number(val))
        case 13:
          let arr = val.split('-')
          if (arr.length !== 2) {
            return false
          }
          return !isNaN(Number(arr[0])) && !isNaN(Number(arr[1]))
        default:
          return false
      }
    },
    // 检测姓名
    checkUserName () {
      let val = this.feedForm.name
      console.log(val)
      return val.length > 0 && val.length < 20
    },
    // 检测验证码
    checkCode (val) {
      return this.feedForm.code.length === 4
    },
    // 检测意见反馈
    checkOpinion () {
      let val = this.feedForm.opinion
      return val.length > 0 && val.length <= 1000
    },
    /**
     * 提交表单 数据检测+提交到接口
     * 手机号码那几个1开头，11位数字，电话号码0开头，11位数字
       姓名，20个字符以内
       电子邮箱，50字符以内
       意见反馈，1000字符以内
     */
    feedFormSubmit () {
      let fdF = this.feedForm
      Server.setFeedBack({
        name: fdF.name,
        tel: fdF.tel,
        content: fdF.opinion,
        mail: fdF.email,
        captcha: fdF.code
      }).then(res => {
        console.log(res)
      })
      // TODO
      // let that = this
      // let data = that.feedForm
    },
    /**
     * xx
     * @param {string}
     */
    checkFormValue (type) {
      let that = this
      let list = that.userInputErrorInfo.list
      if (list.indexOf(type) === -1) {
        list.push(type)
      }
      let map = that.errorMap
      for (let key of list) {
        console.log(key, map[key])
        if (!map[key].flag) {
          that.userInputErrorInfo.flag = true
          that.userInputErrorInfo.tips = map[key].text
          return
        }
      }
      that.userInputErrorInfo.flag = false
    },
    /**
     * 检测反馈项类型（验证码and意见反馈较特殊）添加class标记
     */
    checkFeedType (type) {
      switch (type) {
        case 'opinion':
          return 'feed-opinion'
        case 'code':
          return 'feed-code'
        default:
          return ''
      }
    },
    // xx
    feedBack () {
      Bus.$on('feed-back', msg => {
        if (msg) {
          this.panelFlag = true
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.feed-back-panel {
  // position: fixed;
  // width: 50vw;
  // height: 50vh;
  // background: #00ffff;
  .el-form {
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
}
.feed-normal {
  width: 50%;
  height: 40px;
  float: left;
  font-size: 16px;
  margin: 30px 0 0 0;
  // background: #0f0f0f;
  box-sizing: border-box;
  padding: 0 10px;
  &:first-child,
  &:nth-child(2) {
    margin: 0;
  }
  line-height: 40px;
  .feed-left {
    float: left;
    width: 100px;
    text-align: right;
    > span {
      color: red;
    }
  }
  .feed-right {
    float: left;
    width: 70%;
    width: 230px;
    height: 40px;
    margin: 0 0 0 7px;
    background: rgba(255, 255, 255, 1);
    > input {
      width: 100%;
      height: 100%;
      border: 1px solid rgba(226, 226, 226, 1);
      border-radius: 4px;
      text-indent: 9px;
    }
    .code-con {
      width: 70px;
      height: 30px;
      margin: 5px 0 0 0;
      float: right;
      background: #0fffff;
    }
  }
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  &.feed-code {
    .feed-input {
      width: 140px;
    }
  }
  &.feed-opinion {
    width: 100%;
    height: 130px;
    .feed-right {
      width: 580px;
      height: 130px;
    }
    .feed-input {
      width: 580px;
      height: 130px;
    }
    textarea {
      width: 580px;
      height: 100%;
      border: 1px solid rgba(226, 226, 226, 1);
      border-radius: 4px;
      text-indent: 9px;
      line-height: 22px;
      padding: 4px 0;
    }
  }
}
.feed-back-error-tips {
  text-indent: 30px;
  float: left;
  color: red;
}
</style>
