<template lang="pug">
  .set-keyword-group
    .input-group
      label.row
        span(v-text="`主营产品${index + 1}`")
        input.t-dgray(
          ref="input",
          @focus="focus",
          @blur="blur",
          :class="disable"
          type="text",
          @input.trim="updateValue($event.target.value)",
          :value="value",
          placeholder="请输入关键词(限6个字)",
          maxlength="6"
        )
      .del.column.main-center(
        :class="{'opacity': deleteIconShow}",
        @click="delInput"
      )
    .key-count(
      v-show="!isFocus",
      v-html="keyCount"
    )
    .disable-hint(
      v-if="disable",
      v-html="disableWord"
    )
    .association(v-if="isFocus")
      .association-item(
        v-for="item in associationList",
        @click="associateClick(item)"
      )
        p.bg-gray(
          data-track="主营产品点击事件",
          v-text="item"
        )
</template>

<script>
import {mapActions} from 'vuex'
import util from 'util'
export default {
  created () {
    // this.regList = ['工程', '项目', '招标', '制作', '预告', '公告', '中标', '标段', '维护', '采购']
    this.regList = /^(?:(工程)|(项目)|(招标)|(制作)|(预告)|(公告)|(中标)|(标段)|(维护)|(采购)|[0-9]+)$/
  },

  data () {
    return {
      isFocus: false,
      list: [],
      isSomeWords: null,
      isAssociationLoading: false,
      isKeyCountLoading: false,
      keyCount: '',
      disableWord: `<span class="t-red">此关键词无法准确匹配信息, 请点击修改</span>`
    }
  },

  props: ['value', 'deleteIconShow', 'index', 'keywords'],

  mounted () {
  },

  activated () {
    this.keyCount = ''
  },

  watch: {
  },

  computed: {
    associationList () {
      return this.list.slice(0, 10)
    },
    disable () {
      // return this.regList.includes(this.value) ? 'disable' : ''
      return this.regList.test(this.value) ? 'disable' : ''
    }
  },

  methods: {
    associateClick (value) {
      this.updateValue(value)
      this.associateClickCount()
    },
    blur () {
      this.keyCount = ''
      setTimeout(() => {
        this.$emit('blur', true)
        this.isFocus = false
        this.getQueryKeyCount()
      }, 20)
    },
    focus () {
      let {keywords} = this
      keywords = keywords.filter(item => {
        return item !== ''
      })
      if (this.value === '' && keywords.length !== 0) {
        setTimeout(() => {
          this.$emit('focus', this.$refs.input)
        }, 500)
        this.isFocus = true
        this.getAssociation(keywords)
      }
    },
    updateValue (value) {
      this.keyCount = ''
      let formattedValue = value.trim()
      if (formattedValue !== value) {
        this.$refs.input.value = value
      }
      this.$emit('input', formattedValue)
      this.$nextTick(this.focus)
    },
    getQueryKeyCount () {
      if (this.isKeyCountLoading || !this.value || this.disable) return
      this.isKeyCountLoading = true
      this.querykeycount({keyword: this.value}).then((res) => {
        let {count} = res.data
        this.isKeyCountLoading = false
        this.keyCount = `发现 <span class="t-red">${count}</span> 条招标信息`
      })
    },
    getAssociation (keywords) {
      let {isAssociationLoading, isSomeWords} = this
      if (isAssociationLoading || util.isSomeArray(isSomeWords, keywords)) return
      this.isAssociationLoading = true
      this.list = []
      this.isSomeWords = keywords.slice()
      this.association({
        keywords
      }).then(res => {
        this.isAssociationLoading = false
        this.list = res.data
      })
    },
    delInput () {
      this.$emit('delete', true)
    },
    ...mapActions(['association', 'associateClickCount', 'querykeycount'])
  }
}
</script>

<style lang="scss">
.set-keyword-group {
  .association {
    padding: 0 12px 0 0;
    &::after {
      content: '';
      display: block;
      clear: both;
    }
    .association-item {
      float: left;
      margin-top: 0.5em;
      margin-right: 0.5em;
      font-size: 14px;
    }
    p.bg-gray {
      padding: 0.25em 0.5em;
      border-radius: 4px;
    }
  }
  .key-count, .disable-hint {
    color: #757575;
    text-align: center;
    font-size: 14px;
  }
  .input-group {
    align-items: center;
    margin-top: 15px;
    label {
      flex: 1;
      span {
        flex: 0 0 5em;
        line-height: 30px;
      }
      input {
        flex: 1;
        height: 28px;
        margin-left: .5em;
        border: 1px solid #d7d7d7;
        border-radius: 5px;
        text-indent: .5em;
        background: #f5f5f5;
        &.disable {
          color: #ff3b30;
          border: 1px solid #ff3b30;
        }
      }
    }
    .opacity {
      opacity: 0;
    }
    .del {
      transition: all .4s 0s;
      height: 23px;
      width: 23px;
      margin-left: .5em;
      margin-right: .5em;
      border-radius: 50%;
      background: #ff3b30;
      &::after {
        content: '';
        width: 9px;
        height: 3px;
        background: #fff;
      }
    }
  }
}


</style>
