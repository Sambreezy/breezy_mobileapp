import {
    GET_WALLET, TRANSACTION_UPDATE, GET_TRANSACTIONS
} from './../actions/Types';

const INITIAL_STATE = {
    balance: {},
    meta: {},
    transactions: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case TRANSACTION_UPDATE:
            
            return { ...state, [action.payload.prop]: action.payload.value };

        case GET_WALLET:
            
            return { ...state, balance: action.payload };

        case GET_TRANSACTIONS:
            
            return { ...state, transactions: action.payload.data, meta: action.payload.meta };

        default:
            return state;
    }
};
