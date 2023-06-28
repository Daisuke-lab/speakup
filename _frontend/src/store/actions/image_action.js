import * as actionType from './actionType'
import axios from 'axios'

export const image_receive = (profile_id) => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile/image/${profile_id}/`)
        console.log('images::',res.data)
        dispatch({
            type: actionType.IMAGE_RECEIVE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: actionType.IMAGE_RECEIVE_FAIL
        })
        dispatch({
            type: actionType.ERROR,
            // payload: err
        })
    }
}


export const image_create = (id, profile_id, image, x, y, width, height) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }

        const formData = new FormData();
        formData.append('image', image)
        formData.append('x', x)
        formData.append('y', y)
        formData.append('width', width)
        formData.append('height', height)
        formData.append('album', profile_id)

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/profile/image/`, formData, config)
        dispatch({
            type: actionType.IMGAE_CREATE_SUCCESS,
            payload: res.data
        })
        dispatch(image_receive(profile_id))
    } catch(err) {
        if (err.response === undefined) {
            dispatch({
                type: actionType.IMGAE_CREATE_SUCCESS
            })
            dispatch(image_receive(profile_id))
        } else {
        dispatch({
            type: actionType.IMAGE_CREATE_FAIL
        })

        dispatch({
            type: actionType.ERROR,
            paylaod: err.response
        })
    }
    }
}

export const image_delete = (profile_id, image_id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/profile/image/${image_id}/`)
        dispatch({
            type: actionType.IMAGE_DELETE_SUCCESS
        })
        dispatch(image_receive(profile_id))
    } catch(err) {
        dispatch({
            type: actionType.IMAGE_DELETE_FAIL
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.response
        })
    }
}
