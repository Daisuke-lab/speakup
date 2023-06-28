import * as actionType from './actionType'
import axios from 'axios'

export const Create = (user, friend) => async dispatch => {
    if (user != null) {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({participants: [user, friend]})
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/chat-api/chat/create/`, body, config)
            console.log(res.data)
            dispatch({
                type: actionType.CHAT_CREATE_SUCCESS,
                payload: res.data
            })
        } catch(err) {
            dispatch({
                type: actionType.CHAT_CREATE_FAIL,
                payload: err.response.request.response
            })
            dispatch({
                type: actionType.ERROR,
                payload: err.response.request.response})
        }
    } else {
        dispatch({
            type: actionType.CHAT_CREATE_FAIL,
            payload: 'An error occured. please try again.'
        })
        dispatch({
            type: actionType.ERROR,
            payload: 'An error occured. please try again.'})
    }
}

export const addMessage = content => async dispatch => {
    if (content[0].content.includes('s3')) {
        dispatch({
        type: actionType.CHAT_NEW_FILE_SUCCESS,
        payload: content
        })
    } else {
        dispatch({
            type: actionType.CHAT_NEW_MESSAGE_SUCCESS,
            payload: content
            });
    }
}
  
export const setMessages = contents => async dispatch => {
    if (contents.length > 0) {
        if (contents[0].content.includes('s3')) {
            dispatch({
            type: actionType.CHAT_FETCH_FILES_SUCCESS,
            payload: contents
            })
        } else {
            dispatch({
                type: actionType.CHAT_FETCH_MESSAGES_SUCCESS,
                payload: contents
                });
        }
    }
  };

export const set_friend = (image, when_matched, friend_profile_id) => async dispatch => {
    dispatch({
        type: actionType.SET_FRIEND,
        payload: {image, when_matched, friend_profile_id}
    })
}

export const send_first_message = (content, contact_id)  => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log('send_first_message')
        const body = {'contact':contact_id, content}
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/chat-api/message/create/`, body, config)
        console.log(JSON.stringify(res))
        const message_id = res.data.id
        const latest_chat_id = localStorage.getItem('latest_chat_id')
        const chat_body = {'messages':[message_id]}
        const chat_res = await axios.put(`${process.env.REACT_APP_API_URL}/chat-api/chat/detail/${latest_chat_id}/`, chat_body, config)
        dispatch({
            type: actionType.SEND_FIRST_MESSAGE_SUCCESS,
            payload: chat_res.data
        })
    } catch(err) {
        dispatch({
            type: actionType.SEND_FIRST_MESSAGE_FAIL,
            payload: err
        })
        dispatch({
            type: actionType.ERROR,
            payload: err
        })
    }
    
}
  

