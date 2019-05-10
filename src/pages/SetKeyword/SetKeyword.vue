<template lang="pug">
  .set-keyword.column(:style="transformTop")
    set-keyword-page
    yfb-appbar(title="订阅",@back="back")
    .set-keyword-content
      .scroll-content(ref="scroller")
        .set-input
          .set-title.row
            span 产品或行业关键词
          transition-group(name="fade",mode="out-in",tag="div")
            .set-input-list(v-for="(key, i) in keywords", :key="i")
              input-group(
                :keywords="keywords",
                :index="i",
                v-model="keywords[i]",
                :deleteIconShow="keywords.length <= 1",
                @delete="delInput(i)",
                @focus="InputFocus"
              )
          .set-input-hint(v-if="hint")
            span.t-red 请填写主营产品
          transition(name="fade",mode="out-in",tag="div")
            .set-add-input-btn(
              v-show="keywords.length < 5",
              :key="6"
            )
              button.btn.bg-blue(
                @click="addInput"
              )
                icon(icon="icon-jiahao")
                span 添加主营产品
        .set-area
          .set-title.row
            span 业务地区范围
          .set-area-table.set-membership(v-if="userInfo.dengji === 1")
            city-pick(
              :selectCitys="subscription.payCityList.cityList",
              text="会员地区:"
            )
          .set-area-table
            city-pick(
              :selectCitys="subscription.freeCityList.cityList",
              :addButton="true",
              :removeButton="true",
              @add="add",
              @remove="remove"
            )
            .ccc {{keyCount}}
        .set-sub-btn
          button.btn.bg-blue(
            @click="setSub"
          ) 开始订阅
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import {YfbAppbar, CityPick} from 'yfb'
import {Icon} from 'components'
import inputGroup from './child/InputGroup'
import setKeywordPage from 'components/setKeywordPage.vue'

export default {
  name: 'setKeywords',

  data () {
    return {
      keywords: [],
      transformTop: null,
      keyCount: ''
    }
  },

  activated () {
    if (this.search.keyword) {
      this.keywords = [this.search.keyword]
      this.search.keyword = null
    }
  },

  mounted () {
    let cityList = this.subscription.freeCityList.cityList
    let length = Object.keys(cityList).length
    if (length !== 0) {
      this.keywords = this.search.keyword ? [this.search.keyword] : (this.subscription.keywords.length ? this.subscription.keywords : [''])
      return
    }
    this.dySettingPage().then(() => {
      if (this.subscription.keywords.length !== 0 && this.user.firstcom === '1') {
        this.$router.replace('/index/subscription/mySubscriptions')
      }
      this.keywords = this.search.keyword ? [this.search.keyword] : (this.subscription.keywords.length ? this.subscription.keywords : [''])
    })
    console.log(this)
  },

  computed: {
    hint () {
      let a = this.keywords.filter(word => {
        return word !== ''
      })
      return a.length === 0
    },
    ...mapState([
      'subscription', 'user', 'search', 'userInfo'
    ])
  },

  methods: {
    InputFocus (input) {
      // this.transformTop = {'transform': `translate3d(0, -${input.offsetTop - 20}px, 0)`}
      this.$refs.scroller.scrollTop = input.offsetTop - 20
    },
    /**
     * 点击添加地区
     */
    add () {
      this.behaviour({typed: 45})
      this.user.isDy = true
      this.$router.push('/areaSelector')
    },
    /**
     * 删除已经添加的地区
     */
    remove (id) {
      this.behaviour({typed: 46})
      let {areaId, cityId} = id
      let list = this.subscription.freeCityList.cityList
      this.$delete(list[areaId], cityId)
      if (Object.values(list[areaId]).length === 0) {
        this.$delete(list, areaId)
      }
      /**
       * 删除省
       */
      if (areaId === cityId) {
        this.subscription.freeCityList.areaCount--
      } else {
        this.subscription.freeCityList.cityCount--
      }
    },
    back () {
      if (!this.userInfo.hasEjected) {
        this.userInfo.hasEjected = false
      }
    },
    setSub () {
      this.behaviour({typed: 47})
      let unVoidKeyword = []
      this.keywords.forEach((val) => {
        if (val !== '') {
          unVoidKeyword.push(val)
        }
      })
      let keywords = unVoidKeyword.join(',')
      let cityList = this.subscription.freeCityList.cityList
      if (Object.keys(cityList).length === 0) {
        this.setToast({text: '请选择地区'})
        return
      }
      if (!keywords) {
        this.setToast({text: '请输入关键词'})
        return
      }
      let list = []
      let arr = Object.values(cityList)
      for (let city of arr) {
        list = list.concat(Object.keys(city))
      }
      let freeArea = list.join(',')
      this.updateSubscription({keywords, freeArea}).then(res => {
        this.setLoadingShow()
        if (res) {
          this.subscription.keywords = unVoidKeyword
          this.subscription.myUpdata = true
          this.setToMySubscriptions(true)
          this.$router.back()
        }
      })
    },
    addInput () {
      this.behaviour({typed: 43})
      if (this.keywords.length < 5) {
        this.keywords.push('')
      }
    },
    delInput (i) {
      this.behaviour({typed: 44})
      if (this.keywords.length === 1) return
      this.keywords.splice(i, 1)
    },
    ...mapMutations([
      'setLoadingShow', 'setToMySubscriptions'
    ]),
    ...mapMutations('subscription', ['setToMySubscriptions']),
    ...mapActions([
      'dySettingPage', 'updateSubscription', 'setToast', 'behaviour', 'querykeycount'
    ])
  },

  components: {
    YfbAppbar, CityPick, setKeywordPage, Icon, inputGroup
  }
}
</script>

<style lang="scss">
.set-keyword{
  height: 100%;
  .set-title {
    height: 45px;
    align-items: center;
    -webkit-box-align: center; /*Safari,Opera,Chrome*/
    border-bottom: 1px solid #d8d8d8;
    &::before {
      content: '';
      display: block;
      height: 15px;
      width: 3px;
      margin-right: 4px;
      background: #45a5fd;
    }
    .t-dgray {
      padding-left: .5em;
    }
  }
  .set-keyword-content {
    position: relative;
    flex: 1;
  }
}
.set-input, .set-area {
  padding-left: 12px;
  padding-bottom: 15px;
  margin-top: 15px;
  font-size: 16px;
  background: #fff;
}
.set-input-hint {
  text-align: center;
  font-size: 14px;
}
.set-input-list {
}
.set-add-input-btn {
  padding-top: 10px;
  button {
    height: 26px;
    padding: 0 0.5em;
    font-size: 12px;
    color: #fff;
    span {
      padding-left: 3px;
    }
  }
}
.set-area-table {
  width: 100%;
  overflow: hidden;
}
.set-membership {
  border-bottom: 1px solid #d7d7d7;
}
.set-sub-btn {
  margin: 1rem 0;
  button {
    display: block;
    width: 90%;
    height: 2.5rem;
    font-size: 16px;
    margin: auto;
    color: #fff;
  }
}
</style>
