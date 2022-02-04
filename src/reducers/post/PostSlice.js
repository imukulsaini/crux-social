import { createSlice } from "@reduxjs/toolkit";
import {
  createNewPost,
  getPostByID,
  getTimelinePosts,
  getUserPosts,
} from "../../api/post/PostAPI";
import { removeBookmark } from "../../api/user/userBookmarkApi";

const initialState = {
  timelinePosts: [],
  userPosts: [],
  postsID: [],
  postIDStatus: "idle",
  timelineStatus: "idle",
  createPostStatus: "idle",
  userPostStatus: "idle",
  error: "",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postIsLiked: (state, action) => {
      const findPostInTimeLine = state.timelinePosts.findIndex(
        (post) => post._id === action.payload.likeInfo.postID
      );
      const findPostInProfile = state.userPosts.findIndex(
        (post) => post._id === action.payload.likeInfo.postID
      );

      if (findPostInTimeLine !== -1) {
        state.timelinePosts[findPostInTimeLine].likeBy.push(
          action.payload.likeInfo.userID
        );
        state.timelinePosts[findPostInTimeLine].likesCount =
          state.timelinePosts[findPostInTimeLine].likesCount + 1;
      }
      if (findPostInProfile !== -1) {
        state.userPosts[findPostInProfile].likeBy.push(
          action.payload.likeInfo.userID
        );
        state.userPosts[findPostInProfile].likesCount =
          state.userPosts[findPostInProfile].likesCount + 1;
      }
      if (state.postsID.likeBy) {
        state.postsID.likeBy.push(action.payload.likeInfo.userID);
        state.postsID.likesCount = state.postsID.likesCount + 1;
      }
    },

    postIsunLiked: (state, action) => {
      const findPostInTimeLine = state.timelinePosts.findIndex(
        (post) => post._id === action.payload.unLikeInfo.postID
      );
      const findPostInProfile = state.userPosts.findIndex(
        (post) => post._id === action.payload.unLikeInfo.postID
      );

      if (findPostInTimeLine !== -1) {
        state.timelinePosts[findPostInTimeLine].likeBy.pop(
          action.payload.unLikeInfo.userID
        );
        if (state.timelinePosts[findPostInTimeLine].likesCount > 0) {
          state.timelinePosts[findPostInTimeLine].likesCount =
            state.timelinePosts[findPostInTimeLine].likesCount - 1;
        }
      }
      if (findPostInProfile !== -1) {
        state.userPosts[findPostInProfile].likeBy.pop(
          action.payload.unLikeInfo.userID
        );
        if (state.userPosts[findPostInProfile].likesCount > 0) {
          state.userPosts[findPostInProfile].likesCount =
            state.userPosts[findPostInProfile].likesCount - 1;
        }
      }

      if (state.postsID.likeBy) {
        if (state.postsID.likesCount > 0) {
          state.postsID.likeBy.pop(action.payload.unLikeInfo.userID);
          state.postsID.likesCount = state.postsID.likesCount - 1;
        }
      }
    },
    postAddedInBookMark: (state, action) => {
      const findPostInTimeLine = state.timelinePosts.findIndex(
        (post) => post._id === action.payload.bookmarkInfo.postID
      );
      const findPostInProfile = state.userPosts.findIndex(
        (post) => post._id === action.payload.bookmarkInfo.postID
      );

      if (findPostInTimeLine !== -1 && state.timelinePosts) {
        state.timelinePosts[findPostInTimeLine].bookmarkBy.push(
          action.payload.bookmarkInfo.userID
        );
      }
      if (findPostInProfile !== -1 && state.userPosts) {
        state.userPosts[findPostInProfile].bookmarkBy.push(
          action.payload.bookmarkInfo.userID
        );
      }
      if (state.postsID.bookmarkBy) {
        state.postsID.bookmarkBy.push(action.payload.bookmarkInfo.userID);
      }
    },
    postRemoveFromBookmark: (state, action) => {
      const findPostInTimeLine = state.timelinePosts.findIndex(
        (post) => post._id === action.payload.bookmarkInfo.postID
      );
      const findPostInProfile = state.userPosts.findIndex(
        (post) => post._id === action.payload.bookmarkInfo.postID
      );
      if (findPostInTimeLine !== -1 && state.timelinePosts) {
        state.timelinePosts[findPostInTimeLine].bookmarkBy.pop(
          action.payload.bookmarkInfo.userID
        );
      }
      if (findPostInProfile !== -1 && state.userPosts) {
        state.userPosts[findPostInProfile].bookmarkBy.pop(
          action.payload.bookmarkInfo.userID
        );
      }
      if (state.postsID.bookmarkBy) {
        state.postsID.bookmarkBy.pop(action.payload.bookmarkInfo.userID);
      }
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(likePost.fulfilled, (state, action) => {
    //   const findPostInTimeLine = state.timelinePosts.findIndex(
    //     (post) => post._id === action.payload.postID
    //   );
    //   const findPostInProfile = state.userPosts.findIndex(
    //     (post) => post._id === action.payload.postID
    //   );

    //   if (findPostInTimeLine !== -1) {
    //     state.timelinePosts[findPostInTimeLine].likeBy.push(
    //       action.payload.userID
    //     );
    //     state.timelinePosts[findPostInTimeLine].likesCount =
    //       state.timelinePosts[findPostInTimeLine].likesCount + 1;
    //   }
    //   if (findPostInProfile !== -1) {
    //     state.userPosts[findPostInProfile].likeBy.push(action.payload.userID);
    //     state.userPosts[findPostInProfile].likesCount =
    //       state.userPosts[findPostInProfile].likesCount + 1;
    //   }
    //   if (state.postsID.likeBy) {
    //     state.postsID.likeBy.push(action.payload.userID);
    //     state.postsID.likesCount = state.postsID.likesCount + 1;
    //   }
    // });

    // builder.addCase(unLikePost.fulfilled, (state, action) => {
    // const findPostInTimeLine = state.timelinePosts.findIndex(
    //   (post) => post._id === action.payload.postID
    // );
    // const findPostInProfile = state.userPosts.findIndex(
    //   (post) => post._id === action.payload.postID
    // );

    // if (findPostInTimeLine !== -1) {
    //   state.timelinePosts[findPostInTimeLine].likeBy.pop(
    //     action.payload.userID
    //   );

    //   state.timelinePosts[findPostInTimeLine].likesCount =
    //     state.timelinePosts[findPostInTimeLine].likesCount - 1;
    // }
    // if (findPostInProfile !== -1) {
    //   state.userPosts[findPostInProfile].likeBy.pop(action.payload.userID);
    //   state.userPosts[findPostInProfile].likesCount =
    //     state.userPosts[findPostInProfile].likesCount - 1;
    // }

    // if (state.postsID.likeBy) {
    //   state.postsID.likeBy.pop(action.payload.userID);
    //   state.postsID.likesCount = state.postsID.likesCount - 1;
    // }
    // });

    // builder.addCase(saveBookmark.fulfilled, (state, action) => {

    // const findPostInTimeLine = state.timelinePosts.findIndex(
    //   (post) => post._id === action.payload.postID
    // );
    // const findPostInProfile = state.userPosts.findIndex(
    //   (post) => post._id === action.payload.postID
    // );
    // console.log(action.payload.postID);
    // console.log({findPostInProfile , findPostInTimeLine});

    // if (findPostInTimeLine !== -1 && state.timelinePosts) {
    //   console.log('ho gya');
    //   state.timelinePosts[findPostInTimeLine].bookmarkBy.push(
    //     action.payload.userID
    //     );
    //   }
    //   if (findPostInProfile !== -1 && state.userPosts) {
    //   console.log('ho gya');
    //   state.userPosts[findPostInProfile].bookmarkBy.push(
    //     action.payload.userID
    //   );
    // }
    // if (state.postsID.bookmarkBy) {
    //   state.postsID.bookmarkBy.push(action.payload.userID);
    // }
    // });

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
      state.userPostStatus = "pending";
    });

    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.userPosts = action.payload;
      state.userPostStatus = "fulfilled";
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.userPostStatus = "rejected";
      state.error = action.payload;
    });

    builder.addCase(getTimelinePosts.pending, (state, action) => {
      state.timelineStatus = "pending";
    });
    builder.addCase(getTimelinePosts.fulfilled, (state, action) => {
      state.timelinePosts = action.payload.posts;
      state.timelineStatus = "fulfilled";
    });
    builder.addCase(getTimelinePosts.rejected, (state, action) => {
      state.timelineStatus = "rejected";
    });

    builder.addCase(getPostByID.pending, (state, action) => {
      state.postIDStatus = "pending";
    });
    builder.addCase(getPostByID.fulfilled, (state, action) => {
      state.postsID = action.payload;
      state.postIDStatus = "fulfilled";
    });
    builder.addCase(getPostByID.rejected, (state, action) => {
      state.postIDStatus = "rejected";
    });

    builder.addCase(createNewPost.pending, (state, action) => {
      state.createPostStatus = "pending";
    });
    builder.addCase(createNewPost.fulfilled, (state, action) => {
      // state.postsID = action.payload;
      state.createPostStatus = "fulfilled";
      state.timelinePosts.push(action.payload);
    });
    builder.addCase(createNewPost.rejected, (state, action) => {
      state.createPostStatus = "rejected";
      state.error = action.payload;
    });
  },
});

export const {
  postIsClicked,
  postIsLiked,
  postIsunLiked,
  postAddedInBookMark,
  postRemoveFromBookmark,
} = postsSlice.actions;

export default postsSlice.reducer;
