export default function () {
  _setFontSize()
  window.addEventListener('resize', () => {
    _setFontSize()
  })

  function _setFontSize () {
    const fs = window.innerWidth / 320 * 16 + 'px'
    window.document.documentElement.style.fontSize = fs
  }
  window.addEventListener('error', function (err) {
    let h = window.location
    window.alert('出错了')
    console.log(h.hash)
    console.log(h.host)
    console.log(h.search)
    console.log(err.message)
    console.log(window.navigator.userAgent)
  })

  // baidu
  window._hmt = window._hmt || [];
  (function () {
    var hm = document.createElement('script')
    hm.src = '//hm.baidu.com/hm.js?2e29ed686690cb0408368709294cb7a4'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()

  document.addEventListener('click', function (e) {
    let data = e.target.dataset
    if (data && data.track) {
      window._hmt && window._hmt.push(['_trackEvent', data.track, 'click'])
    }
  }, false)

  // google-analytics
  ;(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }
    i[r].l = 1 * new Date()
    a = s.createElement(o)
    m = s.getElementsByTagName(o)[0]
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

  window.ga('create', 'UA-96478231-2', 'auto')
  window.ga('send', 'pageview')
}
