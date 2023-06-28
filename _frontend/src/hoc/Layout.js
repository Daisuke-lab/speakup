import React, {useEffect }from 'react'
import { connect } from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'
import { Redirect } from 'react-router-dom'
const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated()
        props.load_user()
    }, [])
    if (props.isAuthenticated) {
    return (
    <div>
        {props.children}
    </div>
    )
    } else {
        return <Redirect to='/'/>
    }
}


const mapstateToProps = state => {
    return {
    isAuthenticated: state.auth_reducer.isAuthenticated
}
}
const mapDispatchToProps = dispatch => {
    return {
        checkAuthenticated: () => dispatch(auth_actions.checkAuthenticated()),
        load_user: () => dispatch(auth_actions.load_user())
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(Layout)