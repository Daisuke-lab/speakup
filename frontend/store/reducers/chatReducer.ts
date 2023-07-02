import MessageType from "../../types/MessageType"
import ProfileType from "../../types/ProfileType"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StateType {
    messages: MessageType[],

}



const initialState:StateType = {
    messages: []

}


export const chatSlice = createSlice({
    name: 'chats',
    initialState: initialState,
    reducers: {
      setMessages: (state, action) => {
        state.messages = action.payload
      },
      addMessage: (state, action) => {
        state.messages = [...state.messages, action.payload]
      }
    }  
  })
  
  // Action creators are generated for each case reducer function
  export const {setMessages, addMessage} = chatSlice.actions
  
  export default chatSlice.reducer