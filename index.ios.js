/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
import HistoryList from './js.core/HistoryList';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var ReactNativeGank = React.createClass({
  render: function() {
    return (
      <HistoryList/>
    );
  }
});

var styles = StyleSheet.create({
});

AppRegistry.registerComponent('ReactNativeGank', () => ReactNativeGank);
