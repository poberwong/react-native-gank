'use strict';

let React = require('react-native');

const HEIGHT = 4;

module.exports = React.StyleSheet.create({
  navbar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT
  },

  iconWrapper: {
    width: 30,
    height: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'absolute',
    left: 10,
    paddingTop: 3//旋转后，会失去居中，产生 根号2/2-0.5倍的偏移
    // bottom: 6
  },

  icon: {
    width: 14,
    height: 14,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{rotate:'45deg'}]
  },

  title: {
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },

  actionBtn: {
    position: 'absolute',
    right: 10,
    bottom: 12
  },

  backBtn: {
    position: 'absolute',
    left: 10,
    bottom: 12
  },

  actionName: {
    fontSize: 14
  }
});
