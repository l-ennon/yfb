<template lang="pug">
  //- .test(@wheel="wheel")
  //- .test.scroll-content(ref="scroll")
  //-   //- p {{count}}
  //-   //- button.btn(@click="getData") asdf
  //-   div(v-for="(val, i) in 20", ref="div")
  //-     label
  //-       span {{i}}
  //-       input(
  //-         @focus="test",
  //-         @blur="isFocus = false"
  //-       )
  //-   div(
  //-     v-show="isFocus",
  //-     style="height: 400px;background: rgb(91, 13, 53)"
  //-   )
  .test.absolute.row
    img(src='')
    .warp(
      ref="scroll",
      @scroll="scroll"
    )
      div(
        ref="div",
        v-for="i in 20"
      )
        .title {{i}}
    .list
      div(
        v-for="(item, i) in 20",
        @touchstart="touchstart",
        @touchmove="touchmove",
        :class="{'action': i === currentIndex}"
      )
        .title {{item}}
</template>

<script>
import {mapActions} from 'vuex'
import axios from 'axios'
var CancelToken = axios.CancelToken
let count = 0
let listHeight = []
let touchTop = {}
export default {
  mounted () {
    this.$refs.div.forEach(item => {
      listHeight.push(item.offsetTop)
    })
    let h = this.$refs.div.reduce((p, c, index) => {
      return p + ~~c.offsetHeight
    }, 0)
    console.log(h)
  },
  data () {
    return {
      currentIndex: null,
      count: 0,
      cancel: null,
      isFocus: false
    }
  },
  computed: {
  },
  methods: {
    scrollTo () {
      let h = this.$refs.div[this.currentIndex].offsetTop
      this.$refs.scroll.scrollTop = h
    },
    scroll () {
      let top = this.$refs.scroll.scrollTop
      for (var i = 0; i < listHeight.length; i++) {
        if (listHeight[i] < top && listHeight[i + 1] > top) {
          this.currentIndex = i
        }
      }
    },
    touchstart (e) {
      touchTop.y1 = e.touches[0].screenY
      touchTop.currentIndex = ~~e.target.innerHTML - 1
      this.currentIndex = touchTop.currentIndex
      this.scrollTo()
    },
    touchmove (e) {
      touchTop.y2 = e.touches[0].screenY
      this.currentIndex = touchTop.currentIndex + Math.floor((touchTop.y2 - touchTop.y1) / 18)
      this.scrollTo()
    },
    wheel (e) {
      console.log(e)
    },
    test (e) {
      this.isFocus = true
      let index = 0
      let target = this.$refs.div.filter((val, i) => {
        let isSome = val.querySelector('input') === e.target
        if (isSome) index = i
        return isSome
      })
      console.log(index)
      this.$nextTick(() => {
        this.$refs.scroll.scrollTop = target[0].offsetTop
      })
    },
    getData () {
      if (this.cancel) this.cancel()

      axios.get(`/testAPI?count=${++count}&openid=${123}`, {
        cancelToken: new CancelToken(c => {
          this.cancel = c
        })
      }).then(res => {
        this.count = res.data.count
      }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Rquest canceled', thrown.message)
        } else {
          // handle error
        }
      })
    },
    ...mapActions(['fetch'])
  }
}
</script>

<style lang="scss" scoped>
.test {
  text-align: center;
  .warp {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .title {
      height: 80px;
      line-height: 80px;
    }
  }
  .list {
    .title {
      height: 18px;
      line-height: 18px;
    }
  }
  .action {
    color: #f90
  }
  input {
    margin: 10px;
    line-height: 2em;
  }
}
// .btn {
//   width: 100%;
//   background: rgb(159, 171, 87);
//   font-size: 24px;
//   line-height: 2em;
// }
</style>
