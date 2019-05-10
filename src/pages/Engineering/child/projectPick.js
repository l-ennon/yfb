import {projectType, projectStage} from 'common/json/project'
export default {
  data () {
    return {
      selectedCity: {},
      selectedType: {},
      selectedStage: {},
      projectType,
      projectStage
    }
  },

  methods: {
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
    }
  }
}
