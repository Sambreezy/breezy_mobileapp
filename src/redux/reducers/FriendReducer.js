import {GET_FRIENDS, GET_USERS, GET_FRIEND_REQUESTS, FRIEND_UPDATE} from './../actions/Types';

const INITIAL_STATE = {
    pendingRequests: [],
    friends: [],
    friendsId: [],
    users: [],
    requestSent: '',
    requestNotSent: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FRIEND_UPDATE:
            
            return { ...state, [action.payload.prop]: action.payload.value };

        case GET_FRIENDS:
            let friendsId = [];
            action.payload.map((item) => {
                friendsId.push(item.friend.id);
            });
            return { ...state, friends: action.payload, friendsId };

        case GET_USERS:
            
            return { ...state, users: action.payload };

        case GET_FRIEND_REQUESTS:
            
            return { ...state, pendingRequests: action.payload };

        default:
            return state;
    }
};
