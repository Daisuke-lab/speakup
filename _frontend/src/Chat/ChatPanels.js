import React, {useEffect, useState}from 'react'
import ChatPanel from './ChatPanel'
import Header from '../Swipe/Header'
import {connect } from 'react-redux'
import axios from 'axios'
function ChatPanels(props) {
    const [friends, setFriends] = useState([])
    useEffect(() => {
        axios.defaults.headers = {
            "Content-Type": 'application/json'
        }
        axios.get(`${process.env.REACT_APP_API_URL}/chat-api/chat/${props.id}/`)
        .then(res => {
            if (res.data.chats_list !== undefined && res.data.chats_list !== null ) {
                setFriends([...friends, ...res.data.chats_list])
            }
        }
        )},
         [])




    return (
        <div>
            {/* {console.log('friends::',friends[0].participants)} */}
            <Header/>
            <h1 className='chatpanel_title'>Messages</h1>
                <div className='chats'>
                    {friends.map(friend => (
                            <ChatPanel friend_data={friend}/>
                        )
                    )}
                    {friends.length === 0?<h2 className='chatpanel_nomatch'>You don't have any matches yet(´;ω;｀)
                    <br/>Let's Swipe!!</h2>:<></>}
                </div>
        </div>
    )
}
const mapstateToProps = state => {
    return {
        username: state.auth_reducer.name,
        id: state.auth_reducer.id
    }
}



export default connect(mapstateToProps, null)(ChatPanels)

//Authorization `Token ${token}


