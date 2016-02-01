'use strict'

let React = require('react-native')

module.exports = React.StyleSheet.create({
  navbar: {
    // alignItems: 'center',
    justifyContent: 'center'
  },

  backWrapper: {
    height: 20,
    width: 70,
    justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    left: 12
  },

  icon: {
    width: 14,
    height: 14,
    marginLeft: 2.5,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{rotate: '45deg'}]
  },

  title: {
    marginLeft: 90,
    marginRight: 90,
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center'
    // justifyContent: 'center',
  },

  actionBtn: {
    height: 20,
    flex: 1,
    position: 'absolute',
    right: 12
  },

  actionIcon: {
    height: 35,
    width: 35,
    position: 'absolute',
    right: 3
  },

  backBtn: {
    position: 'absolute',
    left: 12
  },

  actionName: {
    fontSize: 18
  }
})
