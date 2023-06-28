import * as actionType from '../actions/actionType'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    name: localStorage.getItem('name'),
    id: localStorage.getItem('id'),
    error: '',
    activation: ''
}

function auth_reducer(state = initialState, action)  {
    const {type, payload} = action


    switch(type) {
        case actionType.LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                id: payload.id
            }

        
        case actionType.LOGIN_FAIL:
        case actionType.SIGNUP_FAIL:
        case actionType.LOG_OUT:
        case actionType.DELETE_ACCOUNT_SUCCESS:
            localStorage.removeItem('name')
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            localStorage.removeItem('id')
        
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                name: null,
                id: null  
            }
        
            
        case actionType.LOAD_USER_SUCCESS:
            localStorage.setItem('id', payload.id)
            localStorage.setItem('name', payload.name)
            return {
                ...state,
                name: payload.name,
                id: payload.id
            }
        
        case actionType.LOAD_USER_FAIL:
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                name: null,
                id: null
            }

        case actionType.AUTHENTICATED_SUCCESS:
            return {
                ...state,
                name: payload.name
            }
        
        case actionType.AUTEHNTICATED_FAIL:
            return {
                ...state,
                name: null,
                id: null
            }

        case actionType.SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                id: payload.id,
                activation: "Your account's been created successfully! Check your email and activate your account."

            }
        case actionType.PASSWORD_RESET_SUCCESS:
        case actionType.PASSWORD_RESET_FAIL:
        case actionType.PASSWORD_RESET_CONFIRM_SUCCESS:
        case actionType.PASSWORD_RESET_CONFIRM_FAIL:
        case actionType.ACTIVATION_FAIL:
        case actionType.ACTIVATION_SUCCESS:
        case actionType.DELETE_ACCOUNT_FAIL:
            return {
                ...state,
            }
        case actionType.ERROR:
            console.log('error', payload)
            return {
                ...state,
                error: payload
            }

        case actionType.REMOVE_ERROR:
            return {
                ...state,
                error: ''
            }

        case actionType.BACK_TO_HOME:
            return {
                ...state,
                isAuthenticated: null
            }
        default:
            return state
    }

}

export default auth_reducer
