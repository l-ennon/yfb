export function timeAgo (time) {
  const between = (Date.now() - Number(time)) / 1000
  if (between < 3600) {
    return pluralize(~~(between / 60), ' 分钟前更新')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' 小时前更新')
  } else {
    return pluralize(~~(between / 86400), ' 天前更新')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label
}
