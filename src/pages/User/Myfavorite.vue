<template lang="pug">
  .my-favorite.column
    yfb-appbar(title="我的收藏")
    .favorite-list(ref="scroller")
      .scroll-content.column
        .favorite-has-none.column.main-center(v-if="content.length === 0 && !loading")
          .favorite-has-none-img
            img(src="../../common/imgs/none.png")
          .favorite-has-none-txt
            span.t-gray 您还没有收藏哦
        template(v-else)
          list(
            :content="content",
            @toDatil="toDatil"
          )
            infinite-scroll(
              slot="infiniteScroll",
              @load="loadMore",
              :scroller="scroller",
              :loading="loading"
            )
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {YfbAppbar, SubscriptionList} from 'yfb'
import {InfiniteScroll} from 'components'
export default {
  name: 'my-favorite',

  data () {
    return {
      scroller: null,
      loading: false
    }
  },

  computed: {
    content () {
      return this.user.scList.zblist
    },
    ...mapState([
      'user'
    ])
  },

  mounted () {
    this.scroller = this.$refs.scroller
  },

  activated () {
    this.user.scList.currentpage = 0
    this.loadMore()
  },

  methods: {
    toDatil (item) {
      let {contentid} = item
      this.$router.push({name: 'info', params: {page: contentid}})
    },
    loadMore () {
      if (!this.loading && this.user.updata) {
        this.loading = true
        this.scListFn().then(() => {
          this.loading = false
        })
      }
    },
    ...mapActions([
      'scListFn'
    ])
  },

  components: {
    YfbAppbar, list: SubscriptionList, InfiniteScroll
  }
}
</script>

<style lang="scss">
.my-favorite {
  height: 100%;
}
.favorite-list {
  position: relative;
  display: flex;
  flex-grow: 1;
}
.favorite-has-none {
  flex-grow: 1;
  .favorite-has-none-img {
    width: 30vw;
    img {
      display: block;
      width: 100%;
    }
  }
  .favorite-has-none-txt {
    padding-top: 20px;
    font-size: 16px;
  }
}
</style>
