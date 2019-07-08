import {
    GET_ERRORS, STAKE_ERROR, REGISTER_ERRORS, 
    LOGIN_ERRORS, WITHDRAW_ERROR, FUND_ERROR, 
    REFERRAL_ERROR, FORGOT_PASSWORD_ERROR, 
    RESET_PASSWORD_ERROR, PROFILE_UPDATE_ERROR,
    PROFILE_UPDATE_VALIDATION_ERROR,
    CREATE_GAME_ERROR, CREATE_GAME_ERROR_MESSAGE,
    CREATE_PIN_ERROR, CREATE_PIN_ERROR_MESSAGE,
    WITHDRAW_ERROR_MESSAGE,
    CHAT_ERROR
} from './../actions/Types';

import { base_url } from './../config';

const INITIAL_STATE = {
    error: "",
    stakeError: "",
    withdrawErrorMessage: "",
    fundError: "",
    registerErrors: {},
    loginError: '',
    referralError: '',
    forgotPasswordError: '',
    resetPasswordError: '',
    profileUpdateError: '',
    profileUpdateValidationError: {},
    createGameError: {},
    createPinError: {},
    withdrawError: {},
    createPinErrorMessage: '',
    gameEditError: '',
    chatError: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ERRORS:

            return { ...state, error: action.payload };

        case STAKE_ERROR:

            return { ...state, stakeError: action.payload };

        case REGISTER_ERRORS:
            return {...state, registerErrors: action.payload}

        case LOGIN_ERRORS:
            return {...state, loginError: action.payload}

        case WITHDRAW_ERROR_MESSAGE:
            return {...state, withdrawErrorMessage: action.payload}

        case WITHDRAW_ERROR:
            return {...state, withdrawError: action.payload}

        case FUND_ERROR:
            return {...state, fundError: action.payload}

        case REFERRAL_ERROR:
            return {...state, referralError: action.payload}

        case FORGOT_PASSWORD_ERROR:
            return {...state, forgotPasswordError: action.payload}

        case RESET_PASSWORD_ERROR:
            return {...state, resetPasswordError: action.payload}

        case PROFILE_UPDATE_ERROR:
            return {...state, profileUpdateError: action.payload}

        case PROFILE_UPDATE_VALIDATION_ERROR:
            return {...state, profileUpdateValidationError: action.payload}

        case CREATE_GAME_ERROR:
            return {...state, createGameError: action.payload}

        case CREATE_PIN_ERROR:
            return {...state, createPinError: action.payload}

        case CREATE_PIN_ERROR_MESSAGE:
            return {...state, createPinErrorMessage: action.payload}

        case CREATE_GAME_ERROR_MESSAGE:
            return {...state, gameEditError: action.payload}

        case CHAT_ERROR:
            return {...state, chatError: action.payload}

        default:
            return state;
    }
};