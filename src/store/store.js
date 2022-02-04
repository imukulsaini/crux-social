import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import userReducer from "../reducers/user/userSlice";
import postsReducer from "../reducers/post/PostSlice";
import conversationReducer from "../reducers/message/ConversationSlice";
import messageReducer from "../reducers/message/MessageSlice";
import postCommentsReducer from "../reducers/post/PostCommentsSlice";
import userLikesReducer from "../reducers/user/userLikesSlice";
import userBookmarkReducer from "../reducers/user/userBookmarkSlice";
import notificationReducer from "../reducers/notification/notificationSlice";
import followersReducer from "../reducers/user/userFollowersSlice";



const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["users", "posts", "conversation", "messages"],
};
const authPersistConfig = {
  key: "users",
  storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
  users: persistReducer(authPersistConfig, userReducer),
  posts: postsReducer,
  conversation: conversationReducer,
  messages: messageReducer,
  postComments: postCommentsReducer,
  userLikes: userLikesReducer,
  userBookmark: userBookmarkReducer,
  followers:followersReducer,
  notifications: notificationReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});
