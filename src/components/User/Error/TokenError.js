import React, { Component } from 'react';
import {Image, View, Text, TouchableOpacity, BackHandler, NativeModules} from 'react-native';
import { connect } from 'react-redux';
import { ERROR, SITE_COLOR, PINK, WHITE, RED } from '../../../style';

class TokenError extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasFetchedCategory: false
        }
      
    }

    render() {

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    source={ERROR}
                    style={{width: 100, height: 100}}
                    resizeMode={'contain'}
                />
                <Text style={{color: RED, paddingTop: 15, fontSize: 18}}>{this.props.message}</Text>

                <TouchableOpacity style={{marginTop: 20, borderRadius: 5, backgroundColor: SITE_COLOR, paddingLeft: 20, paddingRight: 20, padding: 8}} onPress={() => NativeModules.KillApp.destroyApp()}>
                    <Text style={{textAlign: 'center', color: WHITE}}>Close App</Text>
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

export default connect(mapStateToProps, { })(TokenError);
