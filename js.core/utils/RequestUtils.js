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
  }
}

module.exports = RequestUtils