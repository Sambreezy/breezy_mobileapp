import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import config from './../config';

import {
   FUND_LOADING, FUND_UPDATE, FUND_ERROR, WITHDRAW_ERROR, 
   WITHDRAW_LOADING, GET_PAYSTACK_FUNDING_DETAILS, 
   GET_PAYPAL_FUNDING_DETAILS, RESOLVE_BANK_ACCOUNT_LOADING,
   GET_BANKS,
   WITHDRAW_ERROR_MESSAGE
} from './Types';

import { getBalance, getTransactions } from './TransactionAction';
import { toggleAddAmountModal, toggleWithdrawModal } from './GeneralAction';

export const fundUpdate = (text) => {

    return {
        type: FUND_UPDATE,
        payload: text
    }
};

export const clearFundError = () => {
    return (dispatch) => {
       dispatch({
            type: FUND_ERROR,
            payload: ''
        })
    }
};

export const clearWithdrawError = () => {

    return (dispatch) => {
        dispatch({
            type: WITHDRAW_ERROR_MESSAGE,
            payload: ''
        });

        dispatch({
            type: WITHDRAW_ERROR,
            payload: {}
        });
        
    }
};


export const fundWallet = (data) => {
    return (dispatch) => {
       dispatch({
           type: FUND_LOADING,
           payload: true
       });
       dispatch({
        type: FUND_ERROR,
        payload: ''
    })
        axios.post(config.apiUrl+'wallet/deposit', data)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: FUND_LOADING,
                    payload: false
                });
                dispatch(getBalance());
                dispatch(getTransactions());
                dispatch(toggleAddAmountModal(false));
                dispatch(fundUpdate({prop: 'fundSuccess', value: true}));
                dispatch(fundUpdate({prop: 'amount', value: ''}));

            }).catch(err => {
                dispatch({
                    type: FUND_LOADING,
                    payload: false
                });
                dispatch({
                    type: FUND_ERROR,
                    payload: err.response.data.message
                })
                console.log(err.response);
            
            })
      
    }
};

export const initializeFunding = (data) => {
    return (dispatch) => {
       dispatch({
           type: FUND_LOADING,
           payload: true
       });

        axios.post(config.apiUrl+'payment/initialize', data)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: FUND_LOADING,
                    payload: false
                });
               
                if(data.processor == 'paystack'){
                    dispatch({
                        type: GET_PAYSTACK_FUNDING_DETAILS,
                        payload: res.data.data
                    });
                    Actions.paystack();
                }else{
                    dispatch({
                        type: GET_PAYPAL_FUNDING_DETAILS,
                        payload: res.data.data
                    });
                    Actions.paypal();
                }
                    
            }).catch(err => {
                dispatch({
                    type: FUND_LOADING,
                    payload: false
                });
                alert('Could not initialize Transaction Try again');
                dispatch({
                    type: FUND_ERROR,
                    payload: err.response.data.message
                })
                console.log(err.response);
            
            })
      
    }
};

export const verifyTransaction = (data) => {
    return (dispatch) => {
       dispatch({
           type: FUND_LOADING,
           payload: true
       });
        data._method = 'PUT';
        axios.post(config.apiUrl+'payment/verify', data)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: FUND_LOADING,
                    payload: false
                });

                Actions.reset('gameCreated', {message: 'Transaction successful, your wallet has been credited.'});
            }).catch(err => {
                if(data.processor == 'paypal'){
                    Actions.reset('gameCreated', {message: 'Transaction successful, your wallet will be credited as soon as possible.'});
                }
                dispatch({
                    type: FUND_LOADING,
                    payload: false
                });
                dispatch({
                    type: FUND_ERROR,
                    payload: err.response.data.message
                })
                console.log(err.response);
            
            })
      
    }
};

export const withdrawFromWallet = (data) => {
    return (dispatch) => {
       dispatch({
           type: WITHDRAW_LOADING,
           payload: true
       });
       dispatch({
        type: WITHDRAW_ERROR,
        payload: {}
    })
    data._method = 'DELETE';
        axios.post(config.apiUrl+'wallet/withdraw', data)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: WITHDRAW_LOADING,
                    payload: false
                });
                dispatch(getBalance());
                dispatch(getTransactions());
                dispatch(toggleWithdrawModal(false));
                dispatch(fundUpdate({prop: 'withdrawSuccess', value: true}));
                dispatch(fundUpdate({prop: 'amount', value: ''}));
                

            }).catch(err => {
                dispatch({
                    type: WITHDRAW_LOADING,
                    payload: false
                });
                if(err.response.status == 422){
                    dispatch({
                        type: WITHDRAW_ERROR,
                        payload: err.response.data.errors
                    });
                }

                if(err.response.status != 422){
                    dispatch({
                        type: WITHDRAW_ERROR_MESSAGE,
                        payload: err.response.data.message
                    });
                }


                console.log(err.response);
            
            })
      
    }
};

export const resolveBankAccount = (data) => {
    return (dispatch) => {
       dispatch({
           type: RESOLVE_BANK_ACCOUNT_LOADING,
           payload: true
       });
        axios.get(config.apiUrl+'banks/resolve', {params: data})
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: RESOLVE_BANK_ACCOUNT_LOADING,
                    payload: false
                });
                dispatch(fundUpdate({prop: 'accountName', value: res.data.data.account_name}));
            }).catch(err => {
                dispatch({
                    type: RESOLVE_BANK_ACCOUNT_LOADING,
                    payload: false
                });
                dispatch(fundUpdate({prop: 'accountName', value: ''}));

                console.log(err.response);
            
            })
      
    }
};

export const getBanks = () => {
    return (dispatch) => {

        axios.get(config.apiUrl+'banks')
            .then(res => {
                console.log(res.data);

                dispatch({
                    type: GET_BANKS,
                    payload: res.data.data
                });

            }).catch(err => {

                console.log(err.response);
            
            })
      
    }
};