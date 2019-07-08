import {RESET_UPDATE} from './../actions/Types';

const INITIAL_STATE = {
    email: '',
    password: '',
    passwordConfirmation: '',
    code: '',
    token: '',
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case RESET_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
      
        default:
            return state;
    }
};
