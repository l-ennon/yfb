const util = {
  getUrlParam (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(0).match(reg) // 匹配目标参数
    if (r != null) {
      return decodeURI(r[2])
    }
    return null // 返回参数值
  },
  isObject (data) {
    return typeof data === 'object' && !Array.isArray(data)
  },
  isFunction (data) {
    return typeof data === 'function'
  },
  extend: function extend () {
    // 给jQuery对象和jQuery原型对象都添加了extend扩展方法
    let target = arguments[0] || {}
    let i = 1
    let length = arguments.length
    let deep = false
    let options, name, src, copy, copyIsArray, clone

    // 处理深拷贝的情况
    if (typeof target === 'boolean') {
      deep = target
      target = arguments[1] || {}
      // 跳过布尔值和目标
      i++
    }

    // 控制当target不是object或者function的情况
    if (typeof target !== 'object' && this.isFunction(target)) {
      target = {}
    }

    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        // 扩展基础对象
        for (name in options) {
          src = target[name]
          copy = options[name]

          // 防止永无止境的循环，这里举个例子，如let i = {}i.a = i$.extend(true,{},i)如果没有这个判断变成死循环了
          if (target === copy) {
            continue
          }
          if (deep && copy && (this.isObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false
              clone = src && Array.isArray(src) ? src : [] // 如果src存在且是数组的话就让clone副本等于src否则等于空数组。
            } else {
              clone = src && this.isObject(src) ? src : {} // 如果src存在且是对象的话就让clone副本等于src否则等于空数组。
            }
            // 递归拷贝
            target[name] = extend(deep, clone, copy)
          } else if (copy !== undefined) {
            target[name] = copy // 若原对象存在name属性，则直接覆盖掉；若不存在，则创建新的属性。
          }
        }
      }
    }
    // 返回修改的对象
    return target
  },
  /**
   * 判断空集
   * @param  {[type]}  data [description]
   * @return {Boolean}      [description]
   */
  isEmpty (data) {
    return data !== null && data !== undefined
  },
  /**
   * 市级选择器
   * @param  {[type]} state  [description]
   * @param  {[type]} areaId [description]
   * @return {[type]}        [description]
   */
  _areaSetFn (state, {areaId}) {
    if (areaId.length === 0) return {}
    let list = {}
    let cityCount = 0
    let areaCount = 0
    let countryCount = 0
    for (let i = 0, length = areaId.length; i < length; i++) {
      let id = areaId[i]
      if (id === '2703') {
        countryCount = 1
        list['2703'] = {'2703': '全国'}
        break
      }
      state.area.forEach(area => {
        if (parseInt(id) === area.id) {
          if (list[area.id]) {
            list[area.id][area.id] = area.name
          } else {
            list[area.id] = {[area.id]: area.name}
          }
          areaCount++
          return false
        }
        area.hasCity.forEach(city => {
          if (parseInt(id) === city.id) {
            if (list[area.id]) {
              list[area.id][city.id] = city.name
            } else {
              list[area.id] = {[city.id]: city.name}
            }
            cityCount++
            return false
          }
        })
      })
    }
    // console.log('list: %o, city: %s, area: %s, c: %s', list, cityCount, areaCount, countryCount)
    return {list, cityCount, areaCount, countryCount}
  },
  /**
   * 省级选择器
   * @param  {[type]} state  [description]
   * @param  {[type]} areaId [description]
   * @return {[type]}        [description]
   */
  _pareaSetFn (state, {areaId}) {
    let list = {}
    if (Array.isArray(areaId)) {
      areaId.forEach((val, i) => {
        state.area.forEach((obj, i) => {
          if (~~val === ~~obj.id) {
            list[val] = obj.name
          }
        })
      })
    }
    return list
  },
  isSomeArray ($1, $2) {
    if (!Array.isArray($1) || $1.length !== $2.length) return false
    let flag = true
    for (var i = 0; i < $1.length; i++) {
      $1[i] !== $2[i] && (flag = false)
    }
    return flag
  },
  getLocalStorage (name) {
    return window.localStorage.getItem(name)
  },
  setLocalStorage (name, value) {
    return Promise.resolve(window.localStorage.setItem(name, value))
  }
}
export default util
