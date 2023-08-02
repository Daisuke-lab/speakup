import { configureStore } from '@reduxjs/toolkit'
import swipeReducer from './reducers/swipeReducer'
import commonReducer from './reducers/commonReducer'



const store =  configureStore({
  reducer: {
    commons: commonReducer,
    swipes: swipeReducer}
})
export default store
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch