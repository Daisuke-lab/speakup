import React, { useState }from 'react'
import {connect} from 'react-redux'
import {Link, Redirect } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import * as auth_actions from '../store/actions/auth_action'
import '../assets/Authentication/PasswordReset.css'
const PasswordReset = (props) => {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        email:'',
    })
    const {email} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        props.reset_password(email)
        setRequestSent(true)
    }
    if (requestSent) {
        return <Redirect to='/'/>
    }
    return (
    <div className='password_reset'>
        <header className='passowrd_reset_header'>
            <Link to='/login'>
            <IconButton id='password_reset_back'>
                <ArrowBackIosIcon style={{fontSize: '30px'}}/>
            </IconButton>
            </Link>
        </header>
        <div className='password_reset_content'>
        <h1>Request Password Reset</h1>
        <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                <input 
                className='password_reset_input'
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required/>
            </div>
            <button className='password_reset_button' type='submit'>Reset Password</button>
        </form>
        </div>
    </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        reset_password: (email) => dispatch(auth_actions.reset_password(email),)
    }
}



export default connect(null, mapDispatchToProps)(PasswordReset)