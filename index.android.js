/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import HistoryList from './js.core/HistoryList';
import React from 'react-native';

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

AppRegistry.registerComponent('ReactNativeGank', () => ReactNativeGank);
