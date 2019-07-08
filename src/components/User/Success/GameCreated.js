import React, { Component } from 'react';
import {Image, View, Text, TouchableOpacity, BackHandler} from 'react-native';
import { connect } from 'react-redux';
import { ERROR, SITE_COLOR, PINK, WHITE, RED, SUCCESS, GREEN } from '../../../style';
import { Actions } from 'react-native-router-flux';

class GameCreated extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
      
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        source={SUCCESS}
                        style={{width: 80, height: 80}}
                        resizeMode={'contain'}
                    />
                    <Text style={{textAlign: 'center', color: "#05050F", fontWeight: 'bold', paddingLeft: 25, paddingTop: 25, paddingRight: 25, paddingBottom: 15, fontSize: 20}}>
                        {this.props.message}
                    </Text>
                    <Text style={{textAlign: 'center', paddingLeft: 25, paddingRight: 25, fontSize: 15}}>
                        Your game will be review by our admins and published live shortly. Have fun!
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={0.9} onPress={() => Actions.reset('auth')} style={{marginTop: 40, backgroundColor: "#292B80", paddingLeft: 30, paddingRight: 30, padding: 15}}>
                    <Text style={{textAlign: 'center', fontSize: 15, color: WHITE}}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        );


    }
}

const styles = {
  
}

const mapStateToProps = (state) => {
  
    return {};
};

export default connect(mapStateToProps, { })(GameCreated);
