import { AUTH_LOADING } from './Types';


export const startAuthLoading = () => {

    return (dispatch) => {
        dispatch({
            type: AUTH_LOADING,
            payload: true
        })
        
    }
};

export const stopAuthLoading = () => {

    return (dispatch) => {
        dispatch({
            type: AUTH_LOADING,
            payload: false
        })
        
    }
};