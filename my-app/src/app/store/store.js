import { configureStore } from '@reduxjs/toolkit';
import {  persistReducer } from 'redux-persist';
import {combineReducers} from "redux"; 
import storage from 'redux-persist/lib/storage' ;

import userReducer from '../../features/User/userSlice';
import postsReducer from '../../features/post/PostSlice';
import conversationReducer from '../../features/Message/ConversationSlice';
import messageReducer from "../../features/Message/MessageSlice";
import postCommentsReducer from "../../features/post/PostCommentsSlice";
import userLikesReducer from "../../features/User/userLikesSlice";
import userBookmarkReducer from "../../features/User/userBookmarkSlice";


const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const rootPersistConfig = {
  key:'root',
  storage,
  blacklist:['users','posts','conversation','messages']
}
const authPersistConfig = {
  key:'users',
  storage,
  whitelist:['token']
}

const rootReducer = combineReducers({

  users:persistReducer(authPersistConfig,userReducer),
  posts:postsReducer,
  conversation :conversationReducer,
  messages:messageReducer,
  postComments:postCommentsReducer,
  userLikes:userLikesReducer,
  userBookmark : userBookmarkReducer
  
})

const persistedReducer = persistReducer(rootPersistConfig,rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  
  enhancer
})