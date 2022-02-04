import { createSlice } from "@reduxjs/toolkit";
import {
  createNewComment,
  getPostComments,
} from "../../api/post/PostCommentsApi";

const initialState = {
  comments: [],
  createStatus: "idle",
  getStatus: "idle",
};

export const commentSlice = createSlice({
  name: "postComment",
  initialState,
  reducers: {
    newCommentAdded: (state, action) => {
      state.comments.push(action.payload);
    },
  },
  extraReducers: {
    [createNewComment.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [createNewComment.fulfilled]: (state, action) => {
      // state.comments = action.payload.comments
      state.createStatus = "fulfilled";
    },
    [createNewComment.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },

    [getPostComments.pending]: (state, action) => {
      state.getStatus = "pending";
    },

    [getPostComments.fulfilled]: (state, action) => {
      state.getStatus = "fulfilled";

      state.comments = action.payload.comments;
    },
    [getPostComments.rejected]: (state, action) => {
      state.getStatus = "rejected";
    },
  },
});

export const { newCommentAdded } = commentSlice.actions;

export default commentSlice.reducer;
