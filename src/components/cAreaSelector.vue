<template lang="pug">
.area-selector
  .content.row
    .area-scroller.bg-gray(ref="areaScroller")
      ul
        li(
          v-for="(areaName, index) in area",
          @click.prevent="selectArea(areaName, index)",
          :class="{ 't-center': cityList.length === 0, 't-blue area-picked': selected.cityList[areaName.id] && areaIndex !== index, 't-blue bg-white': areaIndex === index }"
        )
          .area-name(v-text="areaName.name")
    .city-scroller.bg-white(v-show="cityList.length",ref="cityScroller")
      ul
        li(
          v-if="cityList.length !== 1",
          @click="selectCity({name:curAreaName.name,id:curAreaName.id})",
          :class="(selected.cityList[curAreaName.id] && selected.cityList[curAreaName.id][curAreaName.id]) ? 't-blue area-picked' : 't-gray'"
        )
          .city-name 全省
        li(
          v-for="(cityName, index) in cityList",
          :class="{'t-blue area-picked':(selected.cityList[curAreaName.id] && selected.cityList[curAreaName.id][cityName.id]) ||(selected.cityList[curAreaName.id] && selected.cityList[curAreaName.id][curAreaName.id]) }"
        )
          .city-name(
            @click="selectCity(cityName)",
            v-text="cityName.name"
          )
</template>

<script>
import BS from 'better-scroll'
export default {
  name: 'c-area-selector',

  data () {
    return {
      cityList: [],
      areaIndex: 0,
      curAreaName: {
        id: null
      },
      cityScroller: null,
      areaScroller: null,
      transition: 'slide-left'
    }
  },

  computed: {
    areaId () {
    }
  },

  beforeMount () {
  },

  mounted () {
    this.$set(this, 'cityList', this.area[0].hasCity)
    this.$set(this, 'curAreaName', this.area[0])
    this._initScroller()
  },

  watch: {
    mount (newValue) {
      if (newValue) {
        this._initScroller()
      }
    }
  },

  props: {
    mount: {
      type: Boolean,
      default: false
    },
    area: {
      type: Array,
      default () {
        return []
      },
      required: false
    },
    selected: {
      type: Object,
      default () {
        return {
          cityList: {}
        }
      },
      required: false
    }
  },

  methods: {
    _initScroller () {
      setTimeout(() => {
        if (this.areaScroller === null) {
          this.areaScroller = new BS(this.$refs.areaScroller, {
            click: true
          })
        } else {
          this.areaScroller.refresh()
        }
      }, 20)
    },
    /**
     *
     */
    selectArea (areaName, i) {
      this.areaIndex = i
      this.curAreaName = areaName
      this.$set(this, 'cityList', areaName.hasCity)
      this.$nextTick(() => {
        if (this.cityScroller) {
          this.cityScroller.refresh()
        } else {
          this.cityScroller = new BS(this.$refs.cityScroller, {
            click: true
          })
        }
      })
    },
    selectCity (cityName) {
      this.$emit('select', [this.curAreaName.id, cityName])
    }
  }
}
</script>

<style lang="scss">
@import "../common/scss/mixin.scss";
.content {
  height: 100%;
  a{
    height: 100%;
  }
}
.city-scroller, .area-scroller{
  flex-grow: 1;
  text-indent: 2em;
  white-space: nowrap;
  .area-picked {
    background: #d9efff;
  }
  li {
    line-height: 45px;
    height: 45px;
    color: #333;
    font-size: 14px;
    box-sizing: content-box;
  }
}
// .city-scroller {
//   li {
//     border-bottom: 1px solid #f2f2f2
//   }
// }
</style>
