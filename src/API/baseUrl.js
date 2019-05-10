const isDev = process.env.NODE_ENV === 'development'

// switch (process.env.API) {
//   case yfb
//    break
//   case yfb
//    break
//   case xxx
//    break
//   default
// }
let baseUrl = isDev ? '/yfb_wechat' : '/qlmYFB'

export default baseUrl
