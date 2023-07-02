import React from 'react'
import MessageType from '../../../types/MessageType'
import ImageMessage from './ImageMessage'
import FileMessage from './FileMessage'
import TextMessage from './TextMessage'


interface Props {
    message: MessageType
}
function ChatMessage(props:Props) {
    const {message} = props

    const isYourMessage = message.sent_by === session?.id

    const isFile = () => {
        if (message.content.includes("http") && message.content.includes(".") ) {
            return true
        }
        return false
    }

    const isImageFile = () => {
        if (isFile()) {
            if (message.content.includes("jpg")) {
                return true
            } else if (message.content.includes("png")) {
                return true
            } else if (message.content.includes("jpeg")) {
                return true
            }
        }
        return false
    }

    const renderMessage = () => {
        if (isImageFile()) {
            return <ImageMessage message={message} />
        } else if (isFile()) {
            return <FileMessage message={message} />
        } else {
            return <TextMessage message={message} />
        }
    }
    return (
        <div>{renderMessage()}</div>
    )
}

export default ChatMessage