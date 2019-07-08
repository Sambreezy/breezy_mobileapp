import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ErrorReducer from './ErrorReducer';
import LoadingReducer from './LoadingReducer';
import ViewReducer from './ViewReducer';
import TransactionReducer from './TransactionReducer';
import CategoryReducer from './CategoryReducer';
import StakeReducer from './StakeReducer';
import GameReducer from './GameReducer';
import NotificationReducer from './NotificationReducer';
import FriendReducer from './FriendReducer';
import GeneralReducer from './GeneralReducer';
import FundReducer from './FundReducer';
import ResetReducer from './ResetReducer';
import SettingReducer from './SettingReducer';
import ChatReducer from './ChatReducer';


export default combineReducers({
    auth: AuthReducer,
    errors: ErrorReducer,
    loading: LoadingReducer,
    view: ViewReducer,
    transaction: TransactionReducer,
    category: CategoryReducer,
    stake: StakeReducer,
    game: GameReducer,
    notification: NotificationReducer,
    friend: FriendReducer,
    general: GeneralReducer,
    fund: FundReducer,
    reset: ResetReducer,
    setting: SettingReducer,
    chat: ChatReducer
});