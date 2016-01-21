'use strict';

// Module dependencies
let React = require('react-native');
let styles = require('./styles');

let {
  Text,
  View,
  TouchableOpacity,
  PropTypes
} = React;

const STATUS_BAR_HEIGHT = 20;
const NAV_BAR_HEIGHT = 44;

module.exports = React.createClass({

  propTypes: {
    title: PropTypes.string,
    backFunc: PropTypes.func,
    tintColor: PropTypes.string,
    titleTextColor: PropTypes.string,
    barTintColor: PropTypes.string,
    actionName: PropTypes.string,
    actionFunc: PropTypes.func,
    actionTextColor: PropTypes.string,
    backHidden: PropTypes.bool,
    statusbarPadding: PropTypes.bool,
    backColor: PropTypes.string,
    barBottomColor: PropTypes.string,
    barBottomThickness: PropTypes.number,
    backIcon: PropTypes.bool,
    backName: PropTypes.string,
  },

  getDefaultProps () {
    return {
      title: 'title',
      backFunc () {},
      tintColor: '#777',
      backColor: '#777',
      titleTextColor: '#333',
      barTintColor: 'white',
      actionName: '',
      actionFunc () {},
      actionTextColor: '#666',
      backHidden: false,
      backIcon: true,
      backName: 'back',
      backTextColor: '#666',
      statusbarPadding: true,
      barBottomColor: '#d4d4d4',
      barBottomThickness: 0.5,
    };
  },

  render () {
    return (
      <View style={
          [styles.navbar,
            {
              backgroundColor: this.props.barTintColor,
              height: this.props.statusbarPadding ? NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT : NAV_BAR_HEIGHT,
              borderColor: this.props.barBottomColor,
              borderBottomWidth: this.props.barBottomThickness,
              opacity: 0.5
            },
            this.props.statusbarPadding ? { paddingTop: STATUS_BAR_HEIGHT } : {}]}>
        {
          !this.props.backHidden ?
            <TouchableOpacity
              style={this.props.backIcon ? styles.iconWrapper : styles.backBtn}
              onPress={this.props.backFunc}>
              {
                this.props.backIcon ?
                  <View style={[styles.icon, {borderColor:this.props.backColor}]} />:
                  <Text style={[styles.actionName, {color: this.props.backColor}]}>{this.props.backName}</Text>
              }
            </TouchableOpacity> : null
        }
        <Text style={[styles.title, {color:this.props.titleTextColor}]}>{this.props.title}</Text>
        {
          this.props.actionName ?
          <TouchableOpacity style={styles.actionBtn} onPress={this.props.actionFunc.bind(this)}>
            <Text style={[styles.actionName, { color: this.props.actionTextColor }]}>{this.props.actionName}</Text>
          </TouchableOpacity> : null
        }
      </View>
    );
  }
});
