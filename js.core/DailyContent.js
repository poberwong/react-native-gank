import React from 'react-native'

var {
    StyleSheet,
    ScrollView,
    View,
    Component,
    Image,
    Text
   } = React

class DailyContent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      opacity: 0
    }
  }

  onScroll (event) {
    const MAX = 360 - 64
    let y = event.nativeEvent.contentOffset.y
    if (y > MAX) {
      y = MAX
    }
    const opacity = y / MAX // 透明度，0 完全透明，1＋不透明
    this.setState({
      opacity: opacity
    })
  }

  render () {
    var contentData = this.props.contentData
    var thumbnail = (typeof contentData.thumbnail !== 'undefined') ? contentData.thumbnail : ''
    const opacityStyle = {opacity: this.state.opacity}
    var Header = (
      <View style={[styles.navbar, opacityStyle]}>
        <Text style={[styles.text,{color: 'black'}]}>{contentData.date}</Text>
      </View>)

    console.log('opacity ' + opacityStyle.opacity)
    return (
        <View style= {styles.container}>
          <ScrollView
            onScroll={this.onScroll.bind(this)}
            scrollEventThrottle={10}
            bounces={false}>
          <Image source= {{uri: thumbnail}} style={styles.image}/>
           <Text>
          Blake Tollison Shelton (born June 18, 1976)[1] is an American country music singer and television personality. In 2001, he made his debut with the single "Austin". The lead-off single from his self-titled debut album, "Austin" spent five weeks at number one on the Billboard Hot Country Songs chart. The gold-certified debut album also produced two more top 20 hits ("All Over Me" and "Ol' Red").[1] Although the album was released on Giant Records Nashville, he was transferred to Warner Bros. Records Nashville after Giant closed in late 2001.
  
  His second and third albums, 2003's The Dreamer and 2004's Blake Shelton's Barn & Grill, were each certified gold as well.[1] His fourth album, Pure BS (2007), was re-issued in 2008 with a cover of Michael Bublé's pop hit "Home" as one of the bonus tracks.[2] His fifth album, Startin' Fires was released in November 2008.[1] It was followed by the extended plays Hillbilly Bone and All About Tonight in 2010, and the albums Red River Blue in 2011.[3] Based on a True Story... in 2013, and Bringing Back the Sunshine in 2014. Overall, Blake Shelton has charted 24 country singles, including 15 number ones. The 11th No. 1 ("Doin' What She Likes") broke "the record for the most consecutive No. 1 singles in the Country Airplay chart's 24-year history".[4] He is a six-time Grammy Award nominee.
  
  Shelton is also known for his role as a judge on the televised singing competitions Nashville Star, Clash of the Choirs, and The Voice. He has been on The Voice since its inception, and four out of the eight seasons (2–4, 7) his teams have won. From 2011 to 2015, Shelton was married to fellow country singer Miranda Lambert.
          </Text>
          </ScrollView>
          {Header}
        </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  navbar: {
    backgroundColor: '#FFFFFF',
    top: 0,
    height: 64,
    left: 0,
    right: 0,
    justifyContent: 'center',
    position: 'absolute'
  },
  image: {
    height: 360,
    // width: null,
    // alignSelf: 'stretch'
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565'
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    alignSelf: 'center',
    marginTop: 30
  }
})

module.exports = DailyContent