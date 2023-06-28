import { connect } from 'react-redux'
import WebSocketInstance from './WebSocket.js'
import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SpaIcon from '@material-ui/icons/Spa';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import GetAppIcon from '@material-ui/icons/GetApp';
import { IconButton } from '@material-ui/core';
import {Link} from 'react-router-dom'
import '../assets/Chat/Chat.css'
import {sendMessageHandler, initializeChat} from './MessageHandler'
import * as chat_actions from '../store/actions/chat_action'
import FriendProfile from './FriendProfile'
import { time_orderer } from "./TimeHandler";
import VideocamIcon from '@material-ui/icons/Videocam';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';




function ChatScreen(props) {
    const [text, setText] = useState('')
    const [popup, setPopup] = useState(false)
    const [sendingImages, setSendingImages] = useState([])
    const [sendingFiles, setSendingFiles] = useState([])
    const [input, setInput] = useState('')
    const [allContents, setAllContents] = useState([])
    const [quality, setQuality] = useState(12);

    useEffect(() => {
        console.log(props.ChatID)
        initializeChat(props, WebSocketInstance)
        WebSocketInstance.connect(props.ChatID)
        setAllContents(...allContents, ...time_orderer(props.files, props.messages))
    }, [props.ChatID])

    function getBase64(file, cb) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        }; 
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    let idCardBase64 = '';
    const image_handler = (e) => {
        getBase64(e.target.files[0], (result) => {
            idCardBase64 = result;
            setSendingImages([...sendingImages,{'name':e.target.files[0].name, 'file':idCardBase64}])
        });
    }

    const file_handler = (e) => {
        getBase64(e.target.files[0], (result) => {
            idCardBase64 = result;
            setSendingFiles([...sendingFiles,{'name':e.target.files[0].name, 'file':idCardBase64}])
        });
    }

    const handleJoin = () => {

        axios.get(`${process.env.REACT_APP_VIDEO_URL}/join`).then(res => {
            let video_link = `${props.name} is calling you \n
  
             ${window.location.origin}/join/${res.data.link}`
            setSendingImages([])
            setSendingFiles([])
            sendMessageHandler(WebSocketInstance, props, video_link, sendingImages, sendingFiles)
            //props.history?.push(`/join/${res.data.link}`);
        })
    }



    const onSubmit = e => {
        e.preventDefault()
        if (text.length > 0 || sendingImages.length > 0 || sendingFiles.length > 0) {
            sendMessageHandler(WebSocketInstance, props, text, sendingImages, sendingFiles)
            console.log('submitted')
        }
        setText('')
        setSendingImages([])
        setSendingFiles([])
    }

    function onOpen() {
        setPopup(true)
    }
    function onClose() {
        setPopup(false)
    }

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onClick = (url) => {
        let link=document.createElement('a');
        link.download=url.content;
        link.click();
}

    const download = (content) => {
        const res = axios.get(`${process.env.REACT_APP_API_URL}/chat-api/file/download/${content.id}/`)
    };

    const video_path = '/video/' + uuidv4()

    return (
        <div className='chatScreen'>
            <header className='chatScreen_header'>
                <Link to='/chatpanel'>
                    <IconButton id='chatScreen_header_back_icon'>
                        <ArrowBackIosIcon style={{fontSize: '30px'}}/>
                    </IconButton>
                </Link>
                <IconButton id='chatScreen_header_video_icon' onClick={handleJoin}>
                        <VideocamIcon style={{fontSize: '30px', marigin: '10px'}}/>
                </IconButton>
            </header>
            <div style={{position:'sticky', top:'30%', zIndex:0}}>
            <SpaIcon id='chatScreen_logo'/>
            </div>
            <FriendProfile onClose={onClose} popup={popup} friend_profile_id={props.friend_profile_id}/>
            <div style={{textAlign: 'center'}}>
            <p1 className='chatScreen_match'>YOU MATCHED WITH {props.friend} ON {props.when_matched}</p1>
            </div>
            <ul className='chatScreen_messages'>
            {props.contents.map(content => {
            if (content.name === props.name) {
                if (content.file_name !== undefined) {
                    if (content.file_name.includes('jpg', 'jpeg', 'png')) {  //my image file
                        return (
                            <div className='chatScreen_message_sent'>
                                <div className='chatScreen_download_sent'>
                                <IconButton style={{outline:'none'}} onClick={e => download(content)} >
                                <GetAppIcon/>
                                </IconButton>
                                </div>
                                <img src={content.content}/>
                            </div>
                        )
                    } else {                                                 // my other files
                        return (
                            <div className='chatScreen_message_sent'>
                                <div className='chatScreen_file_sent'>
                                <InsertDriveFileIcon className='chatScreen_file_icon'/>
                                <p2>{content.file_name}</p2>
                                <IconButton style={{outline:'none'}} onClick={e => download(content)} >
                                <GetAppIcon/>
                                </IconButton>
                                </div>
                            </div>
                        )
                    }
                } else {                                               // my messages
                    return (
                        <div className='chatScreen_message_sent'>
                        <p className='chatScreen_sent'>{content.content}<br/>
                        <small>
                        {content.timestamp.substring(0,16)}
                         </small></p>
                        </div>
                        )
                }
            } else {
                if (content.file_name !== undefined) {
                    if (content.file_name.includes('jpg', 'jpeg', 'png')) {  //your image file
                        return (
                            <div className='chatScreen_message_reply'>
                                <Avatar className='chatScreen_image'
                                alt={content.name} src={props.friend_image} onClick={onOpen}/>
                            <div className='chatScreen_text'>
                                <img src={content.content}/>
                                <div className='chatScreen_download_reply'>
                                <IconButton style={{outline:'none'}} onClick={e => download(content)} >
                                <GetAppIcon/>
                                </IconButton>
                                </div>
                            </div>
                            </div>
                        )
                    } else {                                                 // your other files
                        return (
                            <div className='chatScreen_message_reply'>
                                <Avatar className='chatScreen_image'
                                alt={content.name} src={props.friend_image} onClick={onOpen}/>
                            <div className='chatScreen_text'>
                                <div className='chatScreen_file_reply'>
                                <InsertDriveFileIcon className='chatScreen_file_icon'/>
                                <p2>{content.file_name}</p2>
                                <IconButton style={{outline:'none'}} onClick={e => download(content)} >
                                <GetAppIcon/>
                                </IconButton>
                                </div>
                            </div>
                            </div>
                        )
                    }
                } else {                                                   // your messages
                    return (
                        <div className='chatScreen_message_reply'>
                        <Avatar className='chatScreen_image'
                        alt={content.name} src={props.friend_image} onClick={onOpen}/>
                        <div className='chatScreen_text'>
                        <p className='chatScreen_reply'>{content.content}<br/>
                        <small>
                        {content.timestamp.substring(0,16)}
                        </small></p>
                    </div>
                    </div>
                    )
                }
            }
        })}
            </ul>

        <div>
            <form className='chatScreen_input' onSubmit={onSubmit}>
                <label for="file-upload" class="custom-file-upload" style={{marginTop: 'auto'}}>
                    <AttachFileIcon/>
                </label>
                <input type='file' name='image' accept="audio/*, .pdf, .txt, .gif, .docx, .xlsx, .pptx, .pps" size="60"
                id="file-upload" onChange={file_handler}/>

                
                <label for="image-upload" class="custom-file-upload" style={{marginTop: 'auto'}}>
                    <ImageIcon/>
                </label>
                <div className='chatScreen_input_field' style={sendingImages.length>0?{border:'solid aqua'}:{}}>
                    {sendingFiles.length>0? sendingFiles.map(file =>
                        <div className='chatScreen_file_outer'>
                            <InsertDriveFileIcon className='chatScreen_file_icon'/>
                            <p1>{file.name}</p1>
                            
                </div>):<></>}
                    {sendingImages.length > 0? sendingImages.map(image => <img src={image.file}/>):<></>}
                    <input type='file' name='image' accept="image/*, video/*" size="60"
                    id="image-upload" onChange={image_handler}/>
                    <TextareaAutosize className='chatScreen_input_text' rowsMax={4} placeholder="Message" onChange={onChange}/>
                </div>
                <button className='chatScreen_submit' type='submit'>SEND</button>
            </form>
        </div>
    </div>
    )
}

const mapstateToProps = (state, objects) => {
    return {
        name: state.auth_reducer.name,
        ChatID: objects.match.params.ChatID,
        friend: objects.match.params.friend,
        friend_image: state.chat_reducer.friend_image,
        when_matched: state.chat_reducer.when_matched,
        friend_profile_id: state.chat_reducer.friend_profile_id,
        messages: state.chat_reducer.messages,
        files: state.chat_reducer.files,
        contents: time_orderer(state.chat_reducer.files, state.chat_reducer.messages)

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetch_messages: (messages) => dispatch(chat_actions.setMessages(messages)),
        new_message: (message) => dispatch(chat_actions.addMessage(message))
    }
}


export default connect(mapstateToProps, mapDispatchToProps)(ChatScreen)
