import { createSlice } from "@reduxjs/toolkit";
import {
  getUserLikes,
  likePost,
  unLikePost
} from "../../api/user/userLikesApi.js";


const initialState = {
  userLikes: [],
  status: "idle",
  error: null,
  getLikesStatus:"idle",
};

const userLikesSlice = createSlice({
  name: "usersLikes",
  initialState,

  reducers: {},

  extraReducers: {
    [getUserLikes.pending]: (state, action) => {
      state.getLikesStatus = "pending";
    },
    [getUserLikes.fulfilled]: (state, action) => {
      state.userLikes = action.payload.posts;

      state.getLikesStatus = "fulfilled";
    },
    [getUserLikes.rejected]: (state, action) => {
      state.getLikesStatus = "rejected";
      state.error = action.payload;
    },

    [likePost.pending]: (state, action) => {
      state.status = "pending";
    },
    [likePost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
    },
    [likePost.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [unLikePost.pending]: (state, action) => {
      state.status = "pending";
    },
    [unLikePost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      const findRemovePostInUserLike = state.userLikes.findIndex(
        (post) => post._id === action.payload.postID
      );
      if (findRemovePostInUserLike !== -1) {
        state.userLikes.splice(findRemovePostInUserLike, 1);
      }
    },
    [unLikePost.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default userLikesSlice.reducer;
