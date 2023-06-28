import React, { useState }from 'react'
import {Link, Redirect } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import {connect} from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'
import '../assets/Authentication/PasswordResetConfirm.css'
const PasswordResetConfirm = (props) => {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        new_password:'',
        re_new_password:''
    })
    console.log('token::', props.token)
    const {new_password, re_new_password} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        const uid = props.uid
        const token = props.token
        props.reset_password_confirm(uid, token, new_password, re_new_password)
        setRequestSent(true)
    }
    if (requestSent) {
        return <Redirect to='/'/>
    }
    return (
    <div className='password_reset_confirm'>
        <header className='passowrd_reset_confirm_header'>
            <Link to='/login'>
            <IconButton id='password_reset_confirm_back'>
                <ArrowBackIosIcon style={{fontSize: '30px'}}/>
            </IconButton>
            </Link>
        </header>
        <div className='password_reset_confirm_content'>
        <h1>Request Password Reset</h1>
        <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                <input 
                className='password_reset_confirm_input'
                type='password'
                placeholder='New Pasword'
                name='new_password'
                value={new_password}
                onChange={e => onChange(e)}
                required/>
            </div>
            <div className='form-group'>
                <input 
                className='password_reset_confirm_input'
                type='password'
                placeholder='Confirm New Password'
                name='re_new_password'
                value={re_new_password}
                onChange={e => onChange(e)}
                required/>
            </div>
            <button className='password_reset_confirm_button' type='submit'>Confirm Password Reset </button>
        </form>
        </div>
    </div>
    )
}

const mapstateToProps = (state, objects) => {
    return {
        uid: objects.match.params.uid,
        token: objects.match.params.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reset_password_confirm: (uid, token, new_password, re_new_password) => dispatch(auth_actions.reset_password_confirm(uid, token, new_password, re_new_password),)
    }
}



export default connect(mapstateToProps, mapDispatchToProps)(PasswordResetConfirm)