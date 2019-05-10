import {mapState} from 'vuex'
export default {
  methods: {
    /**
     *
     */
    toDatil (item) {
      let {contentid, areaId} = item
      this.checkZBDetail({contentid, areaId}).then((response) => {
        switch (response) {
          case 0:
            this.$router.push('/addPhoneNumber')
            break
          case 1:
            this.$router.push({
              name: 'info',
              params: {page: contentid}
            })
            break
          case 2:
            this.setLoadingShow()
            this.search.pageShow = true
            this.setSearchAreaId(areaId)
        }
      })
    },
    setSearchAreaId (areaId) {
      /**
       * 获取省份 ID
       */
      let cityId = null
      let id = parseInt(areaId)
      for (let i = 0; i < this.area.length; i++) {
        let area = this.area[i]
        if (area.id === id) {
          cityId = area.id
          break
        } else {
          for (let i = 0; i < area.hasCity.length; i++) {
            let city = area.hasCity[i]
            if (city.id === id) {
              cityId = area.id
              break
            }
          }
        }
      }
      this.search.areaId = cityId
    }
  },

  computed: {
    ...mapState([
      'search'
    ])
  }
}
