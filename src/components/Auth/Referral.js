import React, { Component } from 'react';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { processInvite, loginUpdate} from './../../redux/actions';
import {MaterialInput, AnimatedSpinner, Text, Spinner } from './../Reusables';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Item, Input} from 'native-base';
import { logo, SITE_COLOR, WHITE, BACKGROUND, LIGHT_GRAY, GRAY } from './../../style';
import { calculateOpacity } from './../../Helper';
import axios from 'axios';
import config from './../../redux/config';
import { Actions } from 'react-native-router-flux';


class Referral extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: true
        }
        this.data = {}
    }

    componentWillMount() {
       
    }

    render() {
        const {referralError} = this.props;

        return (
            <ScrollView 
                contentContainerStyle={{paddingBottom: 25, flexGrow: 1}}
                style={{backgroundColor: WHITE }}>
                {this.props.authLoading ? <Spinner/> : null}
            <View style={{  backgroundColor: WHITE }}>
               
                <ImageBackground
                    source={BACKGROUND}
                    style={{width: '98%', height: 350, justifyContent: 'flex-end', alignItems: 'center'}}
                    resizeMode={'cover'}
                >
                    <Image
                        source={logo}
                        style={{width: 130, height: 130}}
                    />
                </ImageBackground>
                <View>
                    <Text style={{ textAlign: 'center', color: SITE_COLOR, fontSize: 36, paddingTop: 30, fontWeight: 'bold'}}>Predict Pal</Text>
                </View>
                <View style={{marginLeft: 15, marginRight: 15}}>  
                    <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15}}>
                        <Input 
                            style={{paddingLeft: 20}} 
                            autoCorrect={false}
                            value={this.props.username}
                            onChangeText={(value) => this.props.loginUpdate({prop: 'code', value})}
                            placeholder={'Referral code'}
                            />
                    </Item>
                    <Text style={{color: 'red', textAlign: 'right', paddingRight: 10, fontSize: 12}}>{referralError}</Text>
                    
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.processInvite({code: this.props.code})} style={[styles.authButtonStyle, { borderWidth: 0.5, borderColor: '#1160A5'}]}>
          
                        <Text style={{textAlign: 'center', paddingTop: 2, flex: 1, color: SITE_COLOR, fontSize: 16}}>Proceed</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop: 10}} onPress={() => Actions.reset('auth')}>
                            <Text style={{color: SITE_COLOR, textAlign: 'center', fontSize: 16}}>Skip</Text>
                    </TouchableOpacity>

                </View>
   
            </View>
            </ScrollView>
        );


    }
}

const BORDER_COLOR = '#C4C4C4';

const styles = {
    inputStyle: {

        borderColor: BORDER_COLOR,
    },

    iconViewStyle: {
        borderRadius: 100,
        padding: 7
    },

    linkedinViewStyle: {
        borderWidth: 0,

    },

    authButtonStyle:{
        paddingTop: 12, 
        paddingBottom: 12, 
        marginTop: 15, 
        
        borderRadius: 25,
        flexDirection: 'row'
    }
}

const mapStateToProps = (state) => {
    const {authLoading} = state.loading;
    const {code} = state.auth;
    const {referralError} = state.errors;
    return { authLoading,referralError, code};
};

export default connect(mapStateToProps, { processInvite, loginUpdate})(Referral);

