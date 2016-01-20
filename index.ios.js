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
  Navigator,
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
      <Navigator style = {styles.container}
        initialRoute={{
          component: HistoryList
        }}
        renderScene={(route, navigator) => {
          return <route.component route={route} navigator={navigator} {...route.passProps}/>
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
