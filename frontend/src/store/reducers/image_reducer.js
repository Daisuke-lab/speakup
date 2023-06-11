import * as actionType from '../actions/actionType'


const initialState = {
    images: localStorage.getItem('images')!== undefined ? JSON.parse(localStorage.getItem('images')): undefined,
}


export default function image_reducer(state=initialState, action) {
    const {type, payload} = action

    switch(type) {
        case actionType.IMGAE_CREATE_SUCCESS:
            return {
                ...state,
            }
        case actionType.IMAGE_RECEIVE_SUCCESS:
            localStorage.setItem('images', JSON.stringify(payload.images))
            return {
                ...state,
                images: [...payload.images]
            }
        case actionType.IMAGE_CREATE_FAIL:
        case actionType.IMAGE_DELETE_FAIL:
        case actionType.IMAGE_RECEIVE_FAIL:
        case actionType.IMAGE_DELETE_SUCCESS:
            return {
                ...state
            }
        case actionType.LOG_OUT:
        case actionType.DELETE_ACCOUNT_SUCCESS:
            localStorage.removeItem('images')
            return {
                ...state,
                images: null
            }

        default:
            return {
                ...state
            }
    }

}