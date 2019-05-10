<template lang="pug">
.engineering-body(v-if="!hasDy")
  .engineering-type-title(v-text="typeTitle")
  .stepper
    .stepper-content.row.main-start
      template(v-if="activeStep === 1")
        .option-stage.option(
          v-for="(val, key) of projectStage",
          @click="pickStage(val)"
        )
          div(
            v-text="val.name",
            :class="{picked: val.id in selectedStage}"
          )
      template(v-if="activeStep === 2")
        .option-type.option(
          v-for="(val, key) of projectType",
          @click="pickType(val)"
        )
          div(
            v-text="val.name",
            :class="{picked: val.id in selectedType}"
          )
      template(v-if="activeStep === 3")
        .option-area.option(
          v-for="(val, key) of area",
          @click="pickCity(val)"
        )
          div(
            v-text="val.name",
            :class="{picked: val.id in selectedCity}"
          )
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {Icon} from 'components'
import {YfbTitle} from 'yfb'
import {projectType, projectStage} from 'common/json/project'
export default {
  name: 'engineering',

  data () {
    return {
      hasDy: false,
      activeStep: 1,
      header: [
        {
          title: '全部项目',
          icon: 'icon_all_project'
        },
        {
          title: '订阅设置',
          icon: 'icon_collect_project'
        },
        {
          title: '我的收藏',
          icon: 'icon_subscript_project'
        }
      ],
      options: [
        { title: '信息地区', active: false },
        { title: '项目阶段', active: false },
        { title: '项目类型', active: false }
      ],
      isPay: false,
      selectedCity: {},
      selectedType: {},
      selectedStage: {},
      projectType,
      projectStage
    }
  },

  mounted () {
    this.scroller = this.$refs.scroller
    this.getProjectSub()
  },

  methods: {
    pathTo (i) {
      switch (i) {
        case 0:
          this.$router.push('/engineering/engineeringSearch')
          break
        case 1:
          this.$router.push('/engineering/engineeringConfig')
          break
        case 2:
          this.$router.push('/engineering/engineeringCollection')
          break
      }
    },
    nextStep () {
      let {selectedCity, selectedType, selectedStage} = this
      switch (this.canPickNext) {
        case 0:
          return
        case 3:
          this.modify({
            projectType: Object.keys(selectedType),
            projectStage: Object.values(selectedStage),
            areaId: Object.keys(selectedCity)
          })
          break
        default:
          this.activeStep++
      }
    },
    pickCity (val) {
      if (val.id === 2703) {
        this.$set(this, 'selectedCity', {2703: '全国'})
      } else {
        if (this.selectedCity['2703']) {
          this.$delete(this.selectedCity, '2703')
        }
        if (this.selectedCity[val.id]) {
          this.$delete(this.selectedCity, val.id)
        } else {
          this.$set(this.selectedCity, val.id, val.name)
        }
      }
    },
    pickType (val) {
      if (~~val.id === 1000) {
        this.$set(this, 'selectedType', {1000: '全部'})
      } else {
        if (this.selectedType[1000]) {
          this.$delete(this.selectedType, '1000')
        }
        if (this.selectedType[val.id]) {
          this.$delete(this.selectedType, val.id)
        } else {
          this.$set(this.selectedType, val.id, val.name)
        }
      }
    },
    pickStage (val) {
      if (val.id === 0) {
        this.$set(this, 'selectedStage', {0: '全部'})
      } else {
        if (this.selectedStage['0']) {
          this.$delete(this.selectedStage, '0')
        }
        if (this.selectedStage[val.id]) {
          this.$delete(this.selectedStage, val.id)
        } else {
          this.$set(this.selectedStage, val.id, val.name)
        }
      }
    },
    ...mapActions([
      'modify', 'getProjectSub'
    ])
  },

  watch: {
  },

  computed: {
    btnText () {
      return this.activeStep > 2 ? '完成' : '下一步'
    },
    canPickNext () {
      let {activeStep, selectedStage, selectedType, selectedCity} = this
      if (activeStep === 1 && Object.keys(selectedStage).length !== 0) {
        return 1
      } else if (activeStep === 2 && Object.keys(selectedType).length !== 0) {
        return 2
      } else if (activeStep === 3 && Object.keys(selectedCity).length !== 0) {
        return 3
      } else {
        return 0
      }
    },
    typeTitle () {
      return `您想看哪种类型的工程信息`
    },
    list () {
      return this.welcome.indexPageConetntList || []
    },
    ...mapState([
      'search', 'welcome', 'area', 'userInfo'
    ])
  },

  components: {
    YfbTitle,
    Icon
  }
}
</script>

<style lang="scss">
@import "../../../common/scss/mixin.scss";

.engineering-body {
  position: relative;
  flex-grow: 1;
  background: #fff;
  box-sizing: content-box;
  .engineering-type-title {
    text-align: center;
    font-size: px2rem(30);
    padding: px2rem(70);
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

.stepper {
  padding-bottom: px2rem(145);
  background: #fff
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

</style>
