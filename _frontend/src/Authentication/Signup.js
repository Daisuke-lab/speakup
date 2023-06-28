import React, { useState, useEffect}from 'react'
import {Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'
import * as profile_actions from '../store/actions/profile_action'
import * as swipe_actions from '../store/actions/swipe_action'
import * as contact_actions from '../store/actions/contact_action'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SpaIcon from '@material-ui/icons/Spa';
import { IconButton, requirePropFactory } from '@material-ui/core';
import '../assets/Authentication/Signup.css'
// import Default from '@bit/joshk.react-spinners-css.default';
import { Default } from 'react-spinners-css';

const Signup = (props) => {
    const [accountCreated, setAccountCreated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password:'',
        re_password: '',
        native_lan: '',
        foreign_lan: ''
    })
    useEffect(() => {
        props.remove_error()
    }, [])

    const {name, email, password, re_password, native_lan, foreign_lan} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        setLoading(true)
        props.signup(name, email, password, re_password)
        props.remove_error()
        setAccountCreated(true)
    }

    const loading_handler = () => {
        console.log('loading_handler')
        if (props.error !== '' ) {
            setLoading(false)
        }
    }


    if (props.id && props.isAuthenticated && count===0) {
        setCount(1)
        props.profile_create(props.id, name, native_lan, foreign_lan)
    }

    if (props.profile_id && count===1) {
        setCount(2)
        props.swipe_create(props.id)
    }

    if (props.swipe_id && count===2) {
        setCount(3)
        props.contact_create(props.id)
    }

    if (props.error !== '' && loading===true) {
        setLoading(false)
    }
    
    


     

    const languages = ['Arabic','Bengali','Burmese','Chinese','English','French','German','Gujarati','Hindi','Italian','Japanese','Kannada','Korean','Malayalam',
'Marathi','Oriya','Panjabi','Persian','Polish','Portuguese','Russian','Spanish','Tamil','Telugu','Thai','Turkish','Ukrainian','Urdu','Vietnamese']
    if (props.isAuthenticated && props.contact_id && count===3) {
        return <Redirect to='/'/>
    }
    // if (props.id) {
    //     return <Redirect to='/'/>
    // }
    return (
    <div className='signup'>
        <header className='signup_header'>
            <Link to='/'>
            <IconButton id='signup_back'>
                <ArrowBackIosIcon/>
            </IconButton>
            </Link>
            <div className='signup_title'><SpaIcon id='signup_logo'/><h1>Speak Up</h1></div>
        </header>
        <form onSubmit={e => onSubmit(e)}>
            <div  className='signup_form'>
            <div className='col signup_form1'>
                <input className='signup_input' type='name' placeholder='Name*' name='name'
                value={name} onChange={e => onChange(e)} required/>
                <input className='signup_input' type='email'
                placeholder='Email*' name='email' value={email} onChange={e => onChange(e)} required/>
                <input className='signup_input' type='password' placeholder='Password*' name='password'
                value={password} onChange={e => onChange(e)} required/>
                <input className='signup_input' type='password' placeholder='Confirm Password*'
                name='re_password' value={re_password} onChange={e => onChange(e)} required/>
                </div>
                <div className='col signup_form2'>
                <div className='signup_lan'>
                    What language are you fluent in?
                <select className='signup_select' name='native_lan' required onChange={e => onChange(e)}>
                    <option hidden>You speak ...</option>
                    {languages.map((language) => {
                        return <option value={language}>{language}</option>
                    })}
                </select>
                </div>
                <div className='signup_lan'>
                    What do you want to learn?
                <select className='signup_select' name='foreign_lan' required onChange={e => onChange(e)}>
                    <option hidden>You want to learn ...</option>
                    {languages.map((language) => {
                        return <option value={language}>{language}</option>
                    })}
                </select>
                </div>
                </div>
                </div>
                <div className='signup_button'>
                        <button  onFocus="this.blur();" type='submit'><span>Sign Up</span></button>
                </div>
        </form>
        <p style={{textAlign: 'center'}}>
            Already have an account? <Link to='/login'>Log in</Link>
        </p>
        <p style={{color: "red", textAlign: 'center'}}>{props.error}</p>
        <div style={{textAlign: 'center'}}>
            {loading?
            <Default color="palevioletred"/>
            :<></>
                }
        </div>
    </div>
    )
}


const mapstateToProps = state => ({
    isAuthenticated: state.auth_reducer.isAuthenticated,
    id: state.auth_reducer.id,
    profile_id : state.profile_reducer.profile_id,
    contact_id: state.contact_reducer.contact_id,
    swipe_id: state.swipe_reducer.swipe_id,
    error: state.auth_reducer.error
})

const mapDispatchToProps = dispatch => {
    return {
        signup : (name, email, password, re_password) => dispatch(auth_actions.signup(name, email, password, re_password)),
        profile_create: (user, swipe, name, native_lan, foreign_lan) => dispatch(profile_actions.Create(user, swipe, name, native_lan, foreign_lan)),
        swipe_create: (profile) => dispatch(swipe_actions.Create(profile)),
        contact_create: (user) => dispatch(contact_actions.Create(user)),
        remove_error: () => dispatch(auth_actions.remove_error())

    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Signup)
