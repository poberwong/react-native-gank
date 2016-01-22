'use strict'
import React from 'react-native'

var {
    StyleSheet,
    ScrollView,
    View,
    Component,
    Image,
    Text
   } = React

class HomePage extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View>
        <Image source={{uri: 'http://ww3.sinaimg.cn/large/610dc034jw1f070hyadzkj20p90gwq6v.jpg'}} style={{height: 400}}/>
      </View>
      )
  }
}

var styls = StyleSheet.create({


})

module.exports = HomePage