import React, { useEffect, useState } from 'react'
import Header from '../Swipe/Header'
import Profile from './Profile'
import '../assets/Setting/Setting.css'
import {Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'
import Card from '../Swipe/Card'
import Default from 'react-spinners-css/dist/Default'

function Setting(props) {
    console.log(typeof props.id)

    const [logedOut, setLogedOut] = useState(false)
    const DeleteAccount = () => {
        if (Number(props.id) === 5) {
            props.logout()
            setLogedOut(true)
        } else {
            props.delete_account(props.id)
        }
    }

    if (logedOut) {
        return <Redirect to ='/'/>
    }
    return (
        <div>
            <Header/>
            <div id='setting_content' style={{justifyContent: 'space-evenly'}}>
            <Card data={props.person} images={props.images}/>
            <div className='Button'>
                <Link to='/edit'>
                <button className='setting_button1' onfocus="this.blur();"><span>Edit Your Profile</span></button>
                </Link>
                <Link to='/'>
                <button className='setting_button1' onfocus="this.blur();" onClick={props.logout}><span>Log Out</span></button>
                </Link>
            <button className='setting_button3' onfocus="this.blur();"onClick={DeleteAccount}><span>Delete Your Account</span></button>
            </div>
            </div>

            
        </div>
    )
}
const mapstateToProps = state => {
    return {
        id: state.auth_reducer.id,
        person: state.profile_reducer,
        images: state.image_reducer.images
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth_actions.logout()),
        delete_account: () => dispatch(auth_actions.delete_account())
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(Setting)


