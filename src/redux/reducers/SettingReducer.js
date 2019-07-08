import {GET_SETTING, SETTING_UPDATE} from './../actions/Types';

const INITIAL_STATE = {
    setting: {},
    success: false
};

export default (state = INITIAL_STATE, action) => {
        
    switch (action.type) {

        case SETTING_UPDATE:
            
            return { ...state, [action.payload.prop]: action.payload.value };


        case GET_SETTING:
            
            return { ...state, setting: action.payload };


        default:
            return state;
    }
};
