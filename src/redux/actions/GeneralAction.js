import { 
        TOGGLE_ADD_AMOUNT_MODAL, TOGGLE_WITHDRAW_MODAL, 
        TOGGLE_UPDATE_PROFILE_MODAL, TOGGLE_IMAGE_VIEW_MODAL, 
        SET_IMAGE_IN_MODAL, TOGGLE_FRIEND_REQUEST_MODAL,
        SET_DATA_IN_FRIEND_REQUEST_MODAL, TOGGLE_CREATE_PIN_MODAL,
        TOGGLE_CHANGE_PIN_MODAL
     } from './Types';
import { isPushNotification, setNotificationData, hasReceivedNotification } from './NotificationAction';


export const toggleAddAmountModal = (payload) => {

    return (dispatch) => {
        dispatch({
            type: TOGGLE_ADD_AMOUNT_MODAL,
            payload
        })
        
    }
};

export const toggleCreatePinModal = (payload) => {

    return (dispatch) => {
        dispatch({
            type: TOGGLE_CREATE_PIN_MODAL,
            payload
        })
        
    }
};

export const toggleChangePinModal = (payload) => {

    return (dispatch) => {
        dispatch({
            type: TOGGLE_CHANGE_PIN_MODAL,
            payload
        })
        
    }
};

export const toggleWithdrawModal = (payload) => {

    return (dispatch) => {
        dispatch({
            type: TOGGLE_WITHDRAW_MODAL,
            payload
        })
        
    }
};

export const toggleUpdateProfileModal = (payload) => {

    return (dispatch) => {
        dispatch({
            type: TOGGLE_UPDATE_PROFILE_MODAL,
            payload
        })
        
    }
};

export const toggleImageViewModal = (payload, url) => {

    return (dispatch) => {
        dispatch({
            type: TOGGLE_IMAGE_VIEW_MODAL,
            payload
        });

        dispatch({
            type: SET_IMAGE_IN_MODAL,
            payload: url
        })
        
    }
};

export const toggleFriendRequestModal = (payload, data) => {

    return (dispatch) => {
        dispatch({
            type: TOGGLE_FRIEND_REQUEST_MODAL,
            payload
        });

        dispatch({
            type: SET_DATA_IN_FRIEND_REQUEST_MODAL,
            payload: data
        });

        dispatch(isPushNotification(false));
        dispatch(setNotificationData({}));
        dispatch(hasReceivedNotification(false));
        
    }
};


