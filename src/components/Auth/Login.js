import React, { Component } from 'react';
import { ImageBackground, View, ScrollView, Image, TouchableOpacity, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { loginUpdate, authenticateUser, startAuthLoading, stopAuthLoading} from './../../redux/actions';
import {MaterialInput, AnimatedSpinner, Text, Spinner } from './../Reusables';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { logo, SITE_COLOR, WHITE, BACKGROUND, TWITTER_COLOR, FACEBOOK_COLOR, GOOGLE, GRAY } from './../../style';
import { calculateOpacity } from './../../Helper';
import axios from 'axios';
import config from './../../redux/config';
import { Actions } from 'react-native-router-flux';
import CreatePin from '../Pin/CreatePin';
import SplashScreen from 'react-native-splash-screen';

const { RNTwitterSignIn } = NativeModules;

const Constants = {
    
    TWITTER_COMSUMER_KEY: config.TWITTER_COMSUMER_KEY,
    TWITTER_CONSUMER_SECRET: config.TWITTER_CONSUMER_SECRET
}


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        }
        this.data = {}
    }

    componentWillMount(){
        SplashScreen.hide();
    }

    async getGoogleUserProfile() {

        this.props.startAuthLoading();
        GoogleSignin.configure({
            //  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
              webClientId: '645231926780-v6r8kkrah1f59fa3jfnimef3mhe300aj.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
              offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
              hostedDomain: '', // specifies a hosted domain restriction
              forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
              accountName: '', // [Android] specifies an account name on the device that should be used
          });

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            this.props.stopAuthLoading();
            this.socialLogin(userInfo.accessToken, 'google',null, userInfo.user.email);
        
        } catch (error) {
            this.props.stopAuthLoading();
            console.log(error);
            
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    twitterSignIn = () => {
        this.props.startAuthLoading();
        RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);
        
        RNTwitterSignIn.logIn()
            .then(loginData => {
                this.props.stopAuthLoading();
                console.log(loginData, "returned data");
                const { authToken, authTokenSecret, email } = loginData
                if (authToken && authTokenSecret) {

                    this.socialLogin(authToken, 'twitter', authTokenSecret, email);
                 
                }
            })
            .catch(error => {
                this.props.stopAuthLoading();
                console.log(error, "error occured")
            }
            )
    }

    handleFacebookLogin() {
        this.props.startAuthLoading();
        LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            .then(result => {
                    console.log(result);
                if (result.isCancelled) {
                    this.props.stopAuthLoading();
                    console.log('Login cancelled')
                } else {
                    this.getFacebookUserProfile();
                    console.log('Login success with permissions: ' + result.grantedPermissions.toString())
                }
                
            })
            .catch(err => {
                this.props.stopAuthLoading();
                console.log(err)
            });
    }

    getFacebookUserProfile() {
        AccessToken.getCurrentAccessToken()
            .then((data) => {
                const { accessToken } = data;
                console.log(data);
                axios.get('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + accessToken)
                    .then(res => {
                        this.props.stopAuthLoading();
                        console.log(res.data);
                        this.socialLogin(accessToken,'facebook',null,res.data.email);
                    })
                    .catch((err) => {
                        this.props.stopAuthLoading();
                        console.log(err);
                    })
            })
            .catch(err => {
                this.props.stopAuthLoading();
                console.log(err)
            });

    }

    socialLogin(access_token = null, provider = null, oauth_secret = null, email = null){
        this.data = {
            client_id: config.clientID,
            client_secret: config.clientSecret,
            grant_type: 'social',
            access_token,//: 'EAAcdN1omgQQBAC9sqBtT3zjDuCG7ZCUvHdNTPKzo2rhP1ZBOZBRnvwk23ZBR39M6xZAw1OdYz8eYkV2lcO9BZBRo0ubSr8ObGZCTJZBUZBbs7tvrRJrtHZBKMqorygxBDoSsHn31r3OfG6PqmJZBPdzYCjvyPZBqRoYZBFdIKgAp5yoNKOAZDZD',
            provider,
            oauth_secret,
            email

        }
        this.props.authenticateUser(this.data);
       
    }


    render() {

        let buttoncolor = this.props.isLoading ? SITE_COLOR + calculateOpacity(60) : SITE_COLOR;
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}} style={{backgroundColor: WHITE }}>
            <CreatePin/>
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
                    <Text style={{textAlign: 'center', fontSize: 14}}>...your peer-to-peer betting app</Text>
                </View>

                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end', margin: 20}}>
                
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.getGoogleUserProfile()} style={[styles.authButtonStyle, {borderWidth: 0.5, borderColor: '#1160A5'}]}>
                        <Image
                            source={GOOGLE}
                            style={{width: 25, height: 25, marginRight: 30}}
                        />
                        <Text style={{textAlign: 'center', paddingTop: 2, color: SITE_COLOR, fontSize: 16}}>Continue with Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.twitterSignIn()} style={[ styles.authButtonStyle, { backgroundColor: TWITTER_COLOR }]}>
                        <MaterialCommunityIcon style={{marginRight: 30}} name={'twitter'} color={WHITE} size={25}/>
                        <Text style={{textAlign: 'center', paddingTop: 2, color: WHITE, fontSize: 16}}>Continue with Twitter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleFacebookLogin()} style={[styles.authButtonStyle, { backgroundColor: FACEBOOK_COLOR}]}>
                        <MaterialCommunityIcon style={{marginRight: 30}} name={'facebook'} color={WHITE} size={25}/>
                        <Text style={{textAlign: 'center', paddingTop: 2, color: WHITE, fontSize: 16}}>Continue with Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.loginWithEmail()} style={[styles.authButtonStyle, {borderWidth: 0.5, borderColor: '#1160A5'}]}>
                        <MaterialCommunityIcon style={{marginRight: 30}} name={'email'} color={GRAY} size={25}/>
                        <Text style={{textAlign: 'center', paddingTop: 2, color: SITE_COLOR, fontSize: 16}}>Login with Email</Text>
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
        paddingLeft: 20,
        borderRadius: 25,
        flexDirection: 'row'
    }
}

const mapStateToProps = (state) => {
    const {authLoading} = state.loading;

    return { authLoading };
};

export default connect(mapStateToProps, { loginUpdate, authenticateUser, startAuthLoading, stopAuthLoading })(Login);

