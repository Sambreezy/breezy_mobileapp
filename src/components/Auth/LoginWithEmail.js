import React, { Component } from 'react';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { loginUpdate, authenticateUser, clearLoginError} from './../../redux/actions';
import {MaterialInput, AnimatedSpinner, Text, Spinner } from './../Reusables';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Item, Input} from 'native-base';
import { logo, SITE_COLOR, WHITE, BACKGROUND, LIGHT_GRAY, GRAY, PINK } from './../../style';
import { calculateOpacity } from './../../Helper';
import axios from 'axios';
import config from './../../redux/config';
import { Actions } from 'react-native-router-flux';


class LoginWithEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: true
        }
        this.data = {}
    }

    componentWillMount() {
       
    }

    loginUser(){
        const {username, password} = this.props;
        if(username.trim().length == 0){
            alert('Username cannot be empty');
            return;
        }

        if(password.trim().length == 0){
            alert('Password cannot be empty');
            return;
        }

        this.data = {
            client_id: config.clientID,
            client_secret: config.clientSecret,
            grant_type: 'password',
            username,
            password

        }
        this.props.authenticateUser(this.data);
    }

    renderLoginError(){
        
        if(this.props.loginError.length > 0){
            
            setTimeout(() => this.props.clearLoginError(), 3000);
            
                return (
                    <View style={{ marginTop: 30, padding: 8, backgroundColor: PINK, justifyContent: 'center', position: 'absolute', left: 0, zIndex: 1000, right: 0, height: 45}}>
                        <Text style={{textAlign: 'center', color: WHITE, fontSize: 16}}>{this.props.loginError}</Text>
                    </View>
                );
            
            
        }
    }


    render() {
        const {loginErrors} = this.props;

        return (
            <ScrollView 
                contentContainerStyle={{paddingBottom: 25, flexGrow: 1}}
                style={{backgroundColor: WHITE }}>
                {this.renderLoginError()}
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
                    <Text style={{ textAlign: 'center', color: SITE_COLOR, fontSize: 18, paddingTop: 10, fontWeight: 'bold'}}>Login With Email</Text>
                </View>
                <View style={{marginLeft: 15, marginRight: 15}}>  
                
                    <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15}}>
                        <Input 
                            style={{paddingLeft: 20}} 
                            autoCorrect={false}
                            placeholderTextColor={'#d0cdcd'}
                            value={this.props.username}
                            onChangeText={(value) => this.props.loginUpdate({prop: 'username', value})}
                            placeholder={'Username or Email'}
                            />
                    </Item>
               
                    <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15}}>
                        <Input 
                            style={{paddingLeft: 20}} 
                            autoCorrect={false}
                            placeholderTextColor={'#d0cdcd'}
                            secureTextEntry={this.state.visible}
                            value={this.props.password}
                            onChangeText={(value) => this.props.loginUpdate({prop: 'password', value})}
                            placeholder={'Password'}
                            />
                            <TouchableOpacity onPress={() => this.setState({visible: !this.state.visible})}>
                                <MaterialCommunityIcon style={{marginRight: 22}} name={ this.state.visible ?  'eye-off' : 'eye'} color={'black'} size={25}/>
                   
                            </TouchableOpacity>
                     </Item>
                    
                        
                     <TouchableOpacity activeOpacity={0.8} onPress={() => this.loginUser()} style={[styles.authButtonStyle, { borderWidth: 0.5, borderColor: '#1160A5'}]}>
          
                        <Text style={{textAlign: 'center', paddingTop: 2, flex: 1, color: SITE_COLOR, fontSize: 16}}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Actions.forgotPassword()}>
                        <Text style={{color: PINK, textAlign: 'right', paddingTop: 2, marginRight: 10, fontSize: 14}}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop: 10}} onPress={() => Actions.pop()}>
                            <Text style={{color: SITE_COLOR, textAlign: 'center', fontSize: 16}}>Back</Text>
                    </TouchableOpacity>
                       
                    <View style={{flexDirection: 'row', alignSelf:'center', paddingTop: 15, paddingRight: 10}}>
                        <Text style={{paddingRight: 10, fontSize: 16}}>No account yet ?</Text>
                        <TouchableOpacity onPress={() => Actions.register()}>
                            <Text style={{color: SITE_COLOR, fontSize: 16}}>Register</Text>
                        </TouchableOpacity>
                    </View>

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
    const {username, password} = state.auth;
    const {loginError} = state.errors;
    return { authLoading,loginError, username, password};
};

export default connect(mapStateToProps, { loginUpdate, authenticateUser, clearLoginError})(LoginWithEmail);

