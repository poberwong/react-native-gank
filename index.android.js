/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'
import React, { Component } from 'react'
import { AppRegistry, StyleSheet, BackAndroid, Navigator, StatusBar, View } from 'react-native'
import HomePage from './jscore/HomePage'

class ReactNativeGank extends Component {
  constructor (props) {
    super(props)
    this.handleBack = this._handleBack.bind(this)
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  _handleBack () {
    var navigator = this.navigator

    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop()
      return true
    }
    return false
  }

  render () {
    // return (<HistoryList/>);
    return (
      <View style = {styles.container}>
        <StatusBar
          backgroundColor='transparent'
          translucent/>
        <Navigator
          ref={component => this.navigator = component}
          initialRoute={{
            component: HomePage
          }}
          renderScene={(route, navigator) => { // 用来渲染navigator栈顶的route里的component页面
            // route={component: xxx, name: xxx, ...}， navigator.......route 用来在对应界面获取其他键值
          return <route.component navigator={navigator} {...route} {...route.passProps}/>// {...route.passProps}即就是把passProps里的键值对全部以给属性赋值的方式展开 如：test={10}
        }}/>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('ReactNativeGank', () => ReactNativeGank)
