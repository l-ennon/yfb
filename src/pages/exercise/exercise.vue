<template lang="pug">
.exercise
  transition(name="fade")
    log(
      text="开通申请已提交",
      :isShow="isShow",
      @logClose="logClose",
      @logClick="logClick"
    )
  yfb-appbar(title="甲方中标企业")
  .scroll-content
    .exercise-img
      img(src="../../common/imgs/181540.png")
    .exercise-btn
      button.btn.bg-blue.t-white(@click="exerciseAction") 2元立即开通本服务
    .exercise-note
      span 注: 开通后所有项目均可查看
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {YfbAppbar} from 'yfb'
import {Log} from 'components'

export default {
  name: 'exercise',

  data () {
    return {
      isShow: false
    }
  },

  activated () {
  },

  deactivated () {
  },

  watch: {
  },

  computed: {
    ...mapState([
      'area', 'subscription', 'user'
    ])
  },

  methods: {
    logClose () {
      this.isShow = false
    },
    logClick () {
      this.logClose()
      this.$router.back()
    },
    exerciseAction () {
      this.isShow = true
      this.action({logType: 4})
    },
    ...mapMutations([
      'changeSelectType'
    ]),
    ...mapActions([
      'changeSelectCity', 'action'
    ])
  },

  components: {
    YfbAppbar, Log
  }
}
</script>

<style lang="scss" >
  @import "../../common/scss/mixin.scss";
  .exercise-img {
    img {
      display: block;
      width: 100%;
    }
  }
  .exercise-btn {
    padding: px2rem(25);
    .btn {
      display: block;
      width: 100%;
      line-height: 2.5em;
      text-align: center;
      font-size: 16px;
    }
  }
  .exercise-note {
    text-align: center;
    span {
      color: #666;
      font-size: 13px;
    }
  }
</style>
