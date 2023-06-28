import * as actionType from '../actions/actionType'

function null_handler(object) {
    var new_object
    if (object === 'null' || object === null) {
        new_object = ''
    } else {
        new_object = object
    }
    return new_object
}

const initialState = {
    profile_id: localStorage.getItem('profile_id'),
    name: localStorage.getItem('name'),
    age: localStorage.getItem('age'),
    gender: localStorage.getItem('gender'),
    native_lan:  localStorage.getItem('native_lan'),
    foreign_lan: localStorage.getItem('foreign_lan'),
    images:localStorage.getItem('profile_images')!== undefined?JSON.parse(localStorage.getItem('profile_images')):undefined,
    location: localStorage.getItem('location'),
    time_start: (localStorage.getItem('time_start') !== 'null'? localStorage.getItem('time_start'): ''),
    time_end: null_handler(localStorage.getItem('time_end')),
    intro: (localStorage.getItem('intro') !=='null'? localStorage.getItem('intro'): ''),
    freeday: (localStorage.getItem('freeday') !=='null'? localStorage.getItem('freeday'): ''),
}

// it is not receive to setitem, but create isn't it
// but you do so, you need to set when you update it
function profile_reducer(state=initialState, action) {
    const {type, payload} = action

    switch(type) {
        case actionType.PROFILE_RECEIVE_SUCCESS:
        case actionType.PROFILE_UPDATE_SUCCESS:
            var image_path
            if (null_handler(payload.image) !== '') {
                //`${process.env.REACT_APP_API_URL}${payload.image}`
                image_path = payload.image
            } else {
                image_path = ''
            }
            localStorage.setItem('profile_id', payload.id)
            localStorage.setItem('name', payload.name)
            localStorage.setItem('age', payload.age)
            localStorage.setItem('gender', payload.gender)
            localStorage.setItem('native_lan', payload.native_lan)
            localStorage.setItem('foreign_lan', payload.foreign_lan)
            localStorage.setItem('profile_images', JSON.stringify(payload.images))
            localStorage.setItem('location', payload.location)
            localStorage.setItem('time_start', payload.time_start)
            localStorage.setItem('time_end', payload.time_end)
            localStorage.setItem('intro', payload.intro)
            localStorage.setItem('freeday', payload.freeday)
            return {
                ...state,
                profile_id: payload.id,
                name: payload.name,
                age: payload.age,
                gender: payload.geder,
                native_lan:  payload.native_lan,
                foreign_lan: payload.foreign_lan,
                images:payload.images,
                location: payload.location,
                time_start: null_handler(payload.time_start),
                time_end: null_handler(payload.time_end),
                intro: payload.intro,
                freeday: payload.freeday,
            }


        case actionType.PROFILE_DELETE_SUCCESS:
        case actionType.LOG_OUT:
        case actionType.DELETE_ACCOUNT_SUCCESS:
            localStorage.removeItem('profile_id')
            localStorage.removeItem('name')
            localStorage.removeItem('age')
            localStorage.removeItem('gender')
            localStorage.removeItem('native_lan')
            localStorage.removeItem('foreign_lan')
            localStorage.removeItem('profile_images')
            localStorage.removeItem('location')
            localStorage.removeItem('time_start')
            localStorage.removeItem('time_end')
            localStorage.removeItem('intro')
            localStorage.removeItem('freeday')
            return {
                ...state,
                profile_id: null,
                name: null,
                age: null,
                gender: null,
                native_lan:  null,
                foreign_lan: null,
                images:null,
                location: null,
                time_start: null,
                time_end:null,
                intro: null,
                freeday: null,

            }
            
        case actionType.PROFILE_CREATE_SUCCESS:
            return {
                ...state,
                profile_id: payload.id
            }

        case actionType.PROFILE_UPDATE_FAIL:
        case actionType.PROFILE_RECEIVE_FAIL:
        case actionType.PROFILE_DELETE_FAIL:
            return {
                ...state
            }

        case actionType.SWIPE_UPDATE_SUCCESS:
            return {
                ...state,
            }

        default:
            return {
                ...state
            }
    }
}

export default profile_reducer