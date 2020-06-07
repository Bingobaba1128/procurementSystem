export function toUrlParam(urll, obj) {
  var url = urll
  var originUrl = urll
  for (const key in obj) {
    if (url === originUrl && obj[key] || url === originUrl && obj[key] === 0) {
      url = url + key + '=' + obj[key]
    } else if (url !== originUrl && obj[key] || url !== originUrl && obj[key] === 0) {
      url = url + '&' + key + '=' + obj[key]
    }
  }
  return url
}
