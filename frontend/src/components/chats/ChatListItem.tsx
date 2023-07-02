import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import ChatPreviewType from '../../../types/ChatPreviewType'

interface Props {
    chatPreview: ChatPreviewType
}
function ChatListItem(props:Props) {
    const {chatPreview} = props
  return (
    <>
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={chatPreview.profile.name}
          secondary={
            <React.Fragment>
              {chatPreview.last_message.content}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </>
  )
}

export default ChatListItem