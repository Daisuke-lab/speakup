
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ProfileType from '../../types/ProfileType'

interface StateType {
    myProfile: ProfileType | null
}



const initialState:StateType = {
    myProfile: null

}


export const commonSlice = createSlice({
    name: 'commons',
    initialState: initialState,
    reducers: {
      setMyProfile: (state, action) => {
        state.myProfile = action.payload
      }
    }  
  })
  
  // Action creators are generated for each case reducer function
  export const {setMyProfile} = commonSlice.actions
  
  export default commonSlice.reducer