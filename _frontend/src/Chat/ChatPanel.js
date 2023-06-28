import React, {useState}from 'react'
import Avatar from '@material-ui/core/Avatar';
import '../assets/Chat/ChatPanel.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as chat_actions from '../store/actions/chat_action'
import time_handler from './TimeHandler'
import FriendProfile from './FriendProfile'


function ChatPanel(props) {

    const link = `chat/${props.friend_data.name}/${props.friend_data.Chat_ID}/`
    function handleClick() {
        const matched_day = props.friend_data.when_matched.split('T')[0]
        props.set_friend(props.friend_data.image, matched_day, props.friend_data.profile_id)
    }
    const [popup, setPopup] = useState(false)

    function onOpen() {
        setPopup(true)
    }
    function onClose() {
        setPopup(false)
    }

    return (
        
        <div className='chatpanel'>
            <Avatar className='chatpanel_image' alt={props.friend_data.name}
            src={props.friend_data.image} onClick={onOpen}/>
            <Link to={link} onClick={handleClick} className='chatpanel_link'>
            <div className='chatpanel_detail'>
                <h2>{props.friend_data.name}</h2>
                <p>{props.friend_data.last_message}</p>
            </div>
            <p className='chatpanel_timestamp'>{time_handler(props.friend_data.last_timestamp)}</p>
            </Link>
            <FriendProfile onClose={setPopup} popup={popup} friend_profile_id={props.friend_data.profile_id}/>
        </div>
    )
}




const mapDispatchToProps = dispatch => {
    return {
        set_friend: (picture, when_matched, friend_profile_id) => 
        dispatch(chat_actions.set_friend(picture, when_matched, friend_profile_id))
    }
}

export default connect(null, mapDispatchToProps)(ChatPanel)
