'use strict'
import React from 'react-native'
import DateUtils from './utils/DateUtils'
import RequestUtils from './utils/RequestUtils'
import HomePage from './HomePage'

var {
  StyleSheet,
  View,
  Component,
  Image,
  Animated,
  Text
 } = React

class WelcomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fadeAnimLogo: new Animated.Value(0), // 设置动画初始值，生成Value对象
      fadeAnimText0: new Animated.Value(0),
      fadeAnimText1: new Animated.Value(0)
    }
  }

  componentDidMount () {
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
      })]).start(async (result) => {
        if (result.finished) {
          let contentDataGroup = await RequestUtils.getContents(DateUtils.getCurrentDate())

          setTimeout(() => {
            this.props.navigator.replace({
              component: HomePage,
              passProps: {contentDataGroup}
            })
          }, 0)
        }
      })
  }

  render () {
    return (
      <View style={styles.welcomeWrapper}>
        <Animated.View
          style={{
            opacity: this.state.fadeAnimLogo, // Binds directly
            marginTop: 250,
            transform: [{
              translateX: this.state.fadeAnimLogo.interpolate({
                inputRange: [0, 1],
                outputRange: [120, 160]  // 0 : 150, 0.5 : 75, 1 : 0
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
                outputRange: [10, 35]
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
                outputRange: [10, 35]
              })
            }]
          }}>
          <Text style={styles.footerText}>Powered by: 北京杰讯云动力科技有限公司</Text>
        </Animated.View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  welcomeWrapper: {
    flex: 1,
    backgroundColor: '#252528'
  },
  footerText: {
    color: '#aaaaaa',
    fontSize: 15
  }
})

module.exports = WelcomePage