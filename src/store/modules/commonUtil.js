let state = {
  isLogShow: false,
  /**
   * 这里是弹出提示 toast 组件
   * @param title: String = 为提示信息, show 控制是否显示
   * 组件可缩减为 v-if="title"
   * 多写个 show 是因为我乐意
   */
  toast: {
    title: '操作成功',
    show: false
  },
  /**
   * 控制 loading 是否显示, 没啥说的
   * @type {Boolean}
   */
  isLoadingShow: false
}

const mutations = {
  setLog (state, {isShow = false} = {}) {
    state.isLogShow = isShow
  },
  setLoadingShow (state, {isShow = false} = {}) {
    state.isLoadingShow = isShow
  }
}

const actions = {
  setToast ({state, commit, dispatch}, {text}) {
    state.toast.title = text
    state.toast.show = true
    setTimeout(() => {
      state.toast.show = false
    }, 1000)
  }
}

export default {state, mutations, actions}
