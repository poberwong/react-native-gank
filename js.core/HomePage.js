'use strict'
import React from 'react-native'
import DateUtils from './utils/DateUtils'
import RequestUtils from './utils/RequestUtils'
import HistoryList from './HistoryList'

var {
    StyleSheet,
    View,
    Component,
    Image,
    ActivityIndicatorIOS,
    TouchableHighlight,
    Text
   } = React

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount () {
    this.contentDataGroup = await RequestUtils.getContents(DateUtils.getCurrentDate())
    this.homePageContent = this.contentDataGroup[0].results
    this.setState({
      isLoading: false
    })
  }

  render () {
    console.log('current :' + this.state.isLoading)
    let content = this.state.isLoading
    ? (<View style={styles.indicatorWrapper}>
        <ActivityIndicatorIOS
          hidden='true'
          size='large'/>
        <Text style={styles.loadingText}>待我菊花转好...</Text>
        </View>)
    : (<View style={styles.container}>
        <View style={styles.headerWrapper}>
            <Image source={{uri: this.homePageContent.福利[0].url}} style={{flex: 1}}/>
            <View style={styles.editorWrapper}>
              <Text style={styles.imageEditors}>{'via.' + this.homePageContent.福利[0].who}</Text>
            </View>
          </View>
          <View style={styles.contentWrapper}>
            <TouchableHighlight style={{flex: 2, marginTop: 18}}
              underlayColor={'#333333'}>
              <View style={styles.content}>
                <Text style={styles.videoTitle}>{this.homePageContent.休息视频[0].desc}</Text>
                <Text style={styles.dateAuthor}>{this.contentDataGroup[0].date + ' via.' + this.homePageContent.休息视频[0].who}</Text>
                <Text style={styles.toVideo}>--> 去看视频～</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.buttonStyle}
              underlayColor={'#333333'}
              onPress={() => this._skipIntoHistory(this.contentDataGroup)}>
              <Text style={styles.toHistory}>查看往期</Text>
            </TouchableHighlight>
          </View>
        </View>)

    return (
      content
      )
  }

  _skipIntoHistory(contentDataGroup){
    this.props.navigator.push({
      component: HistoryList,
      passProps: {contentDataGroup}
    })
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
    left: 15,
    marginRight: 25
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
    color: 'white'
  },
  loadingText: {
    fontSize: 15,
    color: 'white',
    marginTop: 15
  },
  indicatorWrapper: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  }

})

module.exports = HomePage