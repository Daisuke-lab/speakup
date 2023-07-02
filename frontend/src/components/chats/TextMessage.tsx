import React from 'react'
import MessageType from '../../../types/MessageType'

interface Props {
    message: MessageType
}
function TextMessage(props:Props) {
    const {message} = props
  return (
    <div>TextMessage</div>
  )
}

export default TextMessage