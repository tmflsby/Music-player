// 封装从url获取电话号码函数
export function getPhone () {
  // 创建一个正则表达式
  let reg = new RegExp(/\d*$/)
  // window.location.search 返回 url 的 query
  // 返回一个数组（未匹配到则返回 null）
  let phone = reg.exec(window.location.search)[0]
  return phone
}
