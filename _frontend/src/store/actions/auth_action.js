import * as actionType from './actionType'
import axios from 'axios'
export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            // use shift and @ instead of shift and 7
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
            console.log('data in load::', res.data)
            dispatch({
                type: actionType.LOAD_USER_SUCCESS,
                payload: res.data})
        } catch (err) {
            dispatch({
                    type: actionType.LOAD_USER_FAIL,
                    payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth load_user'})
            }
    } else {
        dispatch({
            type: actionType.LOAD_USER_FAIL,
            payload: "An error occured. Please try again"})
    }
}
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)
        console.log(res.data)
        dispatch({
            type: actionType.LOGIN_SUCCESS,
            payload: res.data})

        dispatch(load_user())
    } catch (err) {
        dispatch({
            type: actionType.LOGIN_FAIL,
            payload: "Email or password is invalid."})
        dispatch({
            type: actionType.ERROR,
            payload: "Email or password is invalid."})
    }
}

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const body = JSON.stringify({ token: localStorage.getItem('access')})
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res !== 'token_not_valid') {
                dispatch({
                    type: actionType.AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: actionType.AUTEHNTICATED_FAIL})
                dispatch({
                    type: actionType.ERROR,
                    payload:'Token is not valid' })
        }
            
        } catch(err) {
            dispatch({
                type: actionType.AUTEHNTICATED_FAIL,
            })
            dispatch({
                type: actionType.ERROR,
                payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth checkAuthenticated'})
            
        }
        
    } else {
        dispatch({
            type: actionType.AUTEHNTICATED_FAIL,
            payload: 'An error occured. Please try again'
        })
        dispatch({
            type: actionType.ERROR,
            payload: 'An error occured. Please try again'})
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: actionType.LOG_OUT
    })
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config)
        dispatch({
            type: actionType.PASSWORD_RESET_SUCCESS,
            payload: res.data})

    } catch (err) {
        dispatch({
            type: actionType.PASSWORD_RESET_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth reset_password'})
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth reset_password'})
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({uid, token, new_password, re_new_password})
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config)
        dispatch({
            type: actionType.PASSWORD_RESET_CONFIRM_SUCCESS})
    } catch (err) {
        dispatch({
            type: actionType.PASSWORD_RESET_CONFIRM_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth reset_password_confirm'})

        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth reset_password_confirm'})
    }
}

export const signup = (name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password, re_password})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)
        //{name: "lol", email: "jeorgia.zr@gmail.com", id: 2}
        dispatch({
            type: actionType.SIGNUP_SUCCESS,
            payload: res.data})
        

    } catch (err) {
        console.log(err)
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth signup'})
        dispatch({
            type: actionType.SIGNUP_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth signup'})
    }

}

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({uid, token})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)
        dispatch({
            type: actionType.ACTIVATION_SUCCESS,
            payload: res.data})

    } catch (err) {
        dispatch({
            type: actionType.ACTIVATION_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth verify'})

        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth verify'})
        
    }
}

export const remove_error = () => dispatch => {
    dispatch({
        type: actionType.REMOVE_ERROR
    })
}

export const back_to_home = () => dispatch => {
    dispatch({
        type: actionType.BACK_TO_HOME
    })
}

export const delete_account = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({id})

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/auth/users/${id}`, config)
        //{name: "lol", email: "jeorgia.zr@gmail.com", id: 2}
        dispatch({
            type: actionType.DELETE_ACCOUNT_SUCCESS,
            payload: res.data})
        

    } catch (err) {
        console.log(err)
        dispatch({
            type: actionType.ERROR,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth delete_account'})
        dispatch({
            type: actionType.DELETE_ACCOUNT_FAIL,
            payload: err.reponse !== undefined?err.reponse.request.reponse:'error occured on auth delete_account'})
    }

}