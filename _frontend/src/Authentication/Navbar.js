import { Link } from 'react-router-dom'
import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'
const Navbar = (props) => {
    const guestLinks = () => (
        <Fragment>
            <li class="nav-item active">
                <Link class="nav-link" to='/login'>Login</Link>
            </li>
            <li class="nav-item active">
                <Link class="nav-link" to='/signup'>Signup</Link>
            </li>
        </Fragment>
    )
    const authLinks = () => (
        <li class="nav-item active">
        <Link class="nav-link" to='/' onClick={props.logout}>Logout<span class="sr-only">(current)</span></Link>
    </li>
    )

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="/">Auth System</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item active">
            <Link class="nav-link" to='/'>Home<span class="sr-only">(current)</span></Link>
            </li>
            {props.isAuthenticated ? authLinks(): guestLinks()}  
            </ul>
        </div>
        </nav>
        )
    }

    const mapstateToProps = state => {
        return {
        isAuthenticated: state.auth_reducer.isAuthenticated
    }}

    const mapDispatchToProps = dispatch => {
        return {
            logout: () => dispatch(auth_actions.logout()),
        }
    }

export default connect(mapstateToProps, mapDispatchToProps)(Navbar)