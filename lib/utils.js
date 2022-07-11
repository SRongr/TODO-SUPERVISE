const dayjs = require("dayjs")
const ONE_DAY = 24 * 60 * 60 * 1000
// 如果传的warnLine为空 ，取值为0， 不提前报警
const validDate = (date, warnLine = 0) => {
  const dateString = String(date)
  const dayjsDate = dayjs(dateString)
  // 获取写的时间与当前时间的差异
  const diffTime = dayjsDate.diff()

  let errorMsg = ""
  if (diffTime) {
    if (diffTime < 0) {
      errorMsg = "TODO WARN: 已到截止日期，请清理TODO"
    } else if (diffTime < warnLine * ONE_DAY){
      errorMsg = `TODO WARN: 距离最终期限不到${warnLine}天，请清理TODO`
    }
  } else {
    errorMsg = "TODO WANR: 请检查日期格式,正确格式为可被 dayjs 识别的日期，如 2022-1-1 https://dayjs.fenxianglu.cn"
  }
  return errorMsg
}

module.exports = {
  validDate
}