import React, { Component } from 'react';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { registerUpdate, registerUser} from './../../redux/actions';
import {MaterialInput, AnimatedSpinner, Text, Spinner } from './../Reusables';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Item, Input} from 'native-base';
import { logo, SITE_COLOR, WHITE, BACKGROUND, LIGHT_GRAY, GRAY } from './../../style';
import { calculateOpacity } from './../../Helper';
import axios from 'axios';
import config from './../../redux/config';
import { Actions } from 'react-native-router-flux';


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: true
        }
        this.data = {}
    }

    componentWillMount() {
       
    }

    registerUser(){
        const {username, name, email, password} = this.props;
        
        if(email.trim().length == 0){
            alert('Email cannot be empty');
            return;
        }

        if(username.trim().length == 0){
            alert('Username cannot be empty');
            return;
        }

        if(password.trim().length == 0){
            alert('Password cannot be empty');
            return;
        }

        

        let data = {
            grant_type: 'password',
            client_id: config.clientID,
            client_secret: config.clientSecret,
            username,
            email,
            password,
            name
        }

        this.props.registerUser(data);
    }


    render() {
        const {registerErrors} = this.props;

        return (
            <ScrollView 
                contentContainerStyle={{paddingBottom: 25, flexGrow: 1}}
                style={{backgroundColor: WHITE }}>
            {this.props.registerLoading ? <Spinner/> : null}
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
                    <Text style={{ textAlign: 'center', color: SITE_COLOR, fontSize: 18, paddingTop: 10, fontWeight: 'bold'}}>Register on Predict Pal</Text>
                </View>
                <View style={{marginLeft: 15, marginRight: 15}}>  
                    
                    <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15}}>
                        <Input 
                            style={{paddingLeft: 20}} 
                            autoCorrect={false}
                            value={this.props.email}
                            placeholderTextColor={'#d0cdcd'}
                            onChangeText={(value) => this.props.registerUpdate({prop: 'email', value})}
                            placeholder={'Email'}
                            />
                    </Item>
                    {registerErrors.hasOwnProperty('email') ?
                        <Text style={{color: 'red', textAlign: 'right', paddingRight: 10, fontSize: 12}}>{registerErrors.email[0]}</Text>
                    : null
                    }
                    <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15}}>
                        <Input 
                            style={{paddingLeft: 20}} 
                            autoCorrect={false}
                            placeholderTextColor={'#d0cdcd'}
                            value={this.props.name}
                            onChangeText={(value) => this.props.registerUpdate({prop: 'name', value})}
                            placeholder={'Name'}
                            />
                    </Item>
                    {registerErrors.hasOwnProperty('name') ?
                        <Text style={{color: 'red', textAlign: 'right', paddingRight: 10, fontSize: 12}}>{registerErrors.name[0]}</Text>
                    : null
                    }

                    <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15}}>
                        <Input 
                            style={{paddingLeft: 20}} 
                            autoCorrect={false}
                            value={this.props.username}
                            placeholderTextColor={'#d0cdcd'}
                            onChangeText={(value) => this.props.registerUpdate({prop: 'username', value})}
                            placeholder={'Username'}
                            />
                    </Item>
                    {registerErrors.hasOwnProperty('username') ?
                        <Text style={{color: 'red', textAlign: 'right', paddingRight: 10, fontSize: 12}}>{registerErrors.username[0]}</Text>
                    : null
                    }

                    <Item rounded style={{backgroundColor: LIGHT_GRAY, marginTop: 15}}>
                        <Input 
                            style={{paddingLeft: 20}} 
                            autoCorrect={false}
                            secureTextEntry={this.state.visible}
                            value={this.props.password}
                            placeholderTextColor={'#d0cdcd'}
                            onChangeText={(value) => this.props.registerUpdate({prop: 'password', value})}
                            placeholder={'Password'}
                            />
                            <TouchableOpacity onPress={() => this.setState({visible: !this.state.visible})}>
                                <MaterialCommunityIcon style={{marginRight: 22}} name={ this.state.visible ?  'eye-off' : 'eye'} color={'black'} size={25}/>
                   
                            </TouchableOpacity>
                     </Item>
                     
                     {registerErrors.hasOwnProperty('password') ?
                        <Text style={{color: 'red', textAlign: 'right', paddingRight: 10, fontSize: 12}}>{registerErrors.password[0]}</Text>
                    : null
                    }
                    <TouchableOpacity style={{marginTop: 10}} onPress={() => Actions.pop()}>
                            <Text style={{color: SITE_COLOR, textAlign: 'center', fontSize: 16}}>Back</Text>
                    </TouchableOpacity>

                     <TouchableOpacity activeOpacity={0.8} onPress={() => this.registerUser()} style={[styles.authButtonStyle, { borderWidth: 0.5, borderColor: '#1160A5'}]}>
          
                        <Text style={{textAlign: 'center', paddingTop: 2, flex: 1, color: SITE_COLOR, fontSize: 16}}>Submit</Text>
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
    const {registerLoading} = state.loading;
    const {username, password, email, name} = state.auth;
    const {registerErrors} = state.errors;
    return { registerLoading,registerErrors, username, password, email, name };
};

export default connect(mapStateToProps, { registerUpdate, registerUser})(Register);

