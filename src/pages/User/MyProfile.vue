<template lang="pug">
  .my-profile
    yfb-appbar(title="我的资料")
    .scroll-content
      .cell-header.row.main-between
        .cell-title.row.main-center
          span 我的头像
        .cell-img
          img(:src="userInfo.imgUrl")
      .cell-wrapper
        .cell-title
          span 真实名称
        .cell-value
          input(placeholder="输入您的名字",v-model.trim="name")
      .cell-wrapper
        .cell-title
          span 手机号码
        .cell-value
          input(placeholder="输入您的名字",v-model.trim="phoneNumber")
      .cell-wrapper
        .cell-title
          span 公司名称
        .cell-value
          input(placeholder="输入您的名字",v-model.trim="companyName")
      .cell-wrapper
        .cell-title
          span 职位
        .cell-value
          input(placeholder="输入您的名字",v-model.trim="job")
      .button
        button.bg-blue.t-white(@click="updata") 提交资料
</template>

<script>
import {YfbAppbar} from 'yfb'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'my-profile',

  data () {
    return {
      name: '',
      phoneNumber: '',
      companyName: '',
      job: ''
    }
  },

  computed: {
    ...mapState([
      'userInfo'
    ])
  },

  mounted () {
    // this.selMemSource().then((res) => {
    //   if (res.status === 200) {
    //     let content = res.data
    //     this.name = content.name
    //     this.phoneNumber = content.phoneNumber
    //     this.companyName = content.companyName
    //     this.job = content.job
    //   }
    // })
  },

  methods: {
    updata () {
      let {name, phoneNumber, companyName, job} = this
      this.upMemSource({name, phoneNumber, companyName, job})
    },
    ...mapActions([
      'selMemSource', 'upMemSource'
    ])
  },

  components: {
    YfbAppbar
  }
}
</script>

<style lang="scss">
@import "../../common/scss/base.scss";
@import "../../common/scss/mixin.scss";
  .my-profile {
    z-index: 2;
    box-sizing: border-box;
    overflow-y: auto;
    background: #efeff4;
    -webkit-overflow-scrolling: touch;
    .scroll-content {
      padding-bottom: px2rem(100);
    }
  }
  .cell-header {
    margin: 10px 0;
    padding: 10px 5%;
    background: #fff;
    .cell-title {
      font-size: 16px;
    }
    .cell-img {
      width: 72px;
      height: 72px;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .cell-wrapper {
    height: 48px;
    line-height: 48px;
    padding: 0 5%;
    font-size: 16px;
    background: #fff;
    margin: 10px 0;
    @extend .row;
    @extend .main-center;
    .cell-title {
      flex: 0 0 105px;
      span {

      }
    }
    .cell-value {
      flex: 1;
      input {
        width: 100%;
        font-size: 16px;
      }
    }
  }
  .button {
    padding: 0 5%;
    button {
      width: 100%;
      height: 40px;
      border-radius: 5px;
      font-size: 16px;
      margin: 10px 0;
    }
  }
</style>
