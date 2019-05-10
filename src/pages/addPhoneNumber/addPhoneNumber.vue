<template lang="pug">
  .add-phone-number.absolute.column
    yfb-appbar(title="会员信息")
    .add-phone-number-content
      .scroll-content
        .add-phone-number-title
          p.t-lg.t-red 恭喜您已成为会员
          p.t-sm.t-blue 为保护您的账户安全，请完善个人信息
        .add-phone-number-info
          input-group(
            label="姓名",
            placeholder="请输入姓名",
            v-model="userName",
            :confirm="userNameConfirm",
            disableTxt="请输入正确的姓名",
            @blur="userNameVerify"
          )
          input-group(
            label="单位",
            placeholder="请输入单位",
            v-model="company",
            :confirm="companyConfirm",
            disableTxt="请输入单位全称",
            @blur="companyVerify"
          )
          input-group(
            label="手机",
            type="number",
            placeholder="请输入手机",
            v-model="phoneNumber",
            :confirm="phoneNumberConfirm",
            disableTxt="请输入正确的手机",
            @blur="phoneNumberVerify"
          )
          input-group(
            label="图片验证码",
            type="text",
            placeholder="请输入图片验证码",
            v-model="QRCode",
            :maxlength="4"
          )
            .input-addition.row.main-center
              .QRImage
                img(:src="imgSrc")
              .chenge-img.column.main-center(@click="changeImg")
                svg.icon(aria-hidden="true")
                  use(xlink:href="#icon-xunhuan")
                span.t-blue 换一换
          //- input-group(
          //-   label="短信验证码",
          //-   type="number",
          //-   placeholder="请输入短信验证码",
          //-   v-model="verifyCode",
          //-   :maxlength="6"
          //- )
          //-   .input-addition.row.main-center
          //-     .timer
          //-       button.btn(
          //-         :class="timerBtnClass",
          //-         v-text="timerText",
          //-         @click="getVerifyCode"
          //-       )
        button.btn.t-white(
          :class="canClick ? 'bg-blue' : 'bg-dgray phone-isClicked'",
          @click="upMemSourceFn"
        ) 保存
</template>

<script>
import {mapActions} from 'vuex'
import {YfbAppbar} from 'yfb'
import InputGroup from './child/InputGroup'
import {Icon} from 'components'

const reg = /^1[^126]\d{9}$/

const QRCodeLength = 4
// const verifyCodeLength = 4

const isDev = process.env.NODE_ENV === 'development'
let imgSrc = `${isDev ? '/yfb_wechat' : '/qlmYFB'}/bind/getimage.do`
export default {

  mounted () {
    this.selMemSourceFn()
  },

  data () {
    return {
      // 姓名
      userName: '',
      userNameConfirm: null,
      // 单位
      company: '',
      companyConfirm: null,
      // 电话号
      phoneNumber: null,
      phoneNumberConfirm: null,
      // 图形验证
      QRCode: '',
      imgSrc,
      // 短信验证
      verifyCode: null,
      timer: null,
      isClicked: false
    }
  },

  computed: {
    addPhoneNumberTitle () {
      return `为提高账户安全性，请绑定手机号码`
      // if (this.$store.state.userInfo.dengji === 1) {
      // } else {
      //   return `绑定手机号码, 每天可免费看<span class="t-red">5</span>条信息详情`
      // }
    },
    canClick () {
      let {userName, company, phoneNumber} = this
      return (
      (userName.length > 0 && userName.length < 5) &&
      (company.length > 2) &&
      reg.test(phoneNumber) &&
      this.QRCode.length === QRCodeLength)
    },
    timerBtnClass () {
      return (this.timer === null &&
            reg.test(this.phoneNumber) &&
            this.QRCode.length === QRCodeLength) ? 'bg-blue t-white' : 'bg-white t-gray phone-isClicked'
    },
    timerText () {
      return this.timer === null ? `获取验证码` : `重新发送(${this.timer}s)`
    }
  },

  methods: {
    /**
     * 验证
     * @return {[type]} [description]
     */
    userNameVerify () {
      let {userName} = this
      this.userNameConfirm = (userName.length > 0 && userName.length < 5)
    },
    companyVerify () {
      let {company} = this
      this.companyConfirm = (company.length > 2)
    },
    phoneNumberVerify () {
      let {phoneNumber} = this
      this.phoneNumberConfirm = reg.test(phoneNumber)
    },
    changeImg () {
      this.imgSrc = `${imgSrc}?${Date.now()}`
    },
    /**
     * 监测图形验证码
     */
    getVerifyCode () {
      if (!this.phoneNumberConfirm) {
        this.setToast({text: '请输入正确的手机号'})
      } else if (this.QRCode && this.QRCode.length !== 4) {
        this.setToast({text: '请输入正确的验证码'})
      } else if (this.timer === null) {
        this.isClicked = true
        this.timer = 60
        this.setTimer()
        this.valimage({yzmCode: this.QRCode}).then(response => {
          if (response.data === true) {
            this.sendmsgFn()
          } else {
            this.setToast({text: '验证码不正确'})
          }
        })
      }
    },
    /**
     * 监测手机验证码
     */
    sendmsgFn () {
      this.sendmsg({phoneNum: this.phoneNumber}).then(response => {
        if (response.data === 0) {
          this.setToast({text: '验证码已发送'})
        }
      })
    },
    /**
     * [text description]
     * @type {String}
     */
    selMemSourceFn () {
      this.selMemSource().then(response => {
        let {name, phoneNumber, companyName} = response.data
        this.phoneNumber = phoneNumber || ''
        this.userName = name || ''
        this.company = companyName || ''
      })
    },
    /**
     * 保存手机号
     */
    upMemSourceFn () {
      if (!this.canClick) {
        this.setToast({text: '请填写完整信息'})
        return
      }
      this.upMemSource({
        name: this.userName,
        companyName: this.company,
        phone: this.phoneNumber,
        code: this.QRCode
      }).then((response) => {
        if (response.data === 0) {
          this.setToast({text: '信息已经保存'})
          this.$store.state.userInfo.needSource = false
          this.$router.back()
        } else if (response.data === 1) {
          this.setToast({text: '验证码输入错误'})
        } else {
          this.setToast({text: '未保存'})
        }
      })
    },
    setTimer () {
      setTimeout(() => {
        this.timer--
        if (this.timer < 0) {
          this.timer = null
          return
        }
        this.setTimer()
      }, 1000)
    },
    ...mapActions([
      'setToast', 'valimage', 'sendmsg', 'upMemSource', 'selMemSource'
    ])
  },

  components: {
    YfbAppbar, InputGroup, Icon
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.add-phone-number {
  height: 100%;
  overflow: hidden;
  background: #fff;
  .add-phone-number-content {
    position: relative;
    flex-grow: 1;
  }
  .add-phone-number-title {
    text-align: center;
    .t-lg {
      padding-top: 0.6em;
      font-size: 28px;
      font-weight: 600
    }
    .t-sm {
      font-size: 12px;
      line-height: 2em;
    }
    // height: 30px;
    // font-size: 16px;
    // background: #fff9c4;
  }
  .input-addition {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: px2rem(230);
    width: px2rem(230);
    .QRImage {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: px2rem(115);
      min-width: px2rem(115);
      img {
        display: block;
        width: 100%;
        max-height: 45px;
      }
    }
    .chenge-img {
      line-height: px2rem(30);
      max-height: px2rem(60);
      padding: 0 5px;
      .icon {
        display: block;
        height: 1em;
        color: #333;
      }
      span {
        line-height: 1em;
        height: 1em;
        white-space: nowrap;
      }
    }
    .timer {
      flex-grow: 1;
      .btn {
        width: 80%;
        font-size: px2rem(26);
        line-height: px2rem(60);
        height: px2rem(60);
        margin: auto;
        box-sizing: border-box;
      }
      .phone-isClicked {
        border: 1px solid #c2c2c2;
      }
      .t-gray {
        color: #c2c2c2;
      }
    }
  }
  .bg-dgray {
    background: #c2c2c2;
  }
  .btn {
    display: block;
    width: 90%;
    height: 2.5rem;
    line-height: 2.5rem;
    margin: 20px auto;
    font-size: 16px;
    color: #fff;
  }
}

</style>
