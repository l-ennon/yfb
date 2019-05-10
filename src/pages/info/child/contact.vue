<template lang="pug">
  .contact
    yfb-title(:title="title")
    .contact-list
      .contact-item(v-for="item in contactList")
        .contact-item-text(v-for="(val, index) in itemList")
          span.title(v-text="`${val.title}: `")
          span.key(v-text="`${item[val.key]}`")
</template>

<script>
import {YfbTitle} from 'yfb'

export default {

  props: {
    isShow: {
      type: Boolean
    },
    title: {
      type: String,
      required: true,
      default: '123'
    },
    contactList: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      itemList: [
        {title: '单位名称', key: 'dwmc'},
        {title: '联系人', key: 'lxrName'},
        {title: '电话', key: 'telPhone'},
        {title: '传真', key: 'facsimile'},
        {title: '地址', key: 'address'},
        {title: '备注', key: 'beizhu'}
      ]
    }
  },

  components: {
    YfbTitle
  }
}
</script>

<style lang="scss">
.contact-list {
  padding: 12px;
  background: #fff;
  .contact-item {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .contact-item-text {
    font-size: 16px;
    .title {
      color: rgb(101, 101, 101)
    }
  }
}
</style>
