'use strict'

import React, { Component } from 'react'
import { ScrollView, View, TouchableHighlight, Image, Text, StyleSheet } from 'react-native'
import NavigationBar from 'react-native-navigationbar'
import WebViewPage from './WebViewPage'

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
    let contentData = this.props.contentData
    let thumbnail = (typeof contentData.results.福利[0].url !== 'undefined') ? contentData.results.福利[0].url : ''

    let Header = (
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
        <View needsOffscreenAlphaCompositing renderToHardwareTextureAndroid style= {styles.container}>
          <ScrollView
            onScroll={this.onScroll.bind(this)}
            scrollEventThrottle={5}
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

  _getViews (contentData) {
    return contentData.category.map((category, index) => (
      <View key={index} style={styles.itemContainer}>
        <Text style={styles.category}>{category}</Text>
        {this.getItems(contentData, category)}
      </View>
    ))
  }

  getItems (contentData, category) {
    return contentData.results[category].map((item, index) => (
      <TouchableHighlight style={styles.titleWrapper}
        underlayColor='#aaaaaa'
        key={index}
        onPress={ () => {
          this.props.navigator.push({
            component: WebViewPage,
            title: item.desc,
            url: item.url
          })
        }}>
        <Text style={styles.title}>
          *  {item.desc} ( {item.who} )
        </Text>
      </TouchableHighlight>
    ))
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
    height: HEADER_HEIGHT
    // width: null,
    // alignSelf: 'stretch'
  },
  itemContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 8,
    padding: 15,
    borderRadius: 3
  },
  category: {
    fontSize: 18
  },
  title: {
    fontSize: 14,
    marginLeft: 15
  },
  titleWrapper: {
    flex: 1,
    marginTop: 10
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
    top: 33.9,
    left: 14.5
  }
})

module.exports = DailyContent
