import {FUND_UPDATE, GET_PAYSTACK_FUNDING_DETAILS, GET_PAYPAL_FUNDING_DETAILS, GET_BANKS} from './../actions/Types';

const INITIAL_STATE = {
    amount: '',
    bank: '',
    bankCode: '',
    pin: '',
    accountNumber: '',
    accountName: '',
    fundSuccess: false,
    banks: [],
    paystackFundingDetails: {},
    paystackFundingDetails: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FUND_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };

        case GET_PAYSTACK_FUNDING_DETAILS:
            return {...state, paystackFundingDetails: action.payload}

        case GET_PAYPAL_FUNDING_DETAILS:
            return {...state, paypalFundingDetails: action.payload}

        case GET_BANKS:
            return {...state, banks: action.payload}

        default:
            return state;
    }
};
