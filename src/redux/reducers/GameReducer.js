import {GET_GAMES, GET_SINGLE_GAME, CLEAR_GAME_DATA, GET_MY_SINGLE_GAME, GET_MY_GAMES, GAME_UPDATE, CREATE_GAME_UPDATE} from './../actions/Types';

const INITIAL_STATE = {
    games: [],
    singleGame: {},
    myGames: [],
    createdGameId: null,
    mySingleGame: {},
    change: false,
    edit: false,
    creatingGame: {
        category: '',
        description: '',
        minimum_stake: '',
        start_time: '',
        stake_end_time: '',
        completion_time: '',
        sides: [{name: '', description: '', icon: null}, {name: '', description: '', icon: null}],
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CREATE_GAME_UPDATE:
            
            let {creatingGame} = state;
            let newCreateGame = {...creatingGame, [action.payload.prop]: action.payload.value}
            return { ...state, creatingGame: newCreateGame, change: !state.change };

        case GAME_UPDATE:
            
            return { ...state, [action.payload.prop]: action.payload.value, change: !state.change };

        case GET_GAMES:
            
            return { ...state, games: action.payload };

        case GET_SINGLE_GAME:
            
            return { ...state, singleGame: action.payload };

        case GET_MY_SINGLE_GAME:
            
            return { ...state, mySingleGame: action.payload };

        case GET_MY_GAMES:
            
            return { ...state, myGames: action.payload };

        case CLEAR_GAME_DATA:
               let defaultData = {
                    category: '',
                    description: '',
                    minimum_stake: '',
                    start_time: '',
                    stake_end_time: '',
                    completion_time: '',
                    sides: [{name: '', description: '', icon: null}, {name: '', description: '', icon: null}],
                }
            return { ...state, creatingGame: defaultData };

        default:
            return state;
    }
};
