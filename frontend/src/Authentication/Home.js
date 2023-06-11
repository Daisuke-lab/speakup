import React, {useEffect, useState}from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import image from '../assets/home_page4.jpg'
import SpaIcon from '@material-ui/icons/Spa';
import '../assets/Authentication/Home.css'
import { Default } from 'react-spinners-css';
import * as auth_actions from '../store/actions/auth_action'
import * as profile_actions from '../store/actions/profile_action'
import * as swipe_actions from '../store/actions/swipe_action'
import * as contact_actions from '../store/actions/contact_action'
import * as image_actions from '../store/actions/image_action'
const Home = (props) => {
    var Background
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false)
    if (window.innerWidth > 650) {
        Background = {
            width: '100%',
            height: '800px',
            backgroundSize: 'cover',
            backgroundImage: `url(${image})`
        }
    } else {
        Background = {
            width: '100%',
            height: '800px',
            backgroundSize: 'cover',
            backgroundColor: '#ec7878'
        }
    }

    useEffect(() => {
        props.remove_error()
        props.back_to_home()
        console.log(process.env.REACT_APP_API_URL)
    }, [])

    const onSubmit = e => {
        console.log('it is workiing')
        e.preventDefault()
        setLoading(true)
        props.login('speakup.example@gmail.com', 'abc123xyz')
    }
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
    
  //props.contact_id && props.profile_id && props.swipe_id
    if (props.images !== null) {
        return <Redirect to='/swipe'/>
    }

    return (
        <div style={Background} className='home'>
            <div className='home_title'><SpaIcon id='home_logo'/><h1>Speak Up</h1></div>
            <h1 className={window.innerWidth > 650?'home_intro':'home_intro2'}>
                Find Your Language Exchange Partner!!</h1>
            <Link to='/login'>
            <button className='home_button1' onFocus="this.blur();"><span>Sign In</span></button>
            </Link>
            <Link to='/signup'>
            <button className='home_button2' onFocus="this.blur();"><span>Sign Up</span></button>
            </Link>
            <button className='home_button3' onFocus="this.blur();" onClick={onSubmit}><span>Demo</span></button>
            <div style={{textAlign: 'center'}}>
            {loading?
            <Default color="aqua"/>
            :<></>
                }
        </div>
        <p style={{color: "yellow", textAlign: 'center', fontSize:'25px'}}>{props.activation}</p>
        </div>
    )
}

const mapstateToProps = state => {
    return {
        activation: state.auth_reducer.activation,
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
        remove_error: () => dispatch(auth_actions.remove_error()),
        back_to_home: () => dispatch(auth_actions.back_to_home()),
        receive_profile : (id) => dispatch(profile_actions.Receive(id)),
        receive_swipe: (id) => dispatch(swipe_actions.Receive(id)),
        receive_contact: (id) => dispatch(contact_actions.Receive(id)),
        image_receive: (profile_id) => dispatch(image_actions.image_receive(profile_id))
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Home)