import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import config from './../config';

import {
   STAKE_LOADING, STAKE_UPDATE, STAKE_ERROR
} from './Types';
import { getSingleGame } from './GameAction';
import { getBalance, getTransactions } from './TransactionAction';
import { getCategories } from './CategoryAction';

export const stakeUpdate = (text) => {

    return {
        type: STAKE_UPDATE,
        payload: text
    }
};

export const clearStakeError = () => {
    return (dispatch) => {
       dispatch({
            type: STAKE_ERROR,
            payload: ''
        })
    }
};


export const stake = (data) => {
    return (dispatch) => {
       dispatch({
           type: STAKE_LOADING,
           payload: true
       });
       dispatch({
            type: STAKE_ERROR,
            payload: ''
        })
        axios.post(config.apiUrl+'stake', data)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: STAKE_LOADING,
                    payload: false
                });

                dispatch(stakeUpdate({prop: 'stakeSuccess', value: 'Your stake was successful'}));
                dispatch(stakeUpdate({prop: 'amount', value: ''}));
                dispatch(getBalance());
                dispatch(getTransactions());
                dispatch(getCategories());
                dispatch(getSingleGame(data.game));
               
            }).catch(err => {
                dispatch({
                    type: STAKE_LOADING,
                    payload: false
                });
                dispatch({
                    type: STAKE_ERROR,
                    payload: err.response.data.message
                })
                console.log(err.response);
            
            })
      
    }
};

