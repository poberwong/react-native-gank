/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

var React = require('react-native')
import HistoryList from './js.core/HistoryList'
import DateUtils from './js.core/utils'

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Component
} = React

class ReactNativeGank extends Component {
  constructor (props) {
    super(props)
    DateUtils.extendDate() // 拓展Date类
  }

  render () {
    // return (<HistoryList/>);
    return (
      <NavigatorIOS style = {styles.container}
        initialRoute={{
          title: 'History',
          component: HistoryList
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
