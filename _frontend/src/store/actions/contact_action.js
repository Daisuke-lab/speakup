import * as actionType from './actionType'
import axios from 'axios' 

export const Create = (user) => async dispatch => {
    if (user != null) {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({user})
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/chat-api/contact/create/`, body, config)
            dispatch({
                type: actionType.CONTACT_CREATE_SUCCESS,
                payload: res.data
            })
        } catch(err) {
            dispatch({
                type: actionType.CONTACT_CREATE_FAIL,
                payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on contact create'
            })
            dispatch({
                type: actionType.ERROR,
                payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on contact create'})
            
        }
    } else {
        dispatch({
            type: actionType.CONTACT_CREATE_FAIL
        })
        dispatch({
            type: actionType.ERROR,
            paylaod:'An error occured. Please try again.' })
    }
}


export const Receive = (id) => async dispatch => {
    console.log('CONTACT')
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/chat-api/contact/detail/${id}/`)
        dispatch ({
            type: actionType.CONTACT_RECEIVE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type:actionType.CONTACT_RECEIVE_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on contact receive'
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on contact receive'
        })
    }
}

export const Update = (id, friend) => async dispatch => {
    try {
        const config = {
            headers: {'Content-Type': 'application/json',
        }}
        const body = JSON.stringify({friend})


        const res = await axios.put(`${process.env.REACT_APP_API_URL}/chat-api/contact/update/${id}/`, body, config)
        dispatch({
            type: actionType.CONTACT_UPDATE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: actionType.CONTACT_UPDATE_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on contact update'

        })
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on contact update'})
    }
}

export const Delete = (id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/profile/delete/${id}/`)
        dispatch({
            type: actionType.CONTACT_DELETE_SUCCESS,
        })
    } catch(err) {
        dispatch({
            type: actionType.CONTACT_DELETE_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on contact delete'
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on contact delete'})
    }
}
