/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'
import React, { Component, PropTypes } from 'react'
import { Animated, View } from 'react-native'

class Animation extends Component {
  constructor (props) {
    super(props)
    this.state = ({
      animatedValue: new Animated.Value(0)
    })
  }

  static propTypes = {
    timingLength: PropTypes.number,
    duration: PropTypes.number,
    bodyColor: PropTypes.string,
    radius: PropTypes.number
  };

  static defaultProps = {
    timingLength: 50,
    duration: 500,
    bodyColor: 'white',
    radius: 5
  };

  componentDidMount () {
    this._createAnim(this)
  }

  _createAnim (that) {
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 500
      }).start(() => {
        Animated.timing(
          this.state.animatedValue,
          {
            toValue: 0,
            duration: 500
          }).start(() => {
            that._createAnim(that)
          })
      })
  }

  render () {
    return (
        <Animated.View
          style={{
            width: this.props.radius * 2,
            height: this.props.radius * 2,
            borderRadius: this.props.radius,
            backgroundColor: this.props.bodyColor,
            transform: [{
              translateX: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-this.props.timingLength / 2, this.props.timingLength / 2]
              })}
            ]
          }}/>
    )
  }
}

module.exports = Animation
