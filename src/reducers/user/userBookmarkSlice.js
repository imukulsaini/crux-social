import { createSlice } from "@reduxjs/toolkit";

import {
  getUserBookmark,
  saveBookmark,
  removeBookmark,
} from "../../api/user/userBookmarkApi";

const initialState = {
  userBookmark: [],
  getStatus: "idle",
  status:"idle",
  error: null,
};

const userBookmarkSlice = createSlice({
  name: "userBookmark",
  initialState,

  reducers: {},

  extraReducers: {
    [getUserBookmark.pending]: (state, action) => {
      state.getBookmarkStatus = "pending";
    },
    [getUserBookmark.fulfilled]: (state, action) => {
      state.getBookmarkStatus = "fulfilled";
      state.userBookmark = action.payload?.posts;
    },
    [getUserBookmark.rejected]: (state, action) => {
      state.getBookmarkStatus = "rejected";
      state.error = action.payload;
    },

    [saveBookmark.pending]: (state, action) => {
      state.status = "pending";
    },
    [saveBookmark.fulfilled]: (state, action) => {
      state.status = "fulfilled";
    },
    [saveBookmark.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [removeBookmark.pending]: (state, action) => {
      state.status = "pending";
    },
    [removeBookmark.fulfilled]: (state, action) => {
      state.status = "fulfilled";

      const findRemovePostInUserBookmark = state.userBookmark.findIndex(
        (post) => post._id === action.payload.postID
      );
      if (findRemovePostInUserBookmark !== -1) {
        state.userBookmark.splice(findRemovePostInUserBookmark, 1);
      }
    },
    [removeBookmark.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default userBookmarkSlice.reducer;
