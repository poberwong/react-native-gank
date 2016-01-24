'use strict'

let React = require('react-native')

module.exports = React.StyleSheet.create({
  navbar: {
    backgroundColor: 'black',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  backWrapper: {
    height: 23,
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    left: 12
  },

  icon: {
    width: 14,
    height: 14,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{rotate: '45deg'}]
  },

  title: {
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center'
    // justifyContent: 'center',
  },

  actionBtn: {
    height: 23,
    flex: 1,
    position: 'absolute',
    right: 12
  },

  backBtn: {
    position: 'absolute',
    left: 12
  },

  actionName: {
    fontSize: 18
  }
});
