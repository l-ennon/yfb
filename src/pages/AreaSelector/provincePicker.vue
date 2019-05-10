<template lang="pug">
  .province-picker.absolute.column
    yfb-appbar(
      title="工程项目地区选择"
    )
    .province-picker-body.column.main-center
      .province-title(v-text="provinceCount")
      .stepper
        .stepper-content.row.main-start
          .option-area.option(
            v-for="(val, key) of area",
            @click="pickCity(val)"
          )
            div(
              v-text="val.name",
              :class="{picked: val.id in copyCityList}"
            )
      .engineering-cover
        .engineering-btn
          button.btn(
            :class="canClick ? 'bg-blue' : 'bg-dgray'",
            @click="confirm"
          ) 确认
</template>

<script>
import {mapState} from 'vuex'
import {YfbAppbar} from 'yfb'
export default {
  name: 'province-picker',

  data () {
    return {
      copyCityList: {}
    }
  },

  activated () {
    this.copyCityList = Object.assign({}, this.engineering.selectedCity)
  },

  computed: {
    provinceCount () {
      return this.canClick
        ? (this.copyCityList[2703] ? '已经选择全国' : `已经选择${Object.keys(this.copyCityList).length}个省份`)
        : ' 请选择城市'
    },
    canClick () {
      return Object.keys(this.copyCityList).length !== 0
    },
    ...mapState(['area', 'engineering'])
  },

  methods: {
    confirm () {
      this.engineering.selectedCity = this.copyCityList
      this.$router.back()
    },
    pickCity (val) {
      if (val.id === 2703) {
        if (this.copyCityList[2703]) {
          this.$delete(this.copyCityList, val.id)
        } else {
          this.$set(this, 'copyCityList', {[val.id]: val.name})
        }
      } else {
        if (this.copyCityList[2703]) {
          this.$delete(this.copyCityList, 2703)
        }
        if (this.copyCityList[val.id]) {
          this.$delete(this.copyCityList, val.id)
        } else {
          this.$set(this.copyCityList, val.id, val.name)
        }
      }
    }
  },

  components: {
    YfbAppbar
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.province-picker {
  position: relative;
}
.province-picker-body {
  flex-grow: 1;
  background: #fff;
  .province-title {
    text-align: center;
    font-size: px2rem(30);
    padding: px2rem(50);
  }
}
.stepper {
  padding-bottom: px2rem(145);
}
.stepper-content {
  flex-wrap: wrap !important;
  padding: 5px;
  .option {
    padding: 5px;
    text-align: center;
    > div {
      padding-top: 5px;
      padding-bottom: 5px;
      margin: auto;
      font-size: px2rem(26);
      white-space: nowrap;
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
    }
  }
  .option-stage {
    flex: 0 0 33.33%;
    > div {
      width: 90%;
    }
  }
  .option-type {
    padding: 5px 10px;
    > div {
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 40px;
    }
  }
  .option-area {
    flex: 0 0 25%;
    > div {
      width: 90%;
      border-radius: 5px;
    }
  }
  .picked {
    background: #0094fe;
    color: #fff;
  }
}
.engineering-cover {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: px2rem(155);
  background-image: linear-gradient(to bottom, rgba(#ffffff, 0) 0%, #fff 20%);
}
.engineering-btn {
  padding-top: px2rem(40);
  text-align: center;
  .btn {
    width: 70%;
    height: px2rem(80);
    font-size: px2rem(28);
    color: #fff;
  }
}
</style>
