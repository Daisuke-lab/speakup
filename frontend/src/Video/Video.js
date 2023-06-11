import React, {useRef, useState, useEffect} from 'react'
import '../assets/Chat/Video.css'
import createSocketConnectionInstance from './connection2'
import { connect } from 'react-redux'

function Video(props) {
    const handleDisconnect = () => {
        if (socketInstance.current) socketInstance.current.destroyConnection();
        props.history.push('/chatpanel')
    }

    let socketInstance = useRef(null);    
    useEffect(() => {
        startConnection();
    }, []);
    const startConnection = () => {
        const params = {quality: 12}
        socketInstance.current = createSocketConnectionInstance({
            params
        });
    }

    return (
        <div>
        <div id='room-container'></div>
        <button onClick={handleDisconnect}>Disconnect</button>
        </div>
    )
}

const mapStateToProps = (state, object) => {
    return {
        state: state,
        object: object,
        quality: object.location.search.split('=')[-1]
    }
}

export default connect(mapStateToProps,null)(Video)