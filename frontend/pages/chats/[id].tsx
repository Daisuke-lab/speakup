import { NextPage } from "next"
import MessageType from "../../types/MessageType"
import { useEffect } from "react"
import { getSession } from "next-auth/react"
import getAxios from "../../src/utils/getAxios"
import { CustomSessionType } from "../../types/CustomSessionType"
import ChatPreview from "../../types/ChatPreviewType"
import { useDispatch } from "react-redux"
import { setMessages } from "../../store/reducers/chatReducer"
import ChatHeader from "../../src/components/chats/ChatHeader"
import MatchType from "../../types/MatchType"
import ChatMessage from "../../src/components/chats/ChatMessage"
import ChatSendInput from "../../src/components/chats/ChatSendInput"


interface Props {
    messages: MessageType[]
}
const ChatPage: NextPage = (props) => {
    const {messages} = props as Props
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setMessages(messages))
    }, [])
    return (
        <>
        <ChatHeader />
        <ul className='chatScreen_messages'>
            {messages.map((message, index) => (
                <ChatMessage message={message} key={`chat-message-${index}`}/>
            ))}
        </ul>
        <ChatSendInput />
        </>
    )
}

export async function getServerSideProps(context:any) {
    const session = await getSession(context)
    const axios = getAxios(session as unknown as CustomSessionType | null)
    const chatId = context.params.id

    let messages:MessageType[] = [];
    let match:MatchType;

    try {
      const res = await axios.get(`/chats/${chatId}/messages`)
      messages = res.data
    } catch (err) {
      console.log(err)
    }

    try {
        const res = await axios.get(`/swipes/matchs?`)
    } catch (err) {
        console.log(err)
    }
    
    return {
      props:{
        messages
      }
    }
  
  }

  

export default ChatPage