import * as actionType from '../actions/actionType'

const initialState = {
    swipe_id: localStorage.getItem('swipe_id'),
    cards: localStorage.getItem('cards') !== undefined?JSON.parse(localStorage.getItem('cards')):undefined,
    swiped: localStorage.getItem('swiped') !== undefined?JSON.parse(localStorage.getItem('swiped')):undefined,
    liked: localStorage.getItem('liked') !== undefined?JSON.parse(localStorage.getItem('liked')):undefined,
}

function swipe_reducer(state=initialState, action) {
    const {type, payload} = action

    switch(type) {
        case actionType.SWIPE_CREATE_SUCCESS:
        //localStorage.setItem('swipe_id', payload.id)
            return {
                ...state,
                swipe_id: payload.id
            }

        case actionType.SWIPE_RECEIVE_SUCCESS:
            localStorage.setItem('swipe_id', payload.id)
            localStorage.setItem('swiped', JSON.stringify(payload.swiped))
            localStorage.setItem('liked', JSON.stringify(payload.liked))
            //localStorage.setItem('card', [])
            return {
                ...state,
                swipe_id: payload.id,
                swiped: payload.swiped,
                liked: payload.liked,
               // cards: []
            }

        case actionType.SWIPE_CREATE_FAIL:
        case actionType.SWIPE_RECEIVE_FAIL:
        case actionType.CARD_RECEIVE_FAIL:
            return {
                ...state,
            }

        case actionType.LOG_OUT:
        case actionType.DELETE_ACCOUNT_SUCCESS:
            localStorage.removeItem('swipe_id')
            localStorage.removeItem('swiped')
            localStorage.removeItem('liked')
            localStorage.removeItem('cards')
            return {
                ...state
            }

        case actionType.CARD_RECEIVE_SUCCESS:
            localStorage.setItem('cards', JSON.stringify(payload))
            return {
                ...state,
                cards: payload
            }

        default:
            return {
                ...state
            }
    }
}


export default swipe_reducer

