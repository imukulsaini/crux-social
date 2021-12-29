import { createSlice } from "@reduxjs/toolkit";

import {
  getUserBookmark,
  addBookmark,
  removeBookmark,
} from "./userBookmarkApi";



const initialState = {
  userBookmark: [],
  status: "idle",
  error: null,
};

const userBookmarkSlice = createSlice({
  name: "userBookmark",
  initialState,

  reducers: {},

  extraReducers: {
    [getUserBookmark.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUserBookmark.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.userBookmark = action.payload.posts
    },
    [getUserBookmark.rejected]: (state, action) => {
      state.status = "error";
    },

    [addBookmark.pending]: (state, action) => {
      state.status = "loading";
    },
    [addBookmark.fulfilled]: (state, action) => {

      state.status = "fulfilled";



    },
    [addBookmark.rejected]: (state, action) => {
      state.status = "error";
    },

    [removeBookmark.pending]: (state, action) => {
      state.status = "loading";
    },
    [removeBookmark.fulfilled]: (state, action) => {
      state.status = "fulfilled";

      const findRemovePostInUserBookmark = state.userBookmark.findIndex(
        post => post._id === action.payload.postID
      ) 
      if(findRemovePostInUserBookmark !== -1){
        state.userBookmark.splice(findRemovePostInUserBookmark,1)
      }
    },
    [removeBookmark.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});

export default userBookmarkSlice.reducer;
