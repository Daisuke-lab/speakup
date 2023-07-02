import React from 'react'
import MessageType from '../../../types/MessageType'

interface Props {
    message: MessageType
}

function ImageMessage(props:Props) {
    const {message} = props
  return (
    <div>ImageMessage</div>
  )
}

export default ImageMessage