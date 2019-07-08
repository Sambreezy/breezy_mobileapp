import {CHAT_UPDATE, GET_CHAT, APPEND_LAST_MESSAGE} from './../actions/Types';
import moment from 'moment';
import _ from 'lodash';

const INITIAL_STATE = {
    currentChatId: 0,
    currentChatHistory: [],
    currentChatFriend: {},
    stateChanged: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CHAT_UPDATE:

            return { ...state, [action.payload.prop]: action.payload.value };

        case GET_CHAT:
            let sortedHistory = _.sortBy(action.payload, ['created_at']);
            return {...state, currentChatHistory: sortedHistory}

        case APPEND_LAST_MESSAGE:
            let currentChatHistory = state.currentChatHistory;
            currentChatHistory.push({
                id: 0,
                chat_id: action.payload.chat_id,
                user: {id: action.payload.user_id},
                text: action.payload.text,
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
            })
            console.log(currentChatHistory, "reducer");
            return {...state, currentChatHistory, stateChanged: !state.stateChanged}

        default:
            return state;
    }
};
