import React from 'react'
import MessageType from '../../../types/MessageType'

interface Props {
    message: MessageType
}
function FileMessage(props:Props) {
    const {message} = props
  return (
    <div>FileMessage</div>
  )
}

export default FileMessage