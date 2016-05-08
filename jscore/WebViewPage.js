'use strict'
import React, { Component } from 'react'
import { View, WebView } from 'react-native'
import NavigationBar from 'react-native-navigationbar'

class WebViewPage extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <NavigationBar title={this.props.title}
          backHidden={false}
          barTintColor='white'
          backFunc={() => {
            this.props.navigator.pop()
          }}/>
        <WebView
          source={{uri: this.props.url}}/>
      </View>
      )
  }
}

module.exports = WebViewPage
