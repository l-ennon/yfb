import axios from 'axios'
import NProgress from 'nprogress'
import util from 'util'

let openid = util.getUrlParam('openid')

const baseURL = window.location.origin

export const ajax = axios.create({
  baseURL,

  data: {
    openid
  },

  paramsSerializer (params) {
    let requset = []
    for (let type in params) {
      let target = util.isEmpty(params[type]) ? params[type] : ''
      requset.push(`${type}=${target}`)
    }
    return requset.join('&')
  },

  transformRequest (data) {
    let requset = []
    for (let type in data) {
      let target = util.isEmpty(data[type]) ? data[type] : ''
      requset.push(`${type}=${target}`)
    }
    return requset.join('&')
  },

  headers: {'Content-Type': 'application/x-www-form-urlencoded'},

  timeout: 20000,

  responseType: 'json', // default

  xsrfCookieName: 'XSRF-TOKEN', // default

  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // onUploadProgress: function (progressEvent) {
  //   console.log(progressEvent)
  // },
  //
  // onDownloadProgress: function (progressEvent) {
  //   console.log(progressEvent)
  // },

  // maxContentLength: 2000,

  validateStatus (status) {
    return status >= 200 && status < 300 // default
  },

  // requset headers: set-cookie
  withCredentials: true
})

export const fetch = ({state, commit, dispatch}, {logError = true, url, method = 'post', data = {}, params = {}}) => {
  NProgress.done()
  NProgress.start()
  let isGet = /get/i.test(method)
  if (isGet) params = Object.assign(params, {openid})
  const response = ajax({
    url, method, data, params
  }).then(response => {
    commit('setLoadingShow')
    NProgress.done()
    return response
  }).catch((err) => {
    if (!logError) return
    commit('setLoadingShow')
    NProgress.done()
    dispatch('setToast', {text: '网络出错, 请稍后再试'})
    console.log('err', err.status)
    console.log('err', err.statusText)
    console.log('err', err.url)
    console.log('err', window.navigator.userAgent)
  })
  return response
}
