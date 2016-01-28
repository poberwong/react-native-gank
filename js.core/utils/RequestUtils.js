import DateUtils from './DateUtils'

const RequestUtils = {
  API_DATE_BEFORE: 'http://gank.avosapps.com/api/get/',
  API_DAILY: 'http://gank.avosapps.com/api/day/',
  PAGE_SIZE: 10,

  async fetchData (url: string) {
    try {
      let response = await fetch(url)
      let responseData = await response.json()
      // 就是把一个javascript对象转换为JSON字符串
      return responseData
    } catch (error) {
      console.log('data load failed :' + error)
    }
  },

  _genDailyAPI (date: string) {
    return RequestUtils.API_DAILY + date
  },

  async getContents (lastDate) { // 按页获取lastDate之前所有的DailyContent
    var dateData = await RequestUtils.fetchData(this.API_DATE_BEFORE + this.PAGE_SIZE + '/before/' + lastDate)// 返回json对象
    // console.log('responseData is '+ JSON.stringify(responseData));//JSON.stringify : converts a JavaScript value to a JSON string
    /* for(var date of responseData.results){
      console.log('converted data is '+ this._convertDate(date));
    } */
    var contentUrl = dateData.results.map(DateUtils.convertDate).map(this._genDailyAPI)// 使用到了数组的map特性

    var promises = contentUrl.map(
        function (url) {
          return fetch (url).then((response) => response.json())
        }
      )
    var responseDatasCopy
    await Promise.all(promises).then((responseDatas) => {
      responseDatas.forEach(function (element, index) {
        element.date = dateData.results[index]
      })
      responseDatasCopy = responseDatas
    }).catch((error) => {
      console.log(error)
    })
    return responseDatasCopy
  }
}

module.exports = RequestUtils