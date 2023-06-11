import null_checker, * as actionType from './actionType'
import axios from 'axios'


export const Create = (user, name, native_lan, foreign_lan) => async dispatch => {
    if (user != null) {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({user, name, native_lan, foreign_lan})
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/profile/create/`, body, config)
            dispatch({
                type: actionType.PROFILE_CREATE_SUCCESS,
                payload: res.data
            })
        } catch(err) {
            dispatch({
                type: actionType.PROFILE_CREATE_FAIL,
                paylaod: err.reponse !== undefined?err.reponse.request.reponse:'error occured on profile create'
            })
            dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on profile create'})
        }
    } else {
        dispatch({
            type: actionType.PROFILE_CREATE_FAIL
        })
        dispatch({
            type: actionType.ERROR,
            payload: "An error occured. Please try again"})
    }
}


export const Receive = (id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile/detail/${id}/`)
        dispatch ({
            type: actionType.PROFILE_RECEIVE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type:actionType.PROFILE_RECEIVE_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on profile receive'
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on profile receive'})
    }
}

export const Update = (id, name, age, gender, native_lan, foreign_lan, location, time_start, time_end, intro, freeday, token) => async dispatch => {
    try {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }
        gender = null_checker(gender)
        location = null_checker(location)
        time_start = null_checker(time_start)
        time_end = null_checker(time_end)

        const body = JSON.stringify({name, age, gender, native_lan, foreign_lan, location, time_start,
             time_end, intro, freeday})
        
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/profile/update/${id}/`, body, config)
        dispatch({
            type: actionType.PROFILE_UPDATE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        console.log(err)
        dispatch({
            type: actionType.PROFILE_UPDATE_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on profile update'
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on profile update'})
    }
}

export const Delete = (id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/profile/delete/${id}/`)
        dispatch({
            type: actionType.PROFILE_DELETE_SUCCESS,
        })
    } catch(err) {
        dispatch({
            type: actionType.PROFILE_DELETE_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on profile delete'
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on profile delete'})
    }
}


