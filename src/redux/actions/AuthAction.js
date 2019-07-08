import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import config from './../config';

import {
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS, LOGIN_USER_FAIL,
    LOADING, LOGIN_UPDATE, REGISTER_UPDATE,
    GET_ERRORS, GET_MESSAGE, LOGOUT_USER, 
    INITIALIZE_USER, GET_MY_PROFILE,
    REGISTER_LOADING, REGISTER_ERRORS, LOGIN_ERRORS, 
    REFERRAL_ERROR, PROFILE_UPDATE_LOADING, PROFILE_UPDATE_ERROR, PROFILE_UPDATE_VALIDATION_ERROR

} from './Types';

import { startAuthLoading, stopAuthLoading } from './LoadingAction';
import { toggleUpdateProfileModal, toggleCreatePinModal } from './GeneralAction';

export const registerUpdate = (text) => {

    return {
        type: REGISTER_UPDATE,
        payload: text
    }
};

export const loginUpdate = (payload) => {

    return {
        type: LOGIN_UPDATE,
        payload
    }
};

export const passwordChanged = (text) => {

    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export const authenticateUser = (data) => {
    return (dispatch) => {
       dispatch(startAuthLoading());
        axios.post(config.apiUrl+'oauth/token', data)
            .then(res => {
                console.log(res.data);
                dispatch(stopAuthLoading());
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: res.data
                });
                Actions.reset('auth');
                // dispatch(getMyProfile(true));
            }).catch(err => {
                if(err.response.status == 422){
                    dispatch({
                        type: LOGIN_ERRORS,
                        payload: err.response.data.errors
                    });
                }

                if(err.response.status == 400){
                    dispatch({
                        type: LOGIN_ERRORS,
                        payload: err.response.data.message
                    });
                }
                if(err.response.status == 401){
                    dispatch({
                        type: LOGIN_ERRORS,
                        payload: err.response.data.message
                    });
                }
                console.log(err.response);
                dispatch(stopAuthLoading());
                
            })
      
    }
};

export const getMyProfile = (from = false) => {
    return (dispatch) => {
       
        axios.get(config.apiUrl+'oauth/user')
            .then(res => {
                console.log(res.data);
                // if(!res.data.data.has_transaction_pin && from){
                //     dispatch(toggleCreatePinModal(true));
                // }

                // if(res.data.data.has_transaction_pin && from){
                //     Actions.reset('auth');
                // }
                dispatch({
                    type: GET_MY_PROFILE,
                    payload: res.data.data
                });
                
            }).catch(err => {
                console.log(err);
                
                
            })
      
    }
};

export const updateMyProfile = (id, data) => {
    return (dispatch) => {
        data._method = 'put';
        dispatch({
            type: PROFILE_UPDATE_LOADING,
            payload: true
        });
        axios.post(config.apiUrl+'user/'+id, data)
            .then(res => {
                console.log(res);
                dispatch({
                    type: PROFILE_UPDATE_LOADING,
                    payload: false
                });
                dispatch(toggleUpdateProfileModal(false));
                dispatch({
                    type: GET_MY_PROFILE,
                    payload: res.data.data
                });
                
            }).catch(err => {
                console.log(err.response);
                if(err.response.status == 403){
                    dispatch({
                        type: PROFILE_UPDATE_ERROR,
                        payload: err.response.data.message
                    });
    
                }
               
                if(err.response.status == 422){
                    dispatch({
                        type: PROFILE_UPDATE_VALIDATION_ERROR,
                        payload: err.response.data.errors
                    });
    
                }

                dispatch({
                    type: PROFILE_UPDATE_LOADING,
                    payload: false
                });
                
            })
      
    }
};

export const processInvite = (data) => {
    return (dispatch) => {
        dispatch(startAuthLoading());
        dispatch({
            type: REFERRAL_ERROR,
            payload: ''
        })
        axios.post(config.apiUrl+'invite', data)
            .then(res => {
                console.log(res.data);
                dispatch(stopAuthLoading());
                Actions.reset('auth');
                
            }).catch(err => {
                console.log(err.response);
                dispatch(stopAuthLoading());
                dispatch({
                    type: REFERRAL_ERROR,
                    payload: err.response.data.message
                })
                
            })
      
    }
};

export const registerUser = (data) => {
    return (dispatch) => {
       dispatch({
           type:REGISTER_LOADING,
           payload: true
       });

       dispatch({
            type: REGISTER_ERRORS,
            payload: {}
        });
        axios.post(config.apiUrl+'register', data)
            .then(res => {
                dispatch({
                    type:REGISTER_LOADING,
                    payload: false
                })
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: res.data
                });
                
                Actions.reset('referral');
            }).catch(err => {
                dispatch({
                    type:REGISTER_LOADING,
                    payload: false
                })
                if(err.response.status == 422){
                    dispatch({
                        type: REGISTER_ERRORS,
                        payload: err.response.data.errors
                    })
                }
                
                console.log(err.response);
                
                
            })
      
    }
};

export const clearProfileUpdateError = () => {
    return (dispatch) => {
        dispatch({
            type: PROFILE_UPDATE_ERROR,
            payload: ''
        });
      
    }
};

export const initializeUser = (payload) => {
    return (dispatch) => {
        dispatch({
            type: INITIALIZE_USER,
            payload
        });
        // Actions.home();
        // dispatch(getMyProfile(true));
    }
};


export const logoutUser = () => {
    return (dispatch) => {
       dispatch({
           type: LOGOUT_USER      
       });
       Actions.reset('login');
    }
};

export const clearLoginError = () => {
    return (dispatch) => {
       dispatch({
           type: LOGIN_ERRORS,
           payload: ''     
       });
    }
};

const clearErrors = (dispatch) => {
    dispatch({
        type: GET_ERRORS,
        payload: ""
    });
}


const clearMessage = (dispatch) => {
    dispatch({
        type: GET_MESSAGE,
        payload: ''
    });
}


const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL

    });
    stopLoading();
};
