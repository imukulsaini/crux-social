import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../utils";

export const createNewComment = createAsyncThunk(
  "posts/createNewComment",
  async (newCommentData) => {
    const { postID, userID, token, comment } = newCommentData;
    const headers = {
      authorization: token,
    };
    const url = `${API_KEY}/posts/${postID}/comments`;
    const postResponse = await axios.post(
      url,
      { comment: comment, commentBy: userID },
      { headers }
    );
    return postResponse.data.comments;
  }
);

export const getPostComments = createAsyncThunk(
  "posts/getPostComments",
  async (postCommentPermission) => {
    const { postID } = postCommentPermission;
    const url = `${API_KEY}/posts/${postID}/comments`;
    const postResponse = await axios.get(url);
    return postResponse.data.comments[0];
  }
);
