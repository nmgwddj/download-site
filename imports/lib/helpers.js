import moment from 'moment'
import { encode64, strUnicode2Ansi } from './string'

// 将普通下载地址转为迅雷下载地址
export const ThunderURIEncode = (url) => {
  if (url.indexOf('ed2k://') !== -1 ||
      url.indexOf('thunder://') !== -1) {
    return url
  }
  const thunderPrefix = 'AA'
  const thunderPosix = 'ZZ'
  const thunderTitle = 'thunder://'
  const thunderUrl = thunderTitle + encode64(strUnicode2Ansi(thunderPrefix + url + thunderPosix))
  return thunderUrl
}

// 判断是否是电驴下载链接
export const ed2kLink = (link) => {
  return link.indexOf('ed2k://') !== -1
}

export const dateToString = (date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format)
}
