'use strict'
import React from 'react-native';
import DateUtils from './utils';
import DailyContent from './DailyContent'

var {
  StyleSheet,
  View,
  ListView,
  TouchableHighlight,
  Image,
  Text,
  Component,
} = React;

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

var API_DATE_BEFORE = 'http://gank.avosapps.com/api/get/';
var API_DAILY = 'http://gank.avosapps.com/api/day/';
var PAGE_SIZE = 10;
var LAST_DATE = DateUtils.getCurrentDate();
var REQUEST_DATE_URL = API_DATE_BEFORE + PAGE_SIZE + '/before/' + LAST_DATE;

class HistoryList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),//先初始化一个空的数据集合
      loaded: false
  	};
  }

  _convertDate(date: string){//change the date like '2015-11-05' into '2015/11/05'
    return date.replace(new RegExp('-', 'g'), '/');//居然是一个一个替换,使用正则表达式解决方案
  }

  _genDailyAPI(date: string){
    return API_DAILY + date;
  }

  async componentDidMount(){
  	var responseData = await this.fetchData(REQUEST_DATE_URL);//返回json对象
    //console.log('responseData is '+ JSON.stringify(responseData));//JSON.stringify : converts a JavaScript value to a JSON string
    /*for(var date of responseData.results){
      console.log('converted data is '+ this._convertDate(date));
    }*/
    var contentUrl = responseData.results.map(DateUtils.convertDate).map(this._genDailyAPI);//使用到了数组的map特性

    var contentData = [];
    for(let i = 0; i< contentUrl.length; i++){
        var tempItem = {};
        var dailyContent = await this.fetchData(contentUrl[i]);
        tempItem.title = dailyContent.results.休息视频[0].desc;
        tempItem.thumbnail = dailyContent.results.福利[0].url;
        tempItem.date = responseData.results[i];

        contentData.push(tempItem);
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(contentData),
      loaded: true
    })
  }


  async fetchData(url: string){
   try{
			let response = await fetch(url);
			let responseData = await response.json();
			//就是把一个javascript对象转换为JSON字符串
			return responseData;
    } catch (error) {
    	console.log('data load failed :'+error);
    }
/*    fetch(url)
    	.then((response) => response.json())
    	.then((responseData) => {
    		responseData;
    		convert(responseData)
    	};*/
  }

  render(){
  	//在此处，使用整个加载试图在根布局上进行替换时，会造成ListView无法重新对顶部和底部的控件进行偏移
  		return (
  			<View style={styles.container}>
  				<ListView
  					dataSource={this.state.dataSource}
  					renderRow={this._renderItem.bind(this)}
  				/>
  			</View>	
  		);
  }

/*  _renderLoadingView(){
  		return (
  			<View style={[styles.container, {paddingTop: 20}]}>
  				<Text>
  					Loading......{'\n'}
  					Loading......{'\n'}
  					Loading......{'\n'}
  					Loading......{'\n'}
  					Loading......{'\n'}
  				</Text>
  			</View>
  			);
  }*/

  _renderItem(contentData, sectionID, highlightRow){
  	return (
  		<TouchableHighlight onPress= {()=> this._skipIntoContent(contentData)
      }>
  		<View style={styles.itemContainer}>
        <Text style={styles.date}>{contentData.date}</Text>
  			<Text style={[styles.title]}>{contentData.title}</Text>
        <Image source={{uri: contentData.thumbnail}} 
               style={styles.thumbnail}
        />
  		</View>
  		</TouchableHighlight>
  	);
  }

  _skipIntoContent(contentData){
    this.props.navigator.push({//活动跳转，以Navigator为容器管理活动页面
      title: contentData.date,
      component: DailyContent,
      passProps: {contentData}//传递的参数（可选）
    })
  }

}

var styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: 'black'
	},
	itemContainer: {
		flexDirection: 'column',
		// height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop : 25
	},
  thumbnail: {
    width: null,//配合alignSelf实现宽度上 match_parent
    height: 200,
    alignSelf: 'stretch'
  },
  title: {// alignSelf 默认是center
    fontSize: 16,
    marginBottom: 10,
    marginRight: 35,
    marginLeft: 35,
    // letterSpacing: 10,//字间距
    lineHeight: 22,//行距＋字高，0表示和字高一样，没效果
    color: 'white',
    textAlign: 'center'//字的对其方式：center每行都居中；left，right；auto ＝＝＝ justify ＝＝＝ left
  },
  date: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  border: {// debugging tools for layout
    borderColor: 'red',
    borderWidth: 2,
  }

});

module.exports = HistoryList;