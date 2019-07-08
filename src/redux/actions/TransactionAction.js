import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import config from './../config';

import {
    GET_WALLET, WALLET_LOADING,
    GET_TRANSACTIONS
} from './Types';

export const transactionUpdate = (text) => {

    return {
        type: TRANSACTION_UPDATE,
        payload: text
    }
};


export const getBalance = () => {
    return (dispatch) => {
       dispatch({
           type: WALLET_LOADING,
           payload: true
       });
        axios.get(config.apiUrl+'wallet')
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: WALLET_LOADING,
                    payload: false
                });
                dispatch({
                    type: GET_WALLET,
                    payload: res.data.data
                });
            }).catch(err => {
                dispatch({
                    type: WALLET_LOADING,
                    payload: false
                });
                console.log(err.response);
            
                
            })
      
    }
};

export const getTransactions = () => {
    return (dispatch) => {
      
        axios.get(config.apiUrl+'transaction')
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: GET_TRANSACTIONS,
                    payload: res.data
                })
            }).catch(err => {
               
                console.log(err.response);
            
                
            })
      
    }
};


