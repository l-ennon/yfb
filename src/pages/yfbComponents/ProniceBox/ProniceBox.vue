<template lang="pug">
  .pick-city-box.clear-float
    .city-item(v-if="text", v-text="text")
    .city-item(v-for="(province, provinceId) in selectCitys")
      .delete-icon(v-if="removeButton && isDeleteShow")
        .row.main-center(
          @click="remove({provinceId})"
        )
          icon(icon="icon-close")
      .join-city.bg-gray(
        :class="isPay && 't-blue'",
        v-text="province"
      )
    .city-item-add(v-if="addButton")
      .join-city.bg-blue.t-white(@click="add") 添加
</template>

<script>
import {Icon} from 'components'
export default {
  name: 'pick-city',

  data () {
    return {
    }
  },

  props: {
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
      return Object.keys(this.selectCitys).length > 1
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
