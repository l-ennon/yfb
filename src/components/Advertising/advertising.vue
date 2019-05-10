<template lang="pug">
  .advertising.column.main-center(v-if="advertising.isShow")
    .image-box
      .image-close.column.main-center(@click="close")
      img(src="../../common/imgs/advertisingimg.png")
      .image-btn
        button.btn(@click="pathTo")
          span 点击订阅
          icon(icon="icon-aright")
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Icon from '../Icon'

export default {
  name: 'advertising',

  computed: {
    ...mapState(['advertising'])
  },

  methods: {
    close () {
      this.setAdvertisingShow({isShow: false})
    },
    pathTo () {
      this.toZXCG()
    },
    ...mapMutations(['toZXCG', 'setAdvertisingShow'])
  },

  components: {
    Icon
  }
}
</script>

<style lang="scss">
  @import "../../common/scss/mixin.scss";
  .advertising {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    background: rgba(0, 0, 0, 0.45);
    .image-box {
      position: relative;
      width: 80%;
      .image-btn {
        position: absolute;
        bottom: px2rem(40);
        width: 100%;
        text-align: center;
        .btn {
          width: 50%;
          height: 2em;
          border-radius: 40px;
          color: #fff;
          font-size: 16px;
          background: #ff7d03;
          .icon {
            padding-left: .2em;
          }
        }
      }
      .image-close {
        position: absolute;
        top: -35px;
        right: 0;
        height: 25px;
        width: 25px;
        border: 1px solid rgb(255, 255, 255);
        border-radius: 50%;
        transform: rotate(45deg);
        &::before, &::after {
          content: '';
          position: absolute;
          background: rgb(255, 255, 255);
        }
        &::before {
          width: 80%;
          height: 1px;
        }
        &::after {
          height: 80%;
          width: 1px;
        }
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
</style>
