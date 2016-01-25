'use strict'
import React from 'react-native'
import DateUtils from './utils/DateUtils'
import RequestUtils from './utils/RequestUtils'
import DailyContent from './DailyContent'
import RefreshableListView from 'react-native-refreshable-listview'
import NavigationBar from './custom-views/react-native-navigationbar/index'
import AboutPage from './AboutPage'

var {
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Text,
  Component
} = React

// var {
//   RequestUtils,
//   DateUtils
// } = Utils

/*
date format: 2015/07/22
date json array:
	{
"error": false,
"results": [
"2015-07-21",
"2015-07-20",
"2015-07-19",
"2015-07-18",
"2015-07-17",
"2015-07-16",
"2015-07-15",
"2015-07-14",
"2015-07-13",
"2015-07-12"
]
}
*/

/*
目标数据源： [{title: xxxx, thumbnail: xxx, date: xxx}...]
date可以使用第一次请求的得来的数据
*/

class HistoryList extends Component {

  constructor (props) {
    super(props)
    this.canloadMore = false
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.props.contentDataGroup), // 先初始化一个空的数据集合
      dataArray: this.props.contentDataGroup,
      loadMore: false
    }
  }

  render () {
  // 在此处，使用整个加载试图在根布局上进行替换时，会造成ListView无法重新对顶部和底部的控件进行偏移
    let loadmoreAnimation = this.state.loadMore
    ? (<ActivityIndicatorIOS
              style={styles.indicator}
              hidden='true'
              size='small'/>)
    : (<View/>)
    console.log('current loadMore: '+ this.state.loadMore)
    return (
      <View style={styles.container}>
        <NavigationBar
          backHidden={false}
          barTintColor='white'
          title='History'
          actionName='About'
          backFunc={() => {
            this.props.navigator.pop()
          }}
          actionFunc={() => {
            this.props.navigator.push({
              component: AboutPage
            })
          }}/>
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          loadData={this._refresh.bind(this)}
          onEndReached={this._loadmore.bind(this)}
          onEndReachedThreshold = {29}/>
        {loadmoreAnimation}
      </View>
    )
  }

  _pop(){

  }

  _updateDate () {
    this.LAST_DATE = DateUtils.getCurrentDate()
  }

  async _refresh () {
    this._updateDate()
    var contentDataGroup = await RequestUtils.getContents(this.LAST_DATE)
    console.log(contentDataGroup)
    this.setState({
      dataArray: contentDataGroup,
      dataSource: this.state.dataSource.cloneWithRows(contentDataGroup),
      isLoading: false
    })
    // ??? setState 放到外边 ，contentData会清零？重置？
    // 异步方法的数据只能在回调方法里获取。await可以让它顺序执行
  }

  async _loadmore () {
    console.log('loadmore is invoked')
    if (this.canloadMore) {
      this.setState({
        loadMore: true
      })
      console.log('execute')
      var lastDate = this.state.dataArray[this.state.dataArray.length - 1].date
      console.log('lastDate: ' + this.state.dataArray[this.state.dataArray.length - 1].date)
      var loadedContentGroup = await RequestUtils.getContents(DateUtils.convertDate(lastDate))

      var newContent = this.state.dataArray
      // newContent.push(loadedContent)//???居然不能直接push一个数组
      for (let element of loadedContentGroup) {
        newContent.push(element)
      }

      this.setState({
        dataArray: newContent,
        dataSource: this.state.dataSource.cloneWithRows(newContent),
        loadMore: false
      })
    } else {
      this.canloadMore = true
    }
  }

  _renderItem (contentData, sectionID, highlightRow) {
    return (
      <TouchableHighlight onPress= {() => this._skipIntoContent(contentData)
      }>
        <View style={styles.itemContainer}>
          <Text style={styles.date}>{contentData.date}</Text>
          <Text style={[styles.title]}>{contentData.results.休息视频[0].desc}</Text>
          <Image source={{uri: contentData.results.福利[0].url}}
               style={styles.thumbnail}/>
        </View>
      </TouchableHighlight>
    )
  }

  _skipIntoContent (contentData) {
    this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
      component: DailyContent,
      passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
    })// push一个route对象到navigator中
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252528'
  },
  itemContainer: {
    flexDirection: 'column',
		// height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25
  },
  thumbnail: {
    width: null, // 配合alignSelf实现宽度上 match_parent
    height: 260,
    alignSelf: 'stretch'
  },
  title: {// alignSelf 默认是center
    fontSize: 16,
    marginBottom: 10,
    marginRight: 35,
    marginLeft: 35,
    // letterSpacing: 10,//字间距
    lineHeight: 22, // 行距＋字高，0表示和字高一样，没效果
    color: 'white',
    textAlign: 'center' // 字的对其方式：center每行都居中；left，right；auto ＝＝＝ justify ＝＝＝ left
  },
  date: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  border: {// debugging tools for layout
    borderColor: 'red',
    borderWidth: 2
  },
  indicator: {
    height: 50
  }

})
module.exports = HistoryList