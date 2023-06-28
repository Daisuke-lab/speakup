import * as actionType from './actionType'
import axios from 'axios'

export const Create = (user) => async dispatch =>{
    console.log(JSON.stringify({user}))
    if (user != null) {
        try {
            const config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({user})
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/swipe/create/`, body, config)
            dispatch({
                type: actionType.SWIPE_CREATE_SUCCESS,
                payload: res.data
            })
        
        } catch(err) {
            dispatch({
                type: actionType.SWIPE_CREATE_FAIL,
                payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on swipe create'
            })
            dispatch({
                type: actionType.ERROR,
                payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on swipe create'})
        }
    } else {
        dispatch({
            type: actionType.SWIPE_CREATE_FAIL
        })
        dispatch({
            type: actionType.ERROR,
            payload: "An error occured. Please try again."})
    }

}

export const Receive = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/swipe/detail/${id}/`)
        dispatch({
            type: actionType.SWIPE_RECEIVE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: actionType.SWIPE_RECEIVE_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on swipe receive'
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on swipe receive'})
    }
}

export const Swipe = (swipe_id, swiped, liked) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        var body = null
        if (liked === null) {
            body = JSON.stringify({swiped})
        } else {
            body = JSON.stringify({swiped, liked})
        }
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/swipe/update/${swipe_id}/`, body, config)
        dispatch({
            type: actionType.SWIPE_UPDATE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: actionType.SWIPE_UPDATE_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on swipe swipe '
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on swipe swipe'})
    }
}

export const card_receive = () => async dispatch => {
    console.log('card_receive is called')
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile/list/`)
        console.log(JSON.stringify(res.data))
        dispatch({
            type: actionType.CARD_RECEIVE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on swipe card_receive'})
        dispatch({
            type: actionType.CARD_RECEIVE_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on swipe card_receive'})
    }
}