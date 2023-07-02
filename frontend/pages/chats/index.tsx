import { NextPage } from "next";
import ChatPreview from "../../types/ChatPreviewType";
import { getSession } from "next-auth/react";
import getAxios from "../../src/utils/getAxios";
import { CustomSessionType } from "../../types/CustomSessionType";
import Layout from "../../src/components/Layout";
import { List } from "@mui/material";
import ChatListItem from "../../src/components/chats/ChatListItem";


interface Props {
    chatPreviews: ChatPreview[]
}
const ChatListPage: NextPage = (props) => {
    const {chatPreviews} = props as Props
    return (
        <>
        <Layout/>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {chatPreviews.map((chatPreview) => (
                <ChatListItem chatPreview={chatPreview} key={`chat-list-item-${chatPreview.profile.id}`}/>
            ))}
        </List>
        </>
    )
}

export async function getServerSideProps(context:any) {
    const session = await getSession(context)
    const axios = getAxios(session as unknown as CustomSessionType | null)
    let chatPreviews:ChatPreview[] = [];

    try {
      const res = await axios.get(`/api/v1/accounts/chat_previews`)
      chatPreviews = res.data
    } catch (err) {
      console.log(err)
    }
    
    return {
      props:{
        chatPreviews
      }
    }
  
  }

  

export default ChatListPage
