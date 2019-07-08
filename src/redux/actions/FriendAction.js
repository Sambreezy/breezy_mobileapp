import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import config from './../config';

import {
   GET_FRIEND_REQUESTS, FRIEND_REQUEST_LOADING, GET_USERS, GET_FRIENDS,FRIEND_UPDATE
  
} from './Types';
import { toggleFriendRequestModal } from './GeneralAction';
import { avatar } from '../../style';
import { isPushNotification, hasReceivedNotification, setNotificationData } from './NotificationAction';

export const friendUpdate = (payload) => {

    return {
        type: FRIEND_UPDATE,
        payload
    }
};


export const getFriendRequests = () => {
    return (dispatch) => {
       dispatch({
           type: FRIEND_REQUEST_LOADING,
           payload: true
       });
        axios.get(config.apiUrl+'friend/request')
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: GET_FRIEND_REQUESTS,
                    payload: res.data.data
                });
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
                
            }).catch(err => {
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
              
                console.log(err.response);
            
            })
      
    }
};

export const getFriends = () => {
    return (dispatch) => {
       dispatch({
           type: FRIEND_REQUEST_LOADING,
           payload: true
       });
        axios.get(config.apiUrl+'friend')
            .then(res => {
                console.log(res.data);
              
                dispatch({
                    type: GET_FRIENDS,
                    payload: res.data.data
                });
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
                
            }).catch(err => {
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
                
                console.log(err.response);
            
            })
      
    }
};

export const getUsers = () => {
    return (dispatch) => {
        dispatch({
            type: FRIEND_REQUEST_LOADING,
            payload: true
        });
        axios.get(config.apiUrl+'user')
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
                dispatch({
                    type: GET_USERS,
                    payload: res.data.data
                })
                
            }).catch(err => {
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
                console.log(err.response);
            
            })
      
    }
};


export const acceptFriendRequest = (id) => {
    return (dispatch) => {
       dispatch({
           type: FRIEND_REQUEST_LOADING,
           payload: true
       });
        axios.post(config.apiUrl+'friend/request/'+id+'/accept',{_method: 'put'})
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
                dispatch(getFriendRequests());
                dispatch(getFriends());
                dispatch(toggleFriendRequestModal(false, avatar));
               
                dispatch(isPushNotification(false));
                dispatch(setNotificationData({}));
                dispatch(hasReceivedNotification(false));
            }).catch(err => {
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
            
                console.log(err.response);
            
            })
      
    }
};

export const denyFriendRequest = (id) => {
    return (dispatch) => {
       dispatch({
           type: FRIEND_REQUEST_LOADING,
           payload: true
       });
        axios.post(config.apiUrl+'friend/request/'+id+'/deny', {_method: 'delete'})
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
                dispatch(getFriendRequests());
                dispatch(toggleFriendRequestModal(false, avatar));
                dispatch(isPushNotification(false));
                dispatch(setNotificationData({}));
                dispatch(hasReceivedNotification(false));
            }).catch(err => {
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
              
                console.log(err.response);
            
            })
      
    }
};

export const unfriend = (id) => {
    return (dispatch) => {
       dispatch({
           type: FRIEND_REQUEST_LOADING,
           payload: true
       });
        axios.post(config.apiUrl+'friend/'+id,{_method: 'delete'})
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
                dispatch(getFriends());
            }).catch(err => {
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
              
                console.log(err.response);
            
            })
      
    }
};

export const sendFriendRequest = (data) => {
    return (dispatch) => {
       dispatch({
           type: FRIEND_REQUEST_LOADING,
           payload: true
       });

       dispatch(friendUpdate({prop: 'requestSent', value: ''}));
       dispatch(friendUpdate({prop: 'requestNotSent', value: ''}));

        axios.post(config.apiUrl+'friend/request', data)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
                dispatch(friendUpdate({prop: 'requestSent', value: 'Friend request sent successfully'}))
                
            }).catch(err => {
                dispatch({
                    type: FRIEND_REQUEST_LOADING,
                    payload: false
                });
                dispatch(friendUpdate({prop: 'requestNotSent', value: err.response.data.message}))
                console.log(err.response);
            
            })
      
    }
};