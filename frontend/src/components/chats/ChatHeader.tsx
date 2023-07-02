import { IconButton } from '@mui/material'
import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VideocamIcon from '@mui/icons-material/Videocam';
import MatchType from '../../../types/MatchType';
import { useSession } from 'next-auth/react';
import { dateFormatter } from '../../utils/formatter';

interface Props {
    match: MatchType
}
function ChatHeader(props:Props) {
    const {match} = props
    const {data:session} = useSession()
    const matchedUser = match.user1.user_id === session?.id ? match.user2 : match.user1
  return (
    <>
    <header className='chatScreen_header'>
        <IconButton id='chatScreen_header_back_icon'>
            <ArrowBackIosIcon style={{fontSize: '30px'}}/>
        </IconButton>
        <IconButton id='chatScreen_header_video_icon' onClick={() => console.log("clicked")}>
                <VideocamIcon style={{fontSize: '30px', margin: '10px'}}/>
        </IconButton>
    </header>
    <div style={{textAlign: 'center'}}>
        <p className='chatScreen_match'>YOU MATCHED WITH {matchedUser.name} ON {dateFormatter(match.timestamp)}</p>
    </div>
    </>
  )
}

export default ChatHeader