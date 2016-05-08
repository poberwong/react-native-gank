/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Navigator } from 'react-native'
import HomePage from './jscore/HomePage'

class ReactNativeGank extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    // return (<HistoryList/>);
    return (
      <Navigator style = {styles.container}
        initialRoute={{
          component: HomePage
        }}
        renderScene={(route, navigator) => { // 用来渲染navigator栈顶的route里的component页面
          // route={component: xxx, name: xxx, ...}， navigator.......route 用来在对应界面获取其他键值
          return <route.component navigator={navigator} {...route} {...route.passProps}/>// {...route.passProps}即就是把passProps里的键值对全部以给属性赋值的方式展开 如：test={10}
        }}/>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('ReactNativeGank', () => ReactNativeGank)
