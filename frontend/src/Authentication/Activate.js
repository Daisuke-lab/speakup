import React, { useState }from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'

const Activate = (props) => {
    const [verified, setVerified] = useState(false)
    const verify_account = e => {
        console.log(props.uid, props.token)
        props.verify(props.uid, props.token)
        setVerified(true)
    }
    if (verified) {
        return <Redirect to='/'/>
    }
    return (
    <div className='eontainer mt-5'>
        <div className='d-flex flex-column justify-content-center align-items-center'
        style={{ marginTop: '200px'}}>
            <h1>Verify your account:</h1>
            <button onClick={verify_account}
            style={{marginTop: '50px'}}
            type='button'
            className='btn btn-primary'>Verify</button>
        </div>
    </div>
    )
}

const mapstateToProps = (state, objects) => {
    return {
    isAuthenticated: state.auth_reducer.isAuthenticated,
    uid: objects.match.params.uid,
    token: objects.match.params.token

}
}

const mapDispatchToProps = dispatch => {
    return {
        verify : (uid, token) => dispatch(auth_actions.verify(uid, token))
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(Activate)