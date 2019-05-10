<template lang="pug">
  .engineering.absolute
    .column.scroll-content
      yfb-appbar(title="全部项目")
      .engineering-body.bg-white
        .scroll-content
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
                .pick-city
                  .city-item
                    span.title 会员地区:
                    span.t-red(
                      v-text="vipAreaText"
                    )
    .engineering-cover
      .engineering-btn
        button.btn(
          :class="canPickNext > 0 ? 'bg-blue' : 'bg-dgray'",
          @click="nextStep",
          v-text="btnText"
        )
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {YfbAppbar} from 'yfb'
import projectPick from './child/projectPick'
export default {
  name: 'engineering-config',

  mixins: [projectPick],

  data () {
    return {
      vipArea: [],
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
      ]
    }
  },

  activated () {
    this._init()
  },

  methods: {
    _init () {
      this.projectVipArea().then(response => {
        this.vipArea = response.data
      })
      this.engineering.projectStage.forEach((val) => {
        this.projectStage.forEach(n => {
          if (val === n.name) {
            this.$set(this.selectedStage, n.id, n.name)
          }
        })
      })
      this.engineering.projectType.forEach((val) => {
        this.projectType.forEach(n => {
          if (~~val === ~~n.id) {
            console.log({[n.id]: n.name})
            this.$set(this.selectedType, n.id, n.name)
          }
        })
      })
      this.activeStep = 1
      this.selectedCity = this.engineering.areaId
      if (!this.engineering.areaId) {
        this.getProjectSub()
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
          }).then(() => {
            this.engineering.isUpdata = true
            this.$router.back()
          }).catch(err => {
            console.log(err)
          })
          break
        default:
          this.activeStep++
      }
    },
    ...mapActions([
      'modify', 'getProjectSub', 'projectVipArea'
    ])
  },

  computed: {
    vipAreaText () {
      return this.vipArea.join(',')
    },
    btnText () {
      switch (this.activeStep) {
        case 1:
          return '下一步'
        case 2:
          return '还剩最后一步'
        default:
          return '完成'
      }
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
      switch (this.activeStep) {
        case 1:
          return `您想看哪个阶段的工程信息`
        case 2:
          return `您想看哪种类型的工程信息`
        case 3:
          return `您想看哪个城市的工程信息`
      }
    },
    ...mapState(['area', 'engineering'])
  },

  components: {
    YfbAppbar
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin.scss";
.engineering {
  flex-grow: 1;
  background: rgb(246, 246, 246);
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
    .pick-city {
      padding: 1em 10px;
      font-size: 16px;
      .city-item {
        .title {
          padding-right: 5px;
        }
      }
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
