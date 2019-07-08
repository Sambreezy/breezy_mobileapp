import axios from 'axios';
import config from './../config';

import { 
        GAMES_LOADING, GET_GAMES, SINGLE_GAME_LOADING, 
        GET_SINGLE_GAME, CREATE_GAME_LOADING,
        CREATE_GAME_ERROR, MY_SINGLE_GAME_LOADING,
        GET_MY_SINGLE_GAME, CREATE_GAME_ERROR_MESSAGE,
        GET_MY_GAMES,GAME_UPDATE, CREATE_GAME_UPDATE, CLEAR_GAME_DATA
     } from './Types';

import { Actions } from 'react-native-router-flux';


export const gameUpdate = (text) => {

    return {
        type: GAME_UPDATE,
        payload: text
    }
};

export const createGameUpdate = (payload) => {

    return {
        type: CREATE_GAME_UPDATE,
        payload
    }
};

export const getSingleGame = (id) => {
    return (dispatch) => {
       dispatch({
           type: SINGLE_GAME_LOADING,
           payload: true
       });
        axios.get(config.apiUrl+'game/'+id)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: SINGLE_GAME_LOADING,
                    payload: false
                });
                dispatch({
                    type: GET_SINGLE_GAME,
                    payload: res.data.data
                });
            }).catch(err => {
                dispatch({
                    type: SINGLE_GAME_LOADING,
                    payload: false
                });
                console.log(err.response);
            
                
            })
      
    }
};

export const getMySingleGame = (id) => {
    return (dispatch) => {
       dispatch({
           type: MY_SINGLE_GAME_LOADING,
           payload: true
       });
       dispatch({
        type: GET_MY_SINGLE_GAME,
        payload: {}
    });
        axios.get(config.apiUrl+'game/'+id)
            .then(res => {
               console.log(res.data);
                dispatch({
                    type: MY_SINGLE_GAME_LOADING,
                    payload: false
                });
                dispatch({
                    type: GET_MY_SINGLE_GAME,
                    payload: res.data.data
                });
            }).catch(err => {
                dispatch({
                    type: MY_SINGLE_GAME_LOADING,
                    payload: false
                });
                console.log(err.response);
            
                
            })
      
    }
};

export const getGames = () => {
    return (dispatch) => {
       dispatch({
           type: GAMES_LOADING,
           payload: true
       });
        axios.get(config.apiUrl+'game')
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: GAMES_LOADING,
                    payload: false
                });
                dispatch({
                    type: GET_GAMES,
                    payload: res.data.data
                });
            }).catch(err => {
                dispatch({
                    type: GAMES_LOADING,
                    payload: false
                });
                console.log(err.response);
            
                
            })
      
    }
};

export const getMyGames = () => {
    return (dispatch) => {
       dispatch({
           type: GAMES_LOADING,
           payload: true
       });
        axios.get(config.apiUrl+'user/games', {params: {type: 'created'}})
            .then(res => {
                console.log(res);
                dispatch({
                    type: GAMES_LOADING,
                    payload: false
                });
                dispatch({
                    type: GET_MY_GAMES,
                    payload: res.data.data
                });
                
            }).catch(err => {
                dispatch({
                    type: GAMES_LOADING,
                    payload: false
                });
                console.log(err.response);
            
                
            })
      
    }
};

export const createGame = (data) => {
    return (dispatch) => {
       dispatch({
           type: CREATE_GAME_LOADING,
           payload: true
       });
       dispatch({
            type: CREATE_GAME_ERROR,
            payload: {}
        });
        axios.post(config.apiUrl+'game', data)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: CREATE_GAME_LOADING,
                    payload: false
                });
                dispatch({
                    type: CLEAR_GAME_DATA
                })
                
                if(data.private){
                    dispatch(gameUpdate({prop: 'createdGameId', value: res.data.data.id}));
                    Actions.reset('addFriendsToGame');
                }else{
                    Actions.reset('gameCreated', {message: 'Game Created Successfully'});
                }
            }).catch(err => {
                dispatch({
                    type: CREATE_GAME_LOADING,
                    payload: false
                });

                if(err.response.status == 422){
                    dispatch({
                        type: CREATE_GAME_ERROR,
                        payload: err.response.data.errors
                    });
                }
                console.log(err.response);
            
                
            })
      
    }
};

export const addFriendsToGame = (game,data) => {
    return (dispatch) => {
       dispatch({
           type: CREATE_GAME_LOADING,
           payload: true
       });
       dispatch({
            type: CREATE_GAME_ERROR,
            payload: {}
        });
        axios.post(config.apiUrl+'game/'+game+'/players', data)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: CREATE_GAME_LOADING,
                    payload: false
                });
                
                Actions.reset('gameCreated', {message: 'Your game has been created, and notification has been sent to the friends you invited.'});
                
            }).catch(err => {
                dispatch({
                    type: CREATE_GAME_LOADING,
                    payload: false
                });

                if(err.response.status == 422){
                    dispatch({
                        type: CREATE_GAME_ERROR,
                        payload: err.response.data.errors
                    });
                }
                console.log(err.response);
            
                
            })
      
    }
};

export const clearGameEditError = () => {
    return (dispatch) => {
        dispatch({
            type: CREATE_GAME_ERROR,
            payload: {}
        });

        dispatch({
            type: CREATE_GAME_ERROR_MESSAGE,
            payload: ''
        });
    }
}

export const clearCreateGameError = () => {
    return (dispatch) => {
        dispatch({
            type: CREATE_GAME_ERROR,
            payload: {}
        });
    }
}


export const editGame = (id,data) => {
    console.log(id, data, 'Edit');
    return (dispatch) => {
       dispatch({
           type: CREATE_GAME_LOADING,
           payload: true
       });
       dispatch({
            type: CREATE_GAME_ERROR,
            payload: {}
        });
        data._method = 'put';
        axios.post(config.apiUrl+'game/'+id, data)
            .then(res => {
                console.log(res.data, 'game edited');
                dispatch({
                    type: CREATE_GAME_LOADING,
                    payload: false
                });
                dispatch({
                    type: CLEAR_GAME_DATA
                })
                Actions.reset('gameCreated', {message: 'Game Edited Successfully'});
                
            }).catch(err => {
                console.log(err.response);
            
                dispatch({
                    type: CREATE_GAME_LOADING,
                    payload: false
                });

                if(err.response.status == 422){
                    dispatch({
                        type: CREATE_GAME_ERROR,
                        payload: err.response.data.errors
                    });
                }
                if(err.response.status == 403){
                    dispatch({
                        type: CREATE_GAME_ERROR_MESSAGE,
                        payload: err.response.data.message
                    });
                }
                
                
            })
      
    }
};

export const clearSingleGame = () => {
    return (dispatch) => {
        dispatch({
            type: GET_SINGLE_GAME,
            payload: {}
        });
    }
};
