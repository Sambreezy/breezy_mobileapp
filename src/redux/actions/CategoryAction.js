import axios from 'axios';
import config from './../config';

import {
    GET_CATEGORIES, CATEGORIES_LOADING
} from './Types';


export const getCategories = () => {
    return (dispatch) => {
       dispatch({
           type: CATEGORIES_LOADING,
           payload: true
       });
        axios.get(config.apiUrl+'category')
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: CATEGORIES_LOADING,
                    payload: false
                });
                dispatch({
                    type: GET_CATEGORIES,
                    payload: res.data.data
                });
            }).catch(err => {
                dispatch({
                    type: CATEGORIES_LOADING,
                    payload: false
                });
                console.log(err.response);
            
                
            })
      
    }
};

