let state = {
  isShow: false
}

let mutations = {
  setAdvertisingShow (state, {isShow = false}) {
    state.isShow = isShow
  }
}

export default {state, mutations}
