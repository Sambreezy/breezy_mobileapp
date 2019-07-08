import React, { Component } from 'react';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, NativeModules, Linking } from 'react-native';
import { connect } from 'react-redux';
import { resetUpdate, resetPassword, clearResetPasswordError} from './../../redux/actions';
import {MaterialInput, AnimatedSpinner, Text, Spinner } from './../Reusables';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Item, Input} from 'native-base';
import { logo, SITE_COLOR, WHITE, BACKGROUND, LIGHT_GRAY, GRAY, PINK, RED, GREEN } from './../../style';
import { calculateOpacity } from './../../Helper';
import axios from 'axios';
import config from './../../redux/config';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';


class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: true,
          emailError: '',
          passwordError: ''
        }
  
    }

    componentDidMount() {
        SplashScreen.hide();
      }

    isEmailValid(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    resetPassword(){
        if(this.props.email.trim().length == 0){
            this.setState({emailError: 'Email field must not be empty'});
            return;
        }

        if(!this.isEmailValid(this.props.email)){
            this.setState({emailError: 'Enter a valid email'});
            return;
        }

        if(this.props.password.length == 0 || this.props.passwordConfirmation.length == 0){
            this.setState({passwordError: 'Password Field is required'});
            return;
        }

        if(this.props.password != this.props.passwordConfirmation){
            this.setState({passwordError: 'Passwords do not match'});
            return;
        }

        const {email, code, password, passwordConfirmation, token} = this.props;
        let data = {
            email,
            code,
            password,
            password_confirmation: passwordConfirmation,
            token
        }

        this.props.resetPassword(data);
    }


    renderResetPasswordError(){
        
        if(this.props.resetPasswordError.length > 0){
            
            setTimeout(() => this.props.clearResetPasswordError(), 3000);
            
                return (
                    <View style={{ padding: 12, backgroundColor: PINK, justifyContent: 'center', position: 'absolute', left: 0, top: 0, zIndex: 1000, right: 0, height: 55}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{this.props.resetPasswordError}</Text>
                    </View>
                );
            
            
        }
    }

    renderResetPasswordSuccess(){
        
        if(this.props.resetPasswordSuccess){
            
            setTimeout(() => this.props.resetUpdate({prop: 'resetPasswordSuccess', value: false}), 3000);
            
                return (
                    <View style={{ padding: 12, backgroundColor: GREEN, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 55}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{'A password reset code has been sent to your email address'}</Text>
                    </View>
                );
            
            
        }
    }


    render() {
        
        return (
            <View style={{flex: 1}}>
                {this.renderResetPasswordError()}
                {this.renderResetPasswordSuccess()}
                <ScrollView 
                    contentContainerStyle={{paddingBottom: 25, flexGrow: 1}}
                    style={{backgroundColor: WHITE }}>
                    
                    {this.props.forgotPasswordLoading ? <Spinner/> : null}
                    {this.props.authLoading ? <Spinner/> : null}
                {this.props.validateTokenLoading ? <Spinner/>
                    :
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
                        <Text style={{ textAlign: 'center', color: SITE_COLOR, fontSize: 18, paddingTop: 10, fontWeight: 'bold'}}>Change Password</Text>
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


                        <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15}}>
                            <Input 
                                style={{paddingLeft: 20}} 
                                autoCorrect={false}
                                placeholderTextColor={'#d0cdcd'}
                                value={this.props.code}
                                onFocus={() => this.setState({emailError: ''})}
                                onChangeText={(value) => this.props.resetUpdate({prop: 'code', value})}
                                placeholder={'Reset Code'}
                                />
                            
                        </Item>

                        <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15}}>
                            <Input 
                                style={{paddingLeft: 20}} 
                                autoCorrect={false}
                                placeholderTextColor={'#d0cdcd'}
                                secureTextEntry={true}
                                onFocus={() => this.setState({passwordError: ''})}
                                value={this.props.password}
                                onChangeText={(value) => this.props.resetUpdate({prop: 'password', value})}
                                placeholder={'Password'}
                                />
                        </Item>
                        <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 12, color: RED}}>{this.state.passwordError}</Text>


                        <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15}}>
                            <Input 
                                style={{paddingLeft: 20}} 
                                autoCorrect={false}
                                placeholderTextColor={'#d0cdcd'}
                                secureTextEntry={true}
                                value={this.props.passwordConfirmation}
                                onChangeText={(value) => this.props.resetUpdate({prop: 'passwordConfirmation', value})}
                                placeholder={'Confirm Password'}
                                />
                        </Item>
                        {/* <Text style={{textAlign: 'right', fontWeight: 'bold', fontSize: 12, color: RED}}>{this.state.emailError}</Text> */}

                            
                        <TouchableOpacity activeOpacity={0.8} onPress={() => this.resetPassword()} style={[styles.authButtonStyle, { borderWidth: 0.5, borderColor: '#1160A5'}]}>
            
                            <Text style={{textAlign: 'center', paddingTop: 2, flex: 1, color: SITE_COLOR, fontSize: 16}}>Change Password</Text>
                        </TouchableOpacity>

                    </View>
    
                </View>
                }
                </ScrollView>
            </View>
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
    const {forgotPasswordLoading, validateTokenLoading, authLoading} = state.loading;
    const {email, password, passwordConfirmation, oldPassword, newPassword, token, code, resetPasswordSuccess} = state.reset;
    const {resetPasswordError} = state.errors;

    return { forgotPasswordLoading, authLoading, validateTokenLoading, password, passwordConfirmation, resetPasswordError, resetPasswordSuccess, email, oldPassword, newPassword, token, code};
};

export default connect(mapStateToProps, { resetUpdate, resetPassword, clearResetPasswordError})(ResetPassword);

