'use strict'

import React from 'react-native'
import NavigationBar from './custom-views/react-native-navigationbar/index'
import WebViewPage from './WebViewPage'

var {
    StyleSheet,
    ScrollView,
    View,
    Component,
    Image,
    Text
   } = React

const HEADER_HEIGHT = 400

class DailyContent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      opacity: 0
    }
  }

  onScroll (event) {
    const MAX = HEADER_HEIGHT - 64
    let y = event.nativeEvent.contentOffset.y
    if (y > MAX) {
      y = MAX
    }
    const opacity = y / MAX // 透明度，0 完全透明，1＋不透明
    this.setState({
      opacity: opacity
    })
  }

  render () {
    var contentData = this.props.contentData
    var thumbnail = (typeof contentData.results.福利[0].url !== 'undefined') ? contentData.results.福利[0].url : ''

    var Header = (
      <NavigationBar title= {contentData.date}
          backHidden={false}
          backIcon={true}
          barTintColor='white'
          barOpacity= {this.state.opacity}
          barStyle= {styles.navbar}
          backFunc={() => {
            this.props.navigator.pop()
          }}/>)

    return (
        <View style= {styles.container}>
          <ScrollView
            onScroll={this.onScroll.bind(this)}
            scrollEventThrottle={10}
            bounces={false}>
          <Image source= {{uri: thumbnail}} style={styles.headerImage}/>
          <View style={{flex:1}}>
            {this._getViews(contentData)}
          </View>
          </ScrollView>
          <View style={styles.backIcon}/>
          {Header}
        </View>
    )
  }

  _getViews(contentData){
    var list = []
    for(var category of contentData.category){
      let section = 
      (<View style={{flex: 1, backgroundColor:'white', margin: 8, padding: 15, borderRadius: 3}}>
        <Text style={styles.category}>{category}</Text>
        {this.getItems(contentData, category)}
      </View>)
      list.push(section)
    }
    return list
  }

  getItems(contentData, category){
    var itemViews = []
    for(var item of contentData.results[category]){
      console.log('from title:' + item.desc)
      itemViews.push(<Text style={styles.title} onPress={ () => {
        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
          component: WebViewPage,
          title: item.desc,
          url: item.url
        })
      }}>{'*  ' + item.desc + '  ( ' + item.who + ' )'}</Text>)
    }
    return itemViews
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#252528',
    flex: 1
  },
  navbar: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute'
  },
  headerImage: {
    height: HEADER_HEIGHT,
    // width: null,
    // alignSelf: 'stretch'
  },
  category: {
    fontSize: 18,
  },
  title: {
    fontSize: 14,
    marginTop: 10,
    lineHeight: 23,
    marginLeft: 15
  },
  backIcon: {
    width: 14,
    height: 14,
    borderColor: '#777',
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{rotate: '45deg'}],
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 36,
    left: 12
  }
})

module.exports = DailyContent