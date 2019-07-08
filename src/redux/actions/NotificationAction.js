import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import config from './../config';

import {
    GET_SINGLE_NOTIFICATION, NOTIFICATION_LOADING, GET_NOTIFICATION,
    SINGLE_NOTIFICATION_LOADING,
    SET_PUSH_NOTIFICATION_DATA,
    IS_PUSH_NOTIFICATION,
    HAS_RECEIVED_NOTIFICATION
} from './Types';


export const getNotifications = () => {
    return (dispatch) => {
       dispatch({
           type: NOTIFICATION_LOADING,
           payload: true
       });
        axios.get(config.apiUrl+'notification')
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: NOTIFICATION_LOADING,
                    payload: false
                });
                dispatch({
                    type: GET_NOTIFICATION,
                    payload: res.data.data
                });
            }).catch(err => {
                dispatch({
                    type: NOTIFICATION_LOADING,
                    payload: false
                });
                console.log(err.response);
            
                
            })
      
    }
};


export const getSingleNotification = (id) => {
    return (dispatch) => {
       dispatch({
           type: SINGLE_NOTIFICATION_LOADING,
           payload: true
       });
        axios.get(config.apiUrl+'notification/'+id)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: SINGLE_NOTIFICATION_LOADING,
                    payload: false
                });
                dispatch({
                    type: GET_SINGLE_NOTIFICATION,
                    payload: res.data.data
                });
            }).catch(err => {
                dispatch({
                    type: SINGLE_NOTIFICATION_LOADING,
                    payload: false
                });
                console.log(err.response);
            
                
            })
      
    }
};


export const setNotificationData = (payload) => {
    return (dispatch) => {
       dispatch({
           type: SET_PUSH_NOTIFICATION_DATA,
           payload
       });
      
    }
};

export const isPushNotification = (payload) => {
    return (dispatch) => {
       dispatch({
           type: IS_PUSH_NOTIFICATION,
           payload
       });
      
    }
};

export const hasReceivedNotification = (payload) => {
    return (dispatch) => {
       dispatch({
           type: HAS_RECEIVED_NOTIFICATION,
           payload
       });
      
    }
};