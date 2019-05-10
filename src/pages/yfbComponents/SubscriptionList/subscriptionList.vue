<template lang="pug">
  .yfb-list
    slot
    ul(v-show="length")
      template(v-if="isContentArray")
        li(
          v-for="(item,key) in content",
          :key="item.contentid",
          @click="toDatil(item)"
        )
          list-view(:item="item")
      template(v-else)
        li(v-for="(items,key) in keys")
          p.updataTime {{items | timeAgo}}
          ul
            li(
              v-for="item in content[items]",
              :key="item.contentid",
              @click="toDatil(item)"
            )
              list-view(:item="item")
    slot(name="infiniteScroll")
</template>

<script>
import subscriptionListView from './subscriptionListView.vue'
import {timeAgo} from '../../../filters'

export default {
  name: 'subscription-list-view',

  props: {
    content: {
      type: [Object, Array],
      required: true
    }
  },

  data () {
    return {
    }
  },

  filters: {
    timeAgo
  },

  computed: {
    isContentArray () {
      return Array.isArray(this.content)
    },
    keys () {
      let p = parseInt
      return Object.keys(this.content).sort((a, b) => {
        return p(b) - p(a)
      })
    },
    length () {
      return Object.keys(this.content).length
    }
  },

  methods: {
    toDatil (item) {
      this.$emit('toDatil', item)
      this.$emit('eventAction', item)
    }
  },

  components: {
    listView: subscriptionListView
  }
}
</script>

<style lang="scss">
@import "../../../common/scss/mixin.scss";
.yfb-list {
  ul {
    ul {
      li:last-child {
        .list-view {
          margin-bottom: 0;
        }
      }
    }
  }
}
.updataTime {
  line-height: 30px;
  text-align: center;
}
</style>
