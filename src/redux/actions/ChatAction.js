import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import config from './../config';

import {
   CREATE_CHAT_LOADING, CHAT_UPDATE, CHAT_ERROR, GET_CHAT_LOADING, GET_CHAT, APPEND_LAST_MESSAGE
} from './Types';
import { getFriends } from './FriendAction';

export const chatUpdate = (text) => {

    return {
        type: CHAT_UPDATE,
        payload: text
    }
};


export const createChat = (data) => {
    return (dispatch) => {
       dispatch({
           type: CREATE_CHAT_LOADING,
           payload: true
       });
       dispatch({
            type: CHAT_ERROR,
            payload: ''
        });
        axios.post(config.apiUrl+'chat', data)
            .then(res => {
                console.log(res);
                dispatch({
                    type: CREATE_CHAT_LOADING,
                    payload: false
                });
                dispatch(getFriends());
            }).catch(err => {
                dispatch({
                    type: CREATE_CHAT_LOADING,
                    payload: false
                });
                dispatch({
                    type: CHAT_ERROR,
                    payload: err.response.data.message
                })
                console.log(err.response);
            
            })
      
    }
};

export const getChatHistory = (id, reset = false) => {
    return (dispatch) => {
       dispatch({
           type: GET_CHAT_LOADING,
           payload: true
       });
       dispatch({
            type: CHAT_ERROR,
            payload: ''
        })
        if(reset){
            dispatch({
                type: GET_CHAT,
                payload: []
            });
        }
        
        axios.get(config.apiUrl+`chat/${id}/message`)
            .then(res => {
                console.log(res);
                dispatch({
                    type: GET_CHAT,
                    payload: res.data.data
                });
                dispatch({
                    type: GET_CHAT_LOADING,
                    payload: false
                });


            }).catch(err => {
                dispatch({
                    type: GET_CHAT_LOADING,
                    payload: false
                });
                
                console.log(err.response);
            
            })
      
    }
};

export const sendMessage = (id, data) => {
    return (dispatch) => {
      
       dispatch({
            type: CHAT_ERROR,
            payload: ''
        });
        dispatch({
            type: APPEND_LAST_MESSAGE,
            payload: data
        });
        axios.post(config.apiUrl+`chat/${id}/message`, {text: data.text})
            .then(res => {
                console.log(res);
               dispatch(getChatHistory(id))

            }).catch(err => {
                
                console.log(err.response);
            
            })
      
    }
};