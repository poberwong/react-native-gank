/*global fetch*/

// race all, 都是并行执行promise，前者的状态由最先改变的那个决定。all则是全部通过才算成功
import DateUtils from './DateUtils'
const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'))
    }, ms)
  })
}

const fetchWithTimeout = (timeout, ...args) => { // race并行执行多个promise，结果由最先结束的Promise决定
  return Promise.race([fetch(...args), delay(timeout)])
}

const RequestUtils = {
  API_DATE: 'http://gank.io/api/day/history',
  API_DAILY: 'http://gank.io/api/day/',

  getDateArray () { // 'before means index in the full-date-array'
    return fetchWithTimeout(10000, this.API_DATE).then(response => response.json())// 返回Promise, await 表示拿到下一个then里resolve的参数值
  },

  async getContents (dateArray) { // default value is 0
    const proc = (date) => {
      const url = DateUtils.convertDate(this.API_DAILY + date)

      return fetchWithTimeout(10000, url)
      .then(response => response.json()) // return promise.then()
      .then(responseData => {
        responseData.date = date
        return responseData // promise...()
      })// new Pormise((resolve, rejected) => {resolve(responseData)})
    }

    return await Promise.all(dateArray.map(proc)) // all，同时执行，全部成功才算ok，then里边的参数是每一个promise结果的有序集

    // let contentUrlArray = dateArray.map(DateUtils.convertDate).map((date) => this.API_DAILY + date)
    // let promises = contentUrlArray.map(
    //   (url, index) => fetchWithTimeout(10000, url).then(response => response.json())
    //   .then(responseData => responseData.date = dateArray[index])
    // )
    // // net
    // let responseDatasCopy
    // await Promise.all(promises).then(responseDatas => {
    //   responseDatas.forEach(function (element, index) {
    //     element.date = dateArray[index]
    //   })
    //   responseDatasCopy = responseDatas
    // })
    // return responseDatasCopy
  }
}

module.exports = RequestUtils
