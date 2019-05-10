<template lang="pug">
  .pick-city-box.clear-float
    .city-item(v-if="text", v-text="text")
    template(v-for="(area, areaId) in selectCitys")
      .city-item(v-for="(city, cityId) in area")
        //- .delete-icon(v-if="removeButton && isDeleteShow")
        .delete-icon(v-if="removeButton")
          .row.main-center(
            @click="remove({areaId, cityId})"
          )
            icon(icon="icon-close")
        .join-city.bg-gray(
          :class="isPay && 't-blue'",
          v-text="city"
        )
    .city-item-add(v-if="addButton")
      .join-city.t-white(
        @click="add",
        :style="addBtnStyle"
      ) 添加地区
</template>

<script>
import {Icon} from 'components'
export default {
  name: 'pick-city',

  data () {
    return {
      copyCityList: {}
    }
  },

  props: {
    /**
     * 添加地区按键样式
     * @type {Object}
     * @param {String}
     */
    addBtnStyle: {
      type: String,
      default: 'background: #0094fe'
    },
    /**
     * 选项列表
     * @type {Object}
     */
    selectCitys: {
      type: Object,
      default () {
        return {}
      }
    },
    /**
     * 显示文字
     * @type {Object}
     */
    text: {
      type: String
    },
    /**
     * 控制颜色
     * @type {Object}
     */
    isPay: {
      type: Boolean
    },
    /**
     * 是否显示添加按钮
     * @type {Object}
     */
    addButton: {
      type: Boolean
    },
    /**
     * 是否显示删除按钮
     * @type {Object}
     */
    removeButton: {
      type: Boolean
    }
  },

  computed: {
    isDeleteShow () {
      let a = 0
      Object.values(this.selectCitys).forEach(name => {
        a += Object.keys(name).length
      })
      return a > 1
    }
  },

  methods: {
    add () {
      this.$emit('add', true)
    },
    remove (id) {
      this.$emit('remove', id)
    }
  },

  components: {
    Icon
  }
}
</script>

<style lang="scss">
</style>
