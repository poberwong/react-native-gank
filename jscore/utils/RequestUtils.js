/*global fetch*/

import DateUtils from './DateUtils'

const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'))
    }, ms)
  })
}

const fetchWithTimeout = (timeout, ...args) => {
  return Promise.race([fetch(...args), delay(timeout)])
}

const RequestUtils = {
  API_DATE_BEFORE: 'http://gank.avosapps.com/api/get/',
  API_DAILY: 'http://gank.avosapps.com/api/day/',
  PAGE_SIZE: 10,

  fetchData (url: string) {
    return fetchWithTimeout(5000, url).then(response => response.json())
      // 就是把一个javascript对象转换为JSON字符串
  },

  _genDailyAPI (date: string) {
    return RequestUtils.API_DAILY + date
  },

  async getContents (lastDate) { // 按页获取lastDate之前所有的DailyContent
    var dateData = await RequestUtils.fetchData(this.API_DATE_BEFORE + this.PAGE_SIZE + '/before/' + lastDate)// 返回json对象

    if (typeof dateData === 'undefined') { return }
    var contentUrl = dateData.results.map(DateUtils.convertDate).map(this._genDailyAPI)// 使用到了数组的map特性

    var promises = contentUrl.map(
      (url) => fetchWithTimeout(5000, url).then(response => response.json())
    )

    var responseDatasCopy
    await Promise.all(promises).then(responseDatas => {

      responseDatas.forEach(function (element, index) {
        element.date = dateData.results[index]
      })
      responseDatasCopy = responseDatas
    })

    return responseDatasCopy
  }
}

module.exports = RequestUtils
