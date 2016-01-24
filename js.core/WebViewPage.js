'use strict'
import React from 'react-native'
import NavigationBar from './custom-views/react-native-navigationbar/index'
var {
  StyleSheet,
  Component,
  WebView,
  View
} = React

class WebViewPage extends Component {
  constructor (props) {
    super(props)
  }

  render(){

    return (
      <View style={{flex: 1}}>
        <NavigationBar title={this.props.title}
          backHidden={false}
          barTintColor='white'
          backFunc={() => {
            this.props.navigator.pop()
          }}/>
        <WebView
          url={this.props.url}/>
      </View>
      )
  }
}

module.exports = WebViewPage