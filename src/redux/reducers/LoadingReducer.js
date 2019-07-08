import {
    AUTH_LOADING, WALLET_LOADING, CATEGORIES_LOADING, 
    STAKE_LOADING, GAMES_LOADING, SINGLE_GAME_LOADING, 
    NOTIFICATION_LOADING, SINGLE_NOTIFICATION_LOADING,
    REGISTER_LOADING, WITHDRAW_LOADING,
    FUND_LOADING,
    FRIEND_REQUEST_LOADING,
    FORGOT_PASSWORD_LOADING,
    VALIDATE_TOKEN_LOADING,
    PROFILE_UPDATE_LOADING,
    CREATE_GAME_LOADING,
    MY_SINGLE_GAME_LOADING,
    UPDATE_SETTING_LOADING,
    PIN_LOADING,
    RESOLVE_BANK_ACCOUNT_LOADING,
    GET_CHAT_LOADING,
    CREATE_CHAT_LOADING
} from './../actions/Types';

const INITIAL_STATE = {
    authLoading: false,
    walletLoading: false,
    categoryLoading: false,
    stakeLoading: false,
    gameLoading: false,
    singleGameLoading: false,
    notificationLoading: false,
    singleNotificationLoading: false,
    registerLoading: false,
    fundLoading: false,
    pinLoading: false,
    withdrawLoading: false,
    friendRequestLoading: false,
    forgotPasswordLoading: false,
    validateTokenLoading: false,
    profileUpdateLoading: false,
    createGameLoading: false,
    mySingleGameLoading: false,
    updateSettingLoading: false,
    resolveBankAccountLoading: false,
    getChatLoading: false,
    createChatLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_LOADING:
            return { ...state, authLoading: action.payload };

        case WALLET_LOADING:
            return { ...state, walletLoading: action.payload };

        case CATEGORIES_LOADING:
            return {...state, categoryLoading: action.payload}

        case STAKE_LOADING:
            return {...state, stakeLoading: action.payload}

        case GAMES_LOADING:
            return {...state, gameLoading: action.payload}

        case SINGLE_GAME_LOADING:
            return {...state, singleGameLoading: action.payload}

        case NOTIFICATION_LOADING:
            return {...state, notificationLoading: action.payload}

        case SINGLE_NOTIFICATION_LOADING:
            return {...state, singleNotificationLoading: action.payload}

        case REGISTER_LOADING:
            return {...state, registerLoading: action.payload}    

        case FUND_LOADING:
            return {...state, fundLoading: action.payload}    

        case WITHDRAW_LOADING:
            return {...state, withdrawLoading: action.payload} 
        
        case FRIEND_REQUEST_LOADING:
            return {...state, friendRequestLoading: action.payload} 

        case FORGOT_PASSWORD_LOADING:
            return {...state, forgotPasswordLoading: action.payload}   

        case VALIDATE_TOKEN_LOADING:
            return {...state, validateTokenLoading: action.payload}   

        case PROFILE_UPDATE_LOADING:
            return {...state, profileUpdateLoading: action.payload}  

        case CREATE_GAME_LOADING:
            return {...state, createGameLoading: action.payload}  

        case MY_SINGLE_GAME_LOADING:
            return {...state, mySingleGameLoading: action.payload}   

        case UPDATE_SETTING_LOADING:
            return {...state, updateSettingLoading: action.payload} 
        
        case PIN_LOADING:
            return {...state, pinLoading: action.payload} 

        case RESOLVE_BANK_ACCOUNT_LOADING:
            return {...state, resolveBankAccountLoading: action.payload} 

        case GET_CHAT_LOADING:
            return {...state, getChatLoading: action.payload} 

        case CREATE_CHAT_LOADING:
            return {...state, createChatLoading: action.payload} 
                
        default:
            return state;
    }
};