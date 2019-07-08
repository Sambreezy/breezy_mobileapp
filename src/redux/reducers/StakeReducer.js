import {
   STAKE_UPDATE
} from './../actions/Types';

const INITIAL_STATE = {
    game: '',
    side: '',
    amount: '',
    pin: '',
    stakeSuccess: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case STAKE_UPDATE:
            
            return { ...state, [action.payload.prop]: action.payload.value };

        default:
            return state;
    }
};
