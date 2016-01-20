import React from 'react-native'

var {
    StyleSheet,
    View,
    Component,
    Image
   } = React

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  image: {
    height: 360,
    width: null,
    alignSelf: 'stretch'
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565'
  }
})

class DailyContent extends Component {
  render () {
    var contentData = this.props.contentData
    var thumbnail = (typeof contentData.thumbnail !== 'undefined') ? contentData.thumbnail : ''
    console.log('uri is ' + thumbnail)
    return (
        <View style= {styles.container}>
          <Image source= {{uri: thumbnail}} style= {styles.image}/>
        </View>
    )
  }
}
module.exports = DailyContent