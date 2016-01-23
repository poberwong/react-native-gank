'use strict'
import React from 'react-native'

var {
    StyleSheet,
    ScrollView,
    View,
    Component,
    Image,
    TouchableHighlight,
    Text
   } = React

class HomePage extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Image source={{uri: 'http://ww3.sinaimg.cn/large/610dc034jw1f070hyadzkj20p90gwq6v.jpg'}} style={{flex: 1}}/>
          <View style={styles.editorWrapper}>
            <Text style={styles.imageEditors}>via.daimajia</Text>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <TouchableHighlight style={{flex: 2, marginTop: 18}}
            underlayColor={'#333333'}>
            <View style={styles.content}>
              <Text style={styles.videoTitle}>国外网友</Text>
              <Text style={styles.dateAuthor}>2016/1/22 via.LHF</Text>
              <Text style={styles.toVideo}>--> 去看视频～</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonStyle}
            underlayColor={'#333333'}>
            <Text style={styles.toHistory}>查看往期</Text>
          </TouchableHighlight>
        </View>
      </View>
      )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerWrapper: {
    height: 450
  },
  editorWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: 'black',
    opacity: 0.5
  },
  imageEditors: {
    fontSize: 15,
    color: 'white',
    position: 'absolute',
    right: 15,
    bottom: 1.5
  },
  contentWrapper: {
    backgroundColor: '#252528',
    flex: 1,
  },
  content: {
    backgroundColor: '#434243',
    flex: 1
  },
  videoTitle: {
    fontSize: 20,
    color: 'white',
    marginTop: 25,
    left: 15
  },
  dateAuthor: {
    fontSize: 15,
    color: 'white',
    position: 'absolute',
    left: 15,
    bottom: 25
  },
  toVideo: {
    fontSize: 15,
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
    marginTop: 18,
    marginBottom: 18
  },
  toHistory: {
    fontSize: 18,
    color: 'white',
  }

})

module.exports = HomePage