'use strict'

import React from 'react-native'
import NavigationBar from './custom-views/react-native-navigationbar/index'

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
          barStyle= {styles.navbar}/>)

    return (
        <View style= {styles.container}>
          <ScrollView
            onScroll={this.onScroll.bind(this)}
            scrollEventThrottle={10}
            bounces={false}>
          <Image source= {{uri: thumbnail}} style={styles.headerImage}/>
          </ScrollView>
          {Header}
        </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565'
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    alignSelf: 'center',
    marginTop: 30
  }
})

module.exports = DailyContent