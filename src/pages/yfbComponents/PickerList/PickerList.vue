<template lang="pug">
  div
    .area-pick.scroll-content
      .area-name(
        v-for="val in content",
        v-text="val.name",
        @click="pickCity(val)",
        :class="{selected: selectedCity[val.id]}"
      )
    .filter-option.row.main-center
      .filter-option-btn
        button.btn.cancel(@click="cancel",type="button") 重置
      .filter-option-btn
        button.btn.confirm(@click="confirm",type="button") 确定
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      default () {
        return []
      }
    }
  },

  methods: {
    pickCity (val) {
      if (this.selectedCity[val.id]) {
        this.$delete(this.selectedCity, val.id)
      } else {
        this.$set(this.selectedCity, val.id, val.name)
      }
      console.log(this.selectedCity)
    },
    cancel () {

    },
    confirm () {

    }
  }
}
</script>

<style lang="scss">
</style>
