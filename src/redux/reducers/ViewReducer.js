import {
    SWITCH_VIEW
} from './../actions/Types';

const INITIAL_STATE = {
    activeView: 1
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SWITCH_VIEW:
            return { ...state, activeView: action.payload };

        default:
            return state;
    }
};