import {
    TOGGLE_ADD_AMOUNT_MODAL, TOGGLE_WITHDRAW_MODAL, 
    TOGGLE_UPDATE_PROFILE_MODAL, TOGGLE_IMAGE_VIEW_MODAL,
    SET_IMAGE_IN_MODAL,TOGGLE_FRIEND_REQUEST_MODAL,
    SET_DATA_IN_FRIEND_REQUEST_MODAL,
    TOGGLE_CREATE_PIN_MODAL,
    TOGGLE_CHANGE_PIN_MODAL
} from './../actions/Types';
import { avatar } from '../../style';

const INITIAL_STATE = {
    addAmountModalVisible: false,
    withdrawModalVisible: false,
    updateProfileModalVisible: false,
    imageViewModalVisible: false,
    friendRequestModalVisible: false,
    createPinModalVisible: false,
    changePinModalVisible: false,
    currentImage: avatar,
    currentData: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case TOGGLE_ADD_AMOUNT_MODAL:
            
            return { ...state, addAmountModalVisible: action.payload };
        
        case TOGGLE_WITHDRAW_MODAL:
            
            return { ...state, withdrawModalVisible: action.payload };
        
        case TOGGLE_UPDATE_PROFILE_MODAL:
            
            return { ...state, updateProfileModalVisible: action.payload };
      
        case TOGGLE_IMAGE_VIEW_MODAL:
            
            return { ...state, imageViewModalVisible: action.payload };

        case TOGGLE_CREATE_PIN_MODAL:
            
            return { ...state, createPinModalVisible: action.payload };

        case TOGGLE_CHANGE_PIN_MODAL:
            
            return { ...state, changePinModalVisible: action.payload };
        
        
        case SET_IMAGE_IN_MODAL:
            
            return { ...state, currentImage: action.payload };
        
        case TOGGLE_FRIEND_REQUEST_MODAL:
            
            return { ...state, friendRequestModalVisible: action.payload };
        
        case SET_DATA_IN_FRIEND_REQUEST_MODAL:
            
            return { ...state, currentData: action.payload };
      

        default:
            return state;
    }
};
