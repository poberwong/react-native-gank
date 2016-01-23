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
          <Text>
            Requirements 
OS X - This guide assumes OS X which is needed for iOS development.
Homebrew is the recommended way to install Watchman and Flow.
Install Node.js 4.0 or newer.
Install nvm with its setup instructions here. Then run nvm install node && nvm alias default node, which installs the latest version of Node.js and sets up your terminal so you can run it by typing node. With nvm you can install multiple versions of Node.js and easily switch between them.
New to npm?
brew install watchman. We recommend installing watchman, otherwise you might hit a node file watching bug.
brew install flow, if you want to use flow.
We recommend periodically running brew update && brew upgrade to keep your programs up-to-date.

iOS Setup 
Xcode 7.0 or higher is required. It can be installed from the App Store.

Android Setup 
To write React Native apps for Android, you will need to install the Android SDK (and an Android emulator if you want to work on your app without having to use a physical device). See Android setup guide for instructions on how to set up your Android environment.

NOTE: There is experimental Windows and Linux support for Android development.

Quick start 
$ npm install -g react-native-cli
$ react-native init AwesomeProject
To run the iOS app:

$ cd AwesomeProject
Open ios/AwesomeProject.xcodeproj and hit run in Xcode.
Open index.ios.js in your text editor of choice and edit some lines.
Hit ⌘-R in your iOS simulator to reload the app and see your change!
Note: If you are using an iOS device, see the Running on iOS Device page.

To run the Android app:

$ cd AwesomeProject
$ react-native run-android
Open index.android.js in your text editor of choice and edit some lines.
Press the menu button (F2 by default, or ⌘-M in Genymotion) and select Reload JS to see your change!
Run adb logcat *:S ReactNative:V ReactNativeJS:V in a terminal to see your app's logs
Note: If you are using an Android device, see the Running on Android Device page.

Congratulations! You've successfully run and modified your first React Native app.

If you run into any issues getting started, see the troubleshooting page.

Adding Android to an existing React Native project 
If you already have a (iOS-only) React Native project and want to add Android support, you need to execute the following commands in your existing project directory:

Update the react-native dependency in your package.json file to the latest version
$ npm install
$ react-native android
          </Text>
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