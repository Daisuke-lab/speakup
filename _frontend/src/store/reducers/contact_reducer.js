import * as actionType from '../actions/actionType'

const initialState = {
    contact_id: localStorage.getItem('contact_id')
}

function contact_reducer(state=initialState, action) {
    const {type, payload} = action

    switch(type) {
        case actionType.CONTACT_CREATE_SUCCESS:
            return {
                ...state,
                contact_id: payload.id
            }

        case actionType.CONTACT_CREATE_FAIL:
        case actionType.CONTACT_RECEIVE_FAIL:
            return {
                ...state
            }

        case actionType.CONTACT_RECEIVE_SUCCESS:
            localStorage.setItem('contact_id', payload.id)
            return {
                ...state,
                contact_id: payload.id
            }

        case actionType.LOG_OUT:
        case actionType.DELETE_ACCOUNT_SUCCESS:
            localStorage.removeItem('contact_id')
            return {
                ...state,
                contact_id:null
            }

        default:
            return {
                ...state
            }

    }
}

export default contact_reducer