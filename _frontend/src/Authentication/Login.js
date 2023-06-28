import React, { useState, useEffect, useRef }from 'react'
import {Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SpaIcon from '@material-ui/icons/Spa';
import { IconButton } from '@material-ui/core';
import * as auth_actions from '../store/actions/auth_action'
import * as profile_actions from '../store/actions/profile_action'
import * as swipe_actions from '../store/actions/swipe_action'
import * as contact_actions from '../store/actions/contact_action'
import * as image_actions from '../store/actions/image_action'
import '../assets/Authentication/Login.css'
// import Default from '@bit/joshk.react-spinners-css.default';
import { Default } from 'react-spinners-css';
const Login = (props) => {
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    useEffect(() => {
        props.remove_error()
    }, [])
    const {email, password} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        setLoading(true)
        props.login(email, password)
        props.remove_error()
        setCount(0)
    }
    //props.id && props.isAuthenticated
    if (props.id && count===0) {
        setCount(1)
        // props.receive_profile(props.id)
        // props.receive_swipe(props.id)
        props.receive_contact(props.id)   
    }
    if (props.contact_id && count===1) {
        setCount(2)
        props.receive_swipe(props.id)
    }

    if (props.swipe_id && count===2) {
        setCount(3)
        props.receive_profile(props.id)
    }

    if (props.profile_id && count===3) {
        setCount(4)
        props.image_receive(props.profile_id)
    }
    if (props.error !== '' && loading===true) {
        setLoading(false)
    }
    
  //props.contact_id && props.profile_id && props.swipe_id
    if (props.images !== null) {
        return <Redirect to='/swipe'/>
    }


    return (
    <div className='login'>
        <header className='login_header'>
            <Link to='/'>
            <IconButton id='login_back'>
                <ArrowBackIosIcon/>
            </IconButton>
            </Link>
            <div className='login_title'><SpaIcon id='login_logo'/><h1>Speak Up</h1></div>
        </header>
        <div className='login_form'>
        <form onSubmit={e => onSubmit(e)}>
                <input 
                className='login_input'
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required/>
                <input 
                className='login_input'
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                required/>
                <button className='login_button' type='submit'onfocus="this.blur();"><span>Log In</span></button>
        </form>
        <p className='mt-3'>
            Don't have an account? <Link to='/signup'>Sign up</Link>
        </p>
        <p className='mt-3'>
            Forget your password? <Link to='/reset_password'>Reset Password</Link>
        </p>
        <p style={{color: "red", textAlign: 'center'}}>{props.error}</p>
        </div>
        <div style={{textAlign: 'center'}}>
            {loading?
            <Default color="aqua"/>
            :<></>
                }
        </div>
    </div>
    )
}

const mapstateToProps = state => {
    return {
    isAuthenticated: state.auth_reducer.isAuthenticated,
    id: state.auth_reducer.id,
    error: state.auth_reducer.error,
    profile_id : state.profile_reducer.profile_id,
    contact_id: state.contact_reducer.contact_id,
    swipe_id: state.swipe_reducer.swipe_id,
    images: state.image_reducer.images

}
}

const mapDispatchToProps = dispatch => {
    return {
        login : (email, password) => dispatch(auth_actions.login(email, password)),
        receive_profile : (id) => dispatch(profile_actions.Receive(id)),
        receive_swipe: (id) => dispatch(swipe_actions.Receive(id)),
        receive_contact: (id) => dispatch(contact_actions.Receive(id)),
        remove_error: () => dispatch(auth_actions.remove_error()),
        image_receive: (profile_id) => dispatch(image_actions.image_receive(profile_id))
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Login)