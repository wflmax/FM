<template>
  <div class="feed-back-panel">
    <el-dialog :visible.sync="panelFlag">
      <el-form :model="feedForm">
        <div v-for="(item, index) in formConfig"
        class="feed-normal"
        :class="checkFeedType(item.type)"
        :key="index">
        <div class="feed-left">
          <span v-if="item.must">*</span>
          <label v-text="item.label"></label>
        </div>
          <div class="feed-right">
            <input v-if="item.type !== 'opinion'"
            class="feed-input"
            v-model="feedForm[item.type]"
            @change="setFormValue(item.type, value)"
            type="text" :placeholder="item.placeholder">
            <textarea v-else name="" id="" cols="30"
            v-model="feedForm[item.type]"
            :placeholder="item.placeholder"
            rows="10"></textarea>
            <!-- 验证码 -->
            <div class="code-con" v-if="item.type === 'code'">

            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
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
export default {
  data () {
    return {
      msg: 'xxx',
      panelFlag: false,
      formConfig: FeedData.formConfig,
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
  methods: {
    // 检测邮箱
    checkEmail (val) {
      return val.length > 0 && val.length <= 50
    },
    /**
     * 检测联系电话（座机+手机）
     * 8位数字/12位数字/12位数字+1个字符
     */
    checkTel (val) {
      switch (val.length) {
        case 8:
          break
        case 12:
          break
        case 13:
          break
        default:
          break
      }
    },
    // 检测姓名
    checkUserName (val) {
      return val.length > 0 && val.length < 20
    },
    // 检测验证码
    checkCode (val) {
      return val.length === 4
    },
    // 检测意见反馈
    checkOpinion (val) {
      return val.length > 0 && val.length < 1000
    },
    /**
     * 提交表单 数据检测+提交到接口
     * 手机号码那几个1开头，11位数字，电话号码0开头，11位数字
       姓名，20个字符以内
       电子邮箱，50字符以内
       意见反馈，1000字符以内
     */
    feedFormSubmit () {
      // TODO
      // let that = this
      // let data = that.feedForm
    },
    /**
     * xx
     * @param {string}
     */
    setFormValue (type, val) {
      let that = this
      switch (type) {
        case 'opinion':
          that.feedForm.opinion = ''
          break
        case 'code':
          break
        default:
          break
      }
    },
    /**
     * 检测反馈项类型（验证码and意见反馈较特殊）
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
      content: '';
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
  &:first-child, &:nth-child(2) {
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
    width:230px;
    height:40px;
    margin: 0 0 0 7px;
    background:rgba(255,255,255,1);
    > input {
      width: 100%;
      height: 100%;
      border:1px solid rgba(226,226,226,1);
      border-radius:4px;
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
    content: '';
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
      border:1px solid rgba(226,226,226,1);
      border-radius:4px;
      text-indent: 9px;
      line-height: 22px;
      padding: 4px 0;
    }
  }
}
</style>
