<template lang="pug">
  .ball.row
    transition(name="ball")
      .less.row.main-center(
        v-if="count > 0"
        @click="less"
      )
    transition(name="fade")
      .text(v-if="count > 0") {{count}}
    .plus.row.main-center(
      ref="ball",
      @click="plus"
    )
</template>

<script>
export default {
  name: 'ball',
  data () {
    return {
      count: 0
    }
  },
  props: {
  },
  methods: {
    plus () {
      let client = this.$refs.ball.getBoundingClientRect()
      this.count++
      this.$emit('plus', client)
    },
    less () {
      this.count--
    }
  }
}
</script>

<style lang="scss">
.ball {
  justify-content: flex-end;
}
.plus, .less {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.text {
  width: 2em;
  text-align: center;
}
.plus {
  background: rgb(73, 134, 252);
  &::after {
    content: '';
    display: block;
    height: 3px;
    width: 60%;
    background-color: #fff
  }
  &::before {
    content: '';
    display: block;
    height: 60%;
    width: 3px;
    background-color: #fff
  }
}
.less {
  background: rgb(247, 142, 17);
  &::after {
    content: '';
    display: block;
    height: 3px;
    width: 60%;
    background-color: #fff;
  }
}
.ball-enter-active, .ball-leave{
  transition: all .4s;
  opacity: 1;
  transform: translateX(0%) rotateZ(0deg);
}
.ball-enter, .ball-leave-active {
  transition: all .4s;
  opacity: 0;
  transform: translateX(100%) rotateZ(90deg);
}

</style>
