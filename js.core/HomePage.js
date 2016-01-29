'use strict'
import React from 'react-native'
import DateUtils from './utils/DateUtils'
import RequestUtils from './utils/RequestUtils'
import HistoryList from './HistoryList'
import WebViewPage from './WebViewPage'

var {
    StyleSheet,
    View,
    Component,
    Animated,
    Image,
    TouchableHighlight,
    Text
   } = React

class HomePage extends Component {
  constructor (...args) {
    super(...args)
    this.state = ({
      isLoading: true,
      isPlaying: true,
      fadeAnimLogo: new Animated.Value(0), // 设置动画初始值，生成Value对象
      fadeAnimText0: new Animated.Value(0),
      fadeAnimText1: new Animated.Value(0),
      fadeAnimLayout: new Animated.Value(1)
    })
  }

  async componentDidMount () {
    let timing = Animated.timing
    Animated.sequence([
      timing(this.state.fadeAnimLogo, {
        toValue: 1,
        duration: 800
      }),
      timing(this.state.fadeAnimText0, {
        toValue: 1,
        duration: 800
      }),
      timing(this.state.fadeAnimText1, {
        toValue: 1,
        duration: 800
      })
    ]).start(async() => {
      this.setState({
        isPlaying: false
      })

      setTimeout(() => this._hideWelcome(), 0)
    })

    this.contentDataGroup = await RequestUtils.getContents(DateUtils.getCurrentDate())
    this.homePageContent = this.contentDataGroup[0].results

    this.setState({
      isLoading: false
    })

    setTimeout(() => this._hideWelcome(), 0)
  }

  _hideWelcome () {
    if (this.state.isLoading || this.state.isPlaying) {
      return
    }

    Animated.timing(
      this.state.fadeAnimLayout,
      {
        toValue: 0,
        duration: 1000
      }).start(() => {
        this.setState({
          welcomeEnd: true
        })
      })
  }

  render () {
    let content = this.state.isLoading
    ? (<View style={{backgroundColor: 'black', flex: 1}}/>)
    : (<View style={styles.container}>
        <View style={styles.headerWrapper}>
            <Image source={{uri: this.homePageContent.福利[0].url}} style={{flex: 1}}/>
            <View style={styles.editorWrapper}>
              <Text style={styles.imageEditors}>{'via.' + this.homePageContent.福利[0].who}</Text>
            </View>
        </View>
        <View style={styles.contentWrapper}>
          <TouchableHighlight style={{flex: 2, marginTop: 17}}
            underlayColor={'#333333'}
            onPress={() => {
              this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                component: WebViewPage,
                title: this.homePageContent.休息视频[0].desc,
                url: this.homePageContent.休息视频[0].url
              })
            }}>
            <View style={styles.content}>
              <Text style={styles.videoTitle}>{this.homePageContent.休息视频[0].desc}</Text>
              <Text style={styles.dateAuthor}>{this.contentDataGroup[0].date + ' via.' + this.homePageContent.休息视频[0].who}</Text>
              <Text style={styles.toVideo}>--> 去看视频～</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonStyle}
            underlayColor={'#333333'}
            onPress={() => this._skipIntoHistory(this.contentDataGroup)}>
            <Text style={styles.toHistory}>查看往期</Text>
          </TouchableHighlight>
        </View>
        </View>)

    return (
      <View style={styles.content}  needsOffscreenAlphaCompositing renderToHardwareTextureAndroid >
        {content}
        {this._welcome()}
      </View>
      )
  }

  _welcome () {
    if (this.state.welcomeEnd) {
      return null
    }
    return (
      <Animated.View style={[styles.indicatorWrapper, {
        opacity: this.state.fadeAnimLayout
      }]}>
        <Animated.View
          style={{
            opacity: this.state.fadeAnimLogo, // Binds directly
            marginTop: 220,
            alignItems: 'center',
            transform: [{
              translateX: this.state.fadeAnimLogo.interpolate({
                inputRange: [0, 1],
                outputRange: [-40, 0]  // 0 : 150, 0.5 : 75, 1 : 0
              })
            }]
          }}>
          <Image source={require('./images/gank_launcher.png')} style={{width: 100, height: 100}}/>
        </Animated.View>

        <Animated.View
          style={{
            opacity: this.state.fadeAnimText0,
            position: 'absolute',
            bottom: 50,
            transform: [{
              translateX: this.state.fadeAnimText0.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 25]
              })
            }]
          }}>
          <Text style={styles.footerText}>Supported by: Gank.io</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: this.state.fadeAnimText1,
            position: 'absolute',
            bottom: 30,
            transform: [{
              translateX: this.state.fadeAnimText1.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 25]
              })
            }]
          }}>
          <Text style={styles.footerText}>Powered by: 北京杰讯云动力科技有限公司</Text>
        </Animated.View>
      </Animated.View>
      )
  }

  _skipIntoHistory (contentDataGroup) {
    this.props.navigator.push({
      component: HistoryList,
      passProps: {contentDataGroup}
    })
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerWrapper: {
    flex: 4
  },
  editorWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 17,
    backgroundColor: 'black',
    opacity: 0.5
  },
  imageEditors: {
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    right: 15,
    bottom: 1.5
  },
  contentWrapper: {
    backgroundColor: '#252528',
    flex: 3
  },
  content: {
    backgroundColor: '#434243',
    flex: 1
  },
  videoTitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 17,
    left: 15,
    lineHeight: 21,
    marginRight: 25
  },
  dateAuthor: {
    fontSize: 14,
    color: 'white',
    position: 'absolute',
    left: 15,
    bottom: 17
  },
  toVideo: {
    fontSize: 14,
    color: 'white',
    position: 'absolute',
    bottom: 8,
    right: 15
  },
  buttonStyle: {
    backgroundColor: '#434243',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 17,
    marginBottom: 17
  },
  toHistory: {
    fontSize: 18,
    color: 'white'
  },
  loadingText: {
    fontSize: 15,
    color: 'white',
    marginTop: 15
  },
  indicatorWrapper: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'black'
  },
  footerText: {
    color: '#aaaaaa',
    fontSize: 15
  }

})

module.exports = HomePage