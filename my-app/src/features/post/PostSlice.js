import { createSlice,  } from "@reduxjs/toolkit";
import {
  
  getUserPosts,
  getTimelinePosts,
  getPostByID,
} from "./PostAPI";
import { likePost, unLikePost } from "../User/userLikesApi";
import { addBookmark, removeBookmark } from "../User/userBookmarkApi";

const initialState = {
  timelinePosts: [],
  userPosts: [],
  postsID: [],
  postIDStatus:'idle',
  timelineStatus:'idle'
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {

    // postIsClicked:(state,action)=>  {
    //   const findPost = state.timelinePosts.find(post=>post._id === action.payload.postID);
    //     state.postsID = findPost
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(likePost.fulfilled, (state, action) => {

      const findPostInTimeLine = state.timelinePosts.findIndex(
        (post) => post._id === action.payload.postID
      );
      const findPostInProfile = state.userPosts.findIndex(
        (post) => post._id === action.payload.postID
      );

      if (findPostInTimeLine !== -1) {
        state.timelinePosts[findPostInTimeLine].likeBy.push(
          action.payload.userID
        );
        state.timelinePosts[findPostInTimeLine].likesCount =
          state.timelinePosts[findPostInTimeLine].likesCount + 1;
      }
      if (findPostInProfile !== -1) {
        state.userPosts[findPostInProfile].likeBy.push(action.payload.userID);
        state.userPosts[findPostInProfile].likesCount =
          state.userPosts[findPostInProfile].likesCount + 1;
      }
      if (state.postsID.likeBy) {
        state.postsID.likeBy.push(action.payload.userID);
        state.postsID.likesCount = state.postsID.likesCount + 1;
      }
    });

    builder.addCase(unLikePost.fulfilled, (state, action) => {


      const findPostInTimeLine = state.timelinePosts.findIndex(
        (post) => post._id === action.payload.postID
      );
      const findPostInProfile = state.userPosts.findIndex(
        (post) => post._id === action.payload.postID
      );


      if (findPostInTimeLine !== -1) {
        
        state.timelinePosts[findPostInTimeLine].likeBy.pop(action.payload.userID);

        state.timelinePosts[findPostInTimeLine].likesCount =
        state.timelinePosts[findPostInTimeLine].likesCount - 1;

      }
      if (findPostInProfile !== -1) {
        state.userPosts[findPostInProfile].likeBy.pop(action.payload.userID);
        state.userPosts[findPostInProfile].likesCount =
          state.userPosts[findPostInProfile].likesCount - 1;
      }

      if (state.postsID.likeBy) {
        state.postsID.likeBy.pop(action.payload.userID);
        state.postsID.likesCount = state.postsID.likesCount - 1;
      }
    });


    builder.addCase(addBookmark.fulfilled, (state, action) => {

      const findPostInTimeLine = state.timelinePosts.findIndex(
        (post) => post._id === action.payload.postID
      );
      const findPostInProfile = state.userPosts.findIndex(
        (post) => post._id === action.payload.postID
      );
      
      if (findPostInTimeLine !== -1 && state.timelinePosts) {
        state.timelinePosts[findPostInTimeLine].bookmarkBy.push(
          action.payload.userID
        );
      }
      if (findPostInProfile !== -1 && state.userPosts) {
        state.userPosts[findPostInProfile].bookmarkBy.push(
          action.payload.userID
        );
      }
      if (state.postsID.bookmarkBy) {
        state.postsID.bookmarkBy.push(action.payload.userID);
      }
    });

    builder.addCase(removeBookmark.fulfilled, (state, action) => {
        const findPostInTimeLine = state.timelinePosts.findIndex(
            (post) => post._id === action.payload.postID
          );
          const findPostInProfile = state.userPosts.findIndex(
            (post) => post._id === action.payload.postID
          );


    if (findPostInTimeLine !== -1 && state.timelinePosts) {
        state.timelinePosts[findPostInTimeLine].bookmarkBy.pop(
          action.payload.userID
        );
      }
      if (findPostInProfile !== -1 && state.userPosts) {
        state.userPosts[findPostInProfile].bookmarkBy.pop(
          action.payload.userID
        );
      }
      if (state.postsID.bookmarkBy) {
         state.postsID.bookmarkBy.pop(action.payload.userID);
      }
    });

    builder.addCase(getUserPosts.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.userPosts = action.payload;
      state.status = "fulfilled";
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.status = "error";
    });

    builder.addCase(getTimelinePosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getTimelinePosts.fulfilled, (state, action) => {
      state.timelinePosts = action.payload.posts;
      state.status = "fulfilled";
    });
    builder.addCase(getTimelinePosts.rejected, (state, action) => {
      state.status = "error";
    });

    builder.addCase(getPostByID.pending, (state, action) => {
      state.postIDStatus  = "loading";
    });
    builder.addCase(getPostByID.fulfilled, (state, action) => {
      state.postsID = action.payload;
      state.postIDStatus = "fulfilled"
    });
    builder.addCase(getPostByID.rejected, (state, action) => {
      state.postIDStatus  = "error";
    });
  },
});

export const { postIsClicked } = postsSlice.actions;

export default postsSlice.reducer;
