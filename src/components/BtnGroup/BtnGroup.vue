<template lang="pug">
  .btn-group
    button.btn(
      v-for="(btn, index) of btns",
      :class="{active: type === index}",
      @click="toggle(btn.to, index)"
    )
      span(v-text="btn.title")
      .dot(v-if="btn.dot")
</template>

<script>
export default {
  name: 'btn-group',

  data () {
    return {
    }
  },

  props: {
    type: {
      type: Number,
      default: 0
    },
    btns: {
      type: Array,
      default: [],
      required: true
    }
  },
  methods: {
    toggle (path, index) {
      this.$emit('toggle', this.type > index)
      this.$emit('index', index)
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="scss">
.btn-group{
  .btn{
    position: relative;
    flex: 1;
    height: 100%;
    min-width: 5rem;
    text-align: center;
    border: 1px solid #0094fe;
    border-radius: 0;
    margin-left: -1px;
    color: #0094fe;
    &:first-child{
      margin-left: 0;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:last-child{
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
  .active{
    background: #0094fe;
    color: #fff;
  }
}
</style>
