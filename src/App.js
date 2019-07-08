import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import {BackHandler, Text, TextInput, Alert, PushNotificationIOS, StatusBar} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import reducers from './redux/reducers';
import Router from './Router';
import settings from './redux/config';
import codePush from "react-native-code-push";
import { MenuProvider } from 'react-native-popup-menu';
import PushService from './PushService';

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

class App extends Component {
    
    constructor(props){
        super(props);
        
        this.SetDefaultFontFamily();
        
    }

    SetDefaultFontFamily = () => {
        let components = [Text, TextInput]
        
        // const customProps = {
        //     style: {
        //         fontFamily: "Segoe UI Regular"
        //     }
        // }
    
        // for(let i = 0; i < components.length; i++) {
        //     const TextRender = components[i].prototype.render;
        //     const initialDefaultProps = components[i].prototype.constructor.defaultProps;
        //     components[i].prototype.constructor.defaultProps = {
        //         ...initialDefaultProps,
        //         ...customProps,
        //     }
        //     components[i].prototype.render = function render() {
        //         let oldProps = this.props;
        //         this.props = { ...this.props, style: [customProps.style, this.props.style] };
        //         try {
        //             return TextRender.apply(this, arguments);
        //         } finally {
        //             this.props = oldProps;
        //         }
        //     };
        // }
    }



    componentWillMount(){
        
        
        axios.defaults.headers.common['X-Client-ID'] = settings.clientID;
        axios.defaults.headers.common['X-Client-Secret'] = settings.clientSecret;

        axios.defaults.timeout = 60000;
        
        axios.interceptors.response.use((response) => {
            // Do something with response data
            return response;
          }, (error) => {
            // Do something with response error
            
            if(error.code === 'ECONNABORTED'){
                
                alert("Can't connect to PredictPal Network");
                
            }
            return Promise.reject(error);
          });
    }

    componentDidMount() {
        PushService.configure();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
     
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        
      }

    handleBackButton = () => {
       
        if(Actions.state.index > 0){
            Actions.pop();
            return true;
        }
        Alert.alert(
            'Exit PredictPal',
            'Are you sure ?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
                cancelable: false
            }
        )
        return true;
    }
   
    render() {

        return (
            <MenuProvider skipInstanceCheck={true}>
                <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                    <Router />

                </Provider>
            </MenuProvider>
        )
    }
}

MyApp = codePush(codePushOptions)(App);
export default MyApp;
