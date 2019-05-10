import Vue from 'vue'
import API from 'API'
import util from 'util'

let state = {
  isUpdata: true,
  isPay: false,
  isEngineeringSearchUpdate: true,
  areaId: [],
  projectType: [],
  projectStage: [],
  provinceNumber: 0,
  list: [],
  selectedCity: {}
}

let getters = {
}

let mutations = {
}

let actions = {
  getProjectSub ({rootState, state, commit, dispatch}) {
    commit('setLoadingShow', {isShow: true})
    return dispatch('fetch', {
      url: API.getsub,
      method: 'get'
    }).then(response => {
      commit('setLoadingShow', {isShow: false})
      if (response.data && response.data.areaId) {
        let {areaId, xmlx, xmjd} = response.data
        let list = util._pareaSetFn(rootState, {areaId: areaId.split(',')})
        state.areaId = list
        state.projectType = xmlx.split(',')
        state.projectStage = xmjd.split(',')
      }
      return response
    })
  },
  indexsearch ({state, commit, dispatch}, {
    isPay, areaId, projectStage, projectType, currentPage
  }) {
    commit('setLoadingShow', {isShow: true})
    return dispatch('fetch', {
      url: API.indexsearch,
      method: 'get',
      params: {
        areaId,
        isPay,
        xmjd: projectStage,
        xmlx: projectType,
        currentPage
      }
    }).then(response => {
      commit('setLoadingShow', {isShow: false})
      if (!response.data) return
      state.isEngineeringSearchUpdate = false
      return response
    })
  },
  modify ({state, commit, dispatch}, {
    areaId = '', projectStage = '', projectType = ''
  }) {
    commit('setLoadingShow', {isShow: true})
    return dispatch('fetch', {
      url: API.modify,
      method: 'get',
      params: {
        areaId,
        xmjd: projectStage,
        xmlx: projectType
      }
    }).then((response) => {
      commit('setLoadingShow', {isShow: false})
      return response
    })
  },
  projectdetail ({state, commit, dispatch}, {contentid}) {
    commit('setLoadingShow', {isShow: true})
    return dispatch('fetch', {
      url: API.projectdetail,
      method: 'get',
      params: {
        contentid
      }
    }).then(response => {
      commit('setLoadingShow', {isShow: false})
      return response
    })
  },
  mysubproject ({state, commit, dispatch}, {currentPage, isPay}) {
    commit('setLoadingShow', {isShow: true})
    return dispatch('fetch', {
      url: API.mysubproject,
      data: { currentPage, isPay, informationPushId: util.getUrlParam('informationPushId') }
    }).then(response => {
      commit('setLoadingShow', {isShow: false})
      return response
    })
  },
  getInformationMemberInfo ({rootState, state, commit, dispatch}) {
    return dispatch('fetch', {
      url: API.getInformationMemberInfo,
      method: 'get'
    }).then(response => {
      let {list, provinceNumber} = response.data
      let areaId = []
      state.list = list
      state.provinceNumber = provinceNumber
      if (provinceNumber > 0) {
        list.forEach((val, i) => {
          val.list.forEach((id, i) => {
            areaId.push(id.provinceId)
          })
        })
      }
      let aaa = util._pareaSetFn(rootState, {areaId})
      Vue.set(state, 'selectedCity', aaa)
      return response
    }).catch(err => {
      console.log(err)
    })
  },
  projectsclist ({state, commit, dispatch}, {currentPage}) {
    return dispatch('fetch', {
      url: API.projectsclist,
      method: 'get',
      params: {
        currentPage
      }
    })
  },
  projectsc ({state, commit, dispatch}, {contentid}) {
    return dispatch('fetch', {
      url: API.projectsc,
      method: 'get',
      params: {
        contentid
      }
    })
  },
  consume ({state, commit, dispatch}, {contentId, provinceId}) {
    return dispatch('fetch', {
      url: API.consume,
      data: {
        contentId,
        provinceId
      }
    })
  },
  projectVipArea ({dispatch}) {
    return dispatch('fetch', {
      url: API.projectVipArea,
      method: 'get'
    })
  },
  getConsumeInformationNumberMessage ({dispatch}, {provinceId}) {
    return dispatch('fetch', {
      url: API.getConsumeInformationNumberMessage,
      method: 'get',
      params: {
        provinceId
      }
    })
  }
}

export default {state, mutations, actions, getters}
