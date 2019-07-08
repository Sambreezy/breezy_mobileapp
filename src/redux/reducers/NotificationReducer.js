import {
        GET_NOTIFICATION, GET_SINGLE_NOTIFICATION, 
        IS_PUSH_NOTIFICATION, SET_PUSH_NOTIFICATION_DATA,
        HAS_RECEIVED_NOTIFICATION
    } from './../actions/Types';

const INITIAL_STATE = {
    notifications: [],
    singleNotification: {},
    pushNotification: {},
    isPushNotification: false,
    hasReceivedNotification: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_NOTIFICATION:
            
            return { ...state, notifications: action.payload };
        
        case GET_SINGLE_NOTIFICATION:
            
            return { ...state, singleNotification: action.payload };
        
        case SET_PUSH_NOTIFICATION_DATA:
            return {...state, pushNotification: action.payload}

        case IS_PUSH_NOTIFICATION:
            
            return { ...state, isPushNotification: action.payload };

        case HAS_RECEIVED_NOTIFICATION:
            
            return { ...state, hasReceivedNotification: action.payload };

        default:
            return state;
    }
};
