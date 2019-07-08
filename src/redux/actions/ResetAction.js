import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import config from './../config';

import {
    FORGOT_PASSWORD_LOADING, RESET_UPDATE, FORGOT_PASSWORD_ERROR, RESET_PASSWORD_ERROR, VALIDATE_TOKEN_LOADING
} from './Types';
import { authenticateUser } from './AuthAction';

export const resetUpdate = (text) => {

    return {
        type: RESET_UPDATE,
        payload: text
    }
};

export const clearForgotPasswordError = () => {
    return (dispatch) => { 
        dispatch({
            type: FORGOT_PASSWORD_ERROR,
            payload: ''
        })
    }
}

export const clearResetPasswordError = () => {
    return (dispatch) => { 
        dispatch({
            type: RESET_PASSWORD_ERROR,
            payload: ''
        })
    }
}



export const forgotPassword = (data) => {
    return (dispatch) => {
       dispatch({
           type: FORGOT_PASSWORD_LOADING,
           payload: true
       });
       dispatch({
            type: FORGOT_PASSWORD_ERROR,
            payload: ''
        })
        axios.post(config.apiUrl+'password/email', data)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: FORGOT_PASSWORD_LOADING,
                    payload: false
                });
                dispatch(resetUpdate({prop: 'forgotPasswordSuccess', value: true}));

            }).catch(err => {
                dispatch({
                    type: FORGOT_PASSWORD_LOADING,
                    payload: false
                });
                
                dispatch({
                    type: FORGOT_PASSWORD_ERROR,
                    payload: err.response.data.message
                });

                console.log(err.response);
            
            })
      
    }
};

export const validateToken = (data) => {
    return (dispatch) => {
       dispatch({
           type: VALIDATE_TOKEN_LOADING,
           payload: true
       });
     
        axios.post(config.apiUrl+'password/token', data)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: VALIDATE_TOKEN_LOADING,
                    payload: false
                });
                dispatch(resetUpdate({prop: 'token', value: data.token}));

            }).catch(err => {
                Actions.reset('tokenError', {message: err.response.data.message});
                dispatch({
                    type: VALIDATE_TOKEN_LOADING,
                    payload: false
                });
                
                console.log(err.response);
            
            })
      
    }
};

export const resetPassword = (data) => {
    return (dispatch) => {
       dispatch({
           type: FORGOT_PASSWORD_LOADING,
           payload: true
       });
       dispatch({
            type: FORGOT_PASSWORD_ERROR,
            payload: ''
        })
        data._method = 'put';
        axios.post(config.apiUrl+'password/reset', data)
            .then(res => {
                console.log(res);
                dispatch({
                    type: FORGOT_PASSWORD_LOADING,
                    payload: false
                });
                let result = {
                    client_id: config.clientID,
                    client_secret: config.clientSecret,
                    grant_type: 'password',
                    username: data.email,
                    password: data.password
        
                }

                dispatch(authenticateUser(result))

            }).catch(err => {
                dispatch({
                    type: FORGOT_PASSWORD_LOADING,
                    payload: false
                });
                
                dispatch({
                    type: RESET_PASSWORD_ERROR,
                    payload: err.response.data.message
                });
                
                console.log(err.response);
            
            })
      
    }
};