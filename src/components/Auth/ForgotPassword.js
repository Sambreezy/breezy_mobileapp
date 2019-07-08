import React, { Component } from 'react';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { resetUpdate, forgotPassword, clearForgotPasswordError} from './../../redux/actions';
import {MaterialInput, AnimatedSpinner, Text, Spinner } from './../Reusables';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Item, Input} from 'native-base';
import { logo, SITE_COLOR, WHITE, BACKGROUND, LIGHT_GRAY, GRAY, PINK, RED, GREEN } from './../../style';
import { calculateOpacity } from './../../Helper';
import axios from 'axios';
import config from './../../redux/config';
import { Actions } from 'react-native-router-flux';


class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: true,
          emailError: ''
        }
  
    }

    isEmailValid(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    sendForgotPasswordEmail(){
        if(this.props.email.trim().length == 0){
            this.setState({emailError: 'Email field must not be empty'});
            return;
        }

        if(!this.isEmailValid(this.props.email)){
            this.setState({emailError: 'Enter a valid email'});
            return;
        }

        this.props.forgotPassword({email: this.props.email});
    }


    renderForgotPasswordError(){
        
        if(this.props.forgotPasswordError.length > 0){
            
            setTimeout(() => this.props.clearForgotPasswordError(), 2000);
            
                return (
                    <View style={{ padding: 12, backgroundColor: PINK, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 55}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{this.props.forgotPasswordError}</Text>
                    </View>
                );
            
            
        }
    }

    renderForgotPasswordSuccess(){
        
        if(this.props.forgotPasswordSuccess){
            
            setTimeout(() => {
                this.props.resetUpdate({prop: 'forgotPasswordSuccess', value: false});
                Actions.resetPassword();
            }, 2000);
            
                return (
                    <View style={{ padding: 12, backgroundColor: GREEN, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 55}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{'A password reset code has been sent to your email address'}</Text>
                    </View>
                );
            
            
        }
    }


    render() {
        
        return (
            <ScrollView 
                contentContainerStyle={{paddingBottom: 25, flexGrow: 1}}
                style={{backgroundColor: WHITE }}>
                {this.renderForgotPasswordError()}
                {this.renderForgotPasswordSuccess()}
                {this.props.forgotPasswordLoading ? <Spinner/> : null}
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
                    <Text style={{ textAlign: 'center', color: SITE_COLOR, fontSize: 18, paddingTop: 10, fontWeight: 'bold'}}>Reset Password</Text>
                </View>
                <View style={{marginLeft: 15, marginRight: 15}}>  
                  
               
                    <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15}}>
                        <Input 
                            style={{paddingLeft: 20}} 
                            autoCorrect={false}
                            placeholderTextColor={'#d0cdcd'}
                            value={this.props.email}
                            onChangeText={(value) => this.props.resetUpdate({prop: 'email', value})}
                            placeholder={'Email'}
                            />
                         
                     </Item>
                     <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 12, color: RED}}>{this.state.emailError}</Text>

                        
                     <TouchableOpacity activeOpacity={0.8} onPress={() => this.sendForgotPasswordEmail()} style={[styles.authButtonStyle, { borderWidth: 0.5, borderColor: '#1160A5'}]}>
          
                        <Text style={{textAlign: 'center', paddingTop: 2, flex: 1, color: SITE_COLOR, fontSize: 16}}>Reset Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop: 10}} onPress={() => Actions.pop()}>
                            <Text style={{color: SITE_COLOR, textAlign: 'center', fontSize: 16}}>Back</Text>
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
    const {forgotPasswordLoading} = state.loading;
    const {email, oldPassword, newPassword, token, code, forgotPasswordSuccess} = state.reset;
    const {forgotPasswordError} = state.errors;
    return { forgotPasswordLoading,forgotPasswordError, forgotPasswordSuccess, email, oldPassword, newPassword, token, code};
};

export default connect(mapStateToProps, { resetUpdate, forgotPassword, clearForgotPasswordError})(ForgotPassword);

