var React = require('react-native');

var { 
    StyleSheet,
    Text,
    View,
    Component,
    Image
   } = React;

var styles = StyleSheet.create({  
    container: {
        marginTop: 63,
        alignItems: 'center'
    },
    image: {
        width: null,
        height: 400,
        alignSelf: 'stretch',
    },
    description: {
        padding: 10,
        fontSize: 15,
        color: '#656565'
    }
});

class DailyContent extends Component {
    render() {
        var contentData = this.props.contentData;
        var thumbnail = (typeof contentData.thumbnail !== 'undefined') ? contentData.thumbnail : '';
        console.log('uri is '+ thumbnail);
        return (
            <View style= {styles.container}>
              <Image source= {{uri: thumbnail}} style= {styles.image}/>
            </View>
        );
    }
}

module.exports = DailyContent;