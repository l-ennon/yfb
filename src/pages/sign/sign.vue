<template lang="pug">
  .canvas-sign
    .scroll-content(:style="{overflow: touchFlag ? 'hidden' : 'auto'}")
      .meun-list(v-for="i in 10")
        Ball(@plus="fly")
      .shopCar
        transition-group(
          name="aa",
          @before-enter="beforeEnter",
          @enter="enter",
          @after-enter="afterEnter",
          tag="div"
        )
          .ball-list(
            v-for="ball in ballList",
            :key="ball"
          )
      canvas(
        :width="gWidth",
        :height="gHeight",
        ref="canvas",
        @touchstart="touchstart",
        @touchend="touchend",
        @touchmove="touchmove"
      )
      .row
        .btn(@click="toDataURL") 导出图片
        .btn(@click="typeWeightShow = !typeWeightShow") 更改粗细
          .type.weight-type(v-show="typeWeightShow")
            div(v-for="i in 10",@click="changeWeight(i)")
              .rct(
                :style="`height:${i}px;width:${i}px`"
              )
        .btn(@click="typeColorShow = !typeColorShow") 更改颜色
          .type.color-type(v-show="typeColorShow")
            div(v-for="i in 10",@click="changeColor(i)")
              .color(
                :style="`background:rgb(${i * 111 % 256}, ${i * 222 % 256}, ${i * 333 % 256})`"
              )
        .btn(@click="clearAll") 清空画布
</template>

<script>
// import { mapState, mapMutations, mapActions } from 'vuex'
import Ball from 'components/buyBall.vue'

export default {
  name: 'canvas-sign',

  data () {
    return {
      top: 0,
      touchFlag: false,
      ballList: [
      ],
      ctx: null,
      gWidth: 0,
      gHeight: 0,
      typeWeightShow: false,
      typeColorShow: false
    }
  },

  deactivated () {
  },

  activated () {
    // document.querySelector('body').addEventListener('touchmove', function (e) {
    //   e.preventDefault()
    // })
  },

  mounted () {
    this.gWidth = window.innerWidth
    this.gHeight = window.innerHeight - 100
    this.ctx = this.$refs.canvas.getContext('2d')
    this.$nextTick(() => {
      this.ctx.beginPath()
      this.ctx.fillStyle = '#fff'
      this.ctx.fillRect(0, 0, this.gWidth, this.gHeight)
    })
  },

  watch: {
    touchFlag (n, o) {
      let body = document.querySelector('body')
      if (n) {
        body.addEventListener('touchmove', this.bodyFn)
      } else {
        body.removeEventListener('touchmove', this.bodyFn)
      }
    }
  },

  computed: {
  },

  methods: {
    bodyFn (e) {
      e.preventDefault()
    },
    beforeEnter (el) {
      let target = this.ballList.length - 1
      let {top, left} = this.ballList[target]
      top = window.innerHeight - top - 42
      console.log(top, left)
      el.style = `transform: translate3d(${left - 22}px, ${-top}px, 0)`
    },
    enter (el, done) {
      /* eslint-disable */
      let rf = el.offsetHeight
      el.style = `transform: translate3d(0, 0, 0)`
      el.addEventListener('transitionend', done)
    },
    afterEnter (el) {
      this.ballList.shift()
    },
    fly (client) {
      let {top, left} = client
      this.ballList.push({top, left})
    },

    clearAll () {
      this.ctx.fillStyle = '#fff'
      this.ctx.fillRect(0, 0, this.gWidth, this.gHeight)
      // this.ctx.clearRect(0, 0, this.gWidth, this.gHeight)
    },
    changeWeight (i) {
      this.ctx.lineWidth = i
    },
    changeColor (i) {
      this.ctx.strokeStyle = `rgb(${i * 111 % 256}, ${i * 222 % 256}, ${i * 333 % 256})`
    },
    touchstart (e) {
      this.top = this.$refs.canvas.getBoundingClientRect().top
      this.touchFlag = true
      let {clientY, clientX} = e.targetTouches[0]
      this.ctx.moveTo(clientX, clientY - this.top)
      this.ctx.beginPath()
    },
    touchend (e) {
      this.touchFlag = false
    },
    touchmove (e) {
      let {clientY, clientX} = e.targetTouches[0]
      this.ctx.lineTo(clientX, clientY - this.top)
      this.ctx.stroke()
    },
    toDataURL () {
      let url = this.$refs.canvas.toDataURL('image/jpeg')
      console.log(url)
    }
  },

  components: {
    Ball
  }
}
</script>

<style lang="scss" >

// .ball-enter-active, .ball-leave{
//   transition: all .4s;
//   opacity: 1;
//   transform: translateX(0%) rotateZ(0deg);
// }
// .ball-enter, .ball-leave-active {
//   transition: all .4s;
//   opacity: 0;
//   transform: translateX(100%) rotateZ(90deg);
// }
//
.aa-enter-active, .aa-leave {
  transition: all 1s;
}
.aa-enter, .aa-leave-active {
  transition: all 1s;
}



.ball-list {
  position: fixed;
  left: 22px;
  bottom: 22px;
  width: 20px;
  height: 20px;
  background-color: rgb(130, 224, 131)
}
.shopCar {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 20px;
  height: 20px;
  background-color: rgb(29, 233, 166)
}
.canvas-sign {
  // height: 100%;
  .btn {
    position: relative;
    width: 25%;
    text-align: center;
  }
  .type {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
  }
  .weight-type {
    > div {
      padding: 5px 0;
    }
    .rct {
      border-radius: 50%;
      margin: auto;
      background-color: rgb(17, 74, 126)
    }
  }
  .weight-type {
    > div {
      padding: 5px 0;
    }
    .rct {
      margin: auto;
      background-color: rgb(17, 74, 126)
    }
  }
  .color-type {
    > div {
      .color {
        height: 20px
      }
    }
  }
}
</style>
