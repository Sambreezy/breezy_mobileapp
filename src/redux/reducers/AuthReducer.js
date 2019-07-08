import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import PushNotification from 'react-native-push-notification';

import {
    EMAIL_CHANGED, PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
    LOADING, CLEAR_ERRORS, REGISTER_UPDATE,
    LOGIN_UPDATE, LOGOUT_USER, INITIALIZE_USER,
    GET_MY_PROFILE
} from './../actions/Types';

const INITIAL_STATE = {
    token: null,
    auth: false,
    user: {},
    email: '',
    name: '',
    username: '',
    password: '',
    code: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case REGISTER_UPDATE:
            
            return { ...state, [action.payload.prop]: action.payload.value };

        case LOGIN_UPDATE:
            
            return { ...state, [action.payload.prop]: action.payload.value };

        case GET_MY_PROFILE:
            PushNotification.subscribeToTopic(action.payload.id);
            return { ...state, user: action.payload, name: action.payload.name, username: action.payload.username };

        case LOGIN_USER_SUCCESS:

            storeUserData(action.payload);

            return { ...state, auth: true, token: action.payload.access_token };

        case INITIALIZE_USER:
            let detail = JSON.parse(action.payload);
            storeUserData(detail);
            
            return { ...state, auth: true, token: detail.access_token };
        
        case LOGOUT_USER:
            PushNotification.unsubscribeFromTopic(state.user.id);
            deleteUserData();
            return { ...state, auth: false, token: null };

        case LOADING:
            return { ...state, loading: action.payload };

        default:
            return state;
    }
};


const storeUserData = (payload) => {
    activateAxios(payload);
    AsyncStorage.setItem('token', JSON.stringify(payload));

}

const activateAxios = (payload) => {
    axios.defaults.headers.common['Authorization'] = payload.token_type +' '+ payload.access_token;
    
}

const deleteUserData = () => {
    AsyncStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
}