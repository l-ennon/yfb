<template lang="pug">
  label.input-group.main-center
    span 信息
    input(v-model="word",type="text",placeholder="请输入关键词(限6个字)")
</template>

<script>
export default {
  data () {
    return {
      word: 'asdf'
    }
  },

  props: {
  },

  watch: {
    word () {
      this.$emit('input', this.word)
    }
  }
}
</script>

<style lang="scss">
.input-group{
  font-size: 14px;
  span{
    flex: 0 1 5rem;
  }
  input{
    flex: 0 1 10rem;
    border: 1px solid #dedede;
  }
}
</style>
