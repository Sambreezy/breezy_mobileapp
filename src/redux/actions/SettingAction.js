import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import config from './../config';

import {
    UPDATE_SETTING_LOADING, GET_SETTING, 
    CREATE_PIN_ERROR, CREATE_PIN_ERROR_MESSAGE, 
    PIN_LOADING, SETTING_UPDATE
} from './Types';

import { toggleCreatePinModal, toggleChangePinModal } from './GeneralAction';
import { getMyProfile } from './AuthAction';

export const settingUpdate = (text) => {

    return {
        type: SETTING_UPDATE,
        payload: text
    }
};

export const getUserSetting = () => {
    return (dispatch) => {
       
        axios.get(config.apiUrl+'setting')
            .then(res => {
                console.log(res.data);
                
                dispatch({
                    type: GET_SETTING,
                    payload: res.data.data
                });
            }).catch(err => {
              
                console.log(err.response);
            
                
            })
      
    }
};

export const createWithdrawalPin = (data) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_PIN_ERROR,
            payload: {}
        });

        dispatch({
            type: PIN_LOADING,
            payload: true
        });

        dispatch({
            type: CREATE_PIN_ERROR_MESSAGE,
            payload: ''
        });
        
        axios.post(config.apiUrl+'setting/transaction-pin', data)
            .then(res => {
                
                dispatch({
                    type: PIN_LOADING,
                    payload: false
                });
                dispatch(toggleCreatePinModal(false));
                // Actions.reset('auth');
                dispatch(getMyProfile());
                dispatch(settingUpdate({prop: 'success', value: true}));

            }).catch(err => {
                console.log(err.response);
                dispatch({
                    type: PIN_LOADING,
                    payload: false
                });
                if(err.response.status == 422){
                    dispatch({
                        type: CREATE_PIN_ERROR,
                        payload: err.response.data.errors
                    })
                }

                if(err.response.status == 409){
                    dispatch({
                        type: CREATE_PIN_ERROR_MESSAGE,
                        payload: err.response.data.message
                    })
                }
                
            
                
            })
      
    }
};


export const changeWithdrawalPin = (data) => {
    return (dispatch) => {

        dispatch({
            type: PIN_LOADING,
            payload: true
        });
        
        dispatch({
            type: CREATE_PIN_ERROR,
            payload: {}
        });

        dispatch({
            type: CREATE_PIN_ERROR_MESSAGE,
            payload: ''
        });
        
       data._method = 'PUT';
        axios.post(config.apiUrl+'setting/transaction-pin', data)
            .then(res => {
                dispatch({
                    type: PIN_LOADING,
                    payload: false
                });
                console.log(res);
                dispatch(toggleChangePinModal(false));

                dispatch(settingUpdate({prop: 'success', value: true}));

            }).catch(err => {
                dispatch({
                    type: PIN_LOADING,
                    payload: false
                });
                if(err.response.status == 422){
                    dispatch({
                        type: CREATE_PIN_ERROR,
                        payload: err.response.data.errors
                    })
                }
                

                if(err.response.status == 409){
                    dispatch({
                        type: CREATE_PIN_ERROR_MESSAGE,
                        payload: err.response.data.message
                    })
                }

                if(err.response.status == 403){
                    dispatch({
                        type: CREATE_PIN_ERROR_MESSAGE,
                        payload: err.response.data.message
                    })
                }
                console.log(err.response);
            
                
            })
      
    }
};



export const updateUserSetting = (data) => {
    return (dispatch) => {
       dispatch({
           type: UPDATE_SETTING_LOADING,
           payload: true
       });
        data._method = 'PUT';
        axios.post(config.apiUrl+'setting', data)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: UPDATE_SETTING_LOADING,
                    payload: false
                });
                dispatch({
                    type: GET_SETTING,
                    payload: res.data.data
                });
            }).catch(err => {
                dispatch({
                    type: UPDATE_SETTING_LOADING,
                    payload: false
                });
                console.log(err.response);
            
                
            })
      
    }
};

