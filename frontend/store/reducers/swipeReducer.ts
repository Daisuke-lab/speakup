import ProfileType from "../../types/ProfileType"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StateType {
    currentProfile: ProfileType | null
}



const initialState:StateType = {
    currentProfile: null

}


export const swipeSlice = createSlice({
    name: 'swipes',
    initialState: initialState,
    reducers: {
      setCurrentProfile: (state, action) => {
        state.currentProfile = action.payload
      }
    }  
  })
  
  // Action creators are generated for each case reducer function
  export const {setCurrentProfile} = swipeSlice.actions
  
  export default swipeSlice.reducer