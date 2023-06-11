import { combineReducers } from 'redux'
import auth_reducer from './auth_reducer'
import profile_reducer from './profile_reducer'
import swipe_reducer from './swipe_reducer'
import chat_reducer from './chat_reducer'
import contact_reducer from './contact_reducer'
import image_reducer from "./image_reducer";
export default combineReducers({
    auth_reducer,
    profile_reducer,
    swipe_reducer,
    chat_reducer,
    contact_reducer,
    image_reducer
})