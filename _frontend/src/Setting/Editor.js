import React, { useState }from 'react'
import {Link, Redirect } from 'react-router-dom'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core';
import ImagesBox from './ImagesBox'
import * as profile_actions from '../store/actions/profile_action';
import { connect } from 'react-redux'
import '../assets/Setting/Editor.css'



function Editor(props) {
    const [profileUpdated, setProfileUpdated] = useState(false)
    const [formData, setFormData] = useState({
        profile_id: props.profile_id,
        name: props.name,
        gender: props.gender,
        age: props.age,
        native_lan: props.native_lan,
        foreign_lan: props.foreign_lan,
        location: props.location,
        time_start: props.time_start,
        time_end: props.time_end,
        intro: props.intro,
        freeday: props.freeday 
    })


    const languages = ['Arabic','Bengali','Burmese','Chinese','English','French','German','Gujarati','Hindi','Italian','Japanese','Kannada','Korean','Malayalam',
    'Marathi','Oriya','Panjabi','Persian','Polish','Portuguese','Russian','Spanish','Tamil','Telugu','Thai','Turkish','Ukrainian','Urdu','Vietnamese']

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const genders = ['Male', 'Female', 'Other']

    const {profile_id, name, age, gender, native_lan, foreign_lan, location, time_start, time_end, intro, freeday} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    function time() {
        var time_range = null
        time_start !== '' || time_end !== '' ?
        time_range = <>{time_start}~{time_end}</>
        :  time_range = (<></>)
        return time_range
    }

    function Freedayset() {
        console.log(freeday)
        var freetime = null
        freeday !== '' ?
        freetime = <>freeday: {freeday}</>
        :
        freetime = null
        return freetime
      }

    const onSubmit = e =>{
    e.preventDefault()
    props.update(profile_id, name, age, gender, native_lan, foreign_lan,  location, time_start, time_end, intro, freeday, props.token)
    setProfileUpdated(true)
    }
    if (profileUpdated) {
        return <Redirect to='/setting'/>
    }


    return (
        <div className='edit'>
        <div className='edit_header'>
                <Link to='/setting'>
                    <IconButton style={{outline: 'none'}}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </Link>
        </div>
        <div className='edit_setting'>
                    <form className='edit_form' onSubmit={onSubmit} encType='multipart/form-data'>
                    <div className='edit_container'> 
                    <h1>Your Profile</h1>
                    <ImagesBox images={props.images}/>
                            <input placeholder='name' type='text' name='name' value={name} className='edit_input' id='edit_name' onChange={onChange}/>
                            <input placeholder='age' type="number" name='age' value={parseInt(age)} className='edit_input' onChange={onChange}/>
                            <select className='edit_select' name='gender' onChange={onChange}>
                                <option hidden>gender</option>
                                {genders.map((sex) => {
                                    if (sex===gender) {
                                        return <option selected value={sex}>{sex}</option>
                                    } else {
                                    return <option value={sex}>{sex}</option>
                                    }
                                })}
                            </select>
                            <select className='edit_select' name='native_lan' onChange={onChange} required>
                                <option hidden>You speak...</option>
                                {languages.map((language) => {
                                    if (language===native_lan) {
                                        return <option selected value={language}>{language}</option>
                                    } else {
                                    return <option value={language}>{language}</option>
                                    }
                                })}
                            </select>
                            <select className='edit_select' name='foreign_lan' onChange={onChange} required>
                                <option hidden>You want to learn ...</option>
                                {languages.map((language) => {
                                    if (language===foreign_lan) {
                                        return <option selected value={language}>{language}</option>
                                    } else {
                                    return <option value={language}>{language}</option>
                                    }
                                })}
                            </select>

                            <select className='edit_select' name='freeday' onChange={onChange}>
                                <option hidden>You are free on ...</option>
                                {days.map((day) => {
                                    if (day===freeday) {
                                        return <option selected value={day}>{day}</option>
                                    } else {
                                    return <option value={day}>{day}</option>
                                    }
                                })}
                            </select>
                            <div className='edit_time'>
                            <input type='time' className='edit_input_time' name='time_start' value={time_start} onChange={onChange}/>
                            ~
                            <input type='time' className='edit_input_time' name='time_end' value={time_end} onChange={onChange}/>
                            </div>
                            <textarea placeholder='Write your profile message here!' name='intro' value={intro} type='text' className='edit_input' onChange={onChange}/>
                            </div>
                            <button className='edit_button' type='submit'><span>SAVE</span></button>
                        </form>
        </div>
        </div>
    );
}


const mapstateToProps = state => {
    return {
        profile_id: state.profile_reducer.profile_id,
        name: state.profile_reducer.name,
        gender: state.profile_reducer.gender,
        age: state.profile_reducer.age,
        native_lan: state.profile_reducer.native_lan,
        foreign_lan: state.profile_reducer.foreign_lan,
        images: state.image_reducer.images,
        location: state.profile_reducer.location,
        time_start: state.profile_reducer.time_start,
        time_end: state.profile_reducer.time_end,
        intro: state.profile_reducer.intro,
        freeday: state.profile_reducer.freeday,
        token : state.auth_reducer.access
    
    }
  }
  


const mapDispatchToProps = dispatch => {
    return {
        update : (account_id, name, age, gender, native_lan, foreign_lan, location, time_start, time_end, intro, freeday) => 
        dispatch(profile_actions.Update(account_id, name, age, gender, native_lan, foreign_lan, location, time_start, time_end, intro, freeday))
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(Editor);