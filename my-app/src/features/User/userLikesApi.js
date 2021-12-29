import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getUserLikes = createAsyncThunk(
  "userLikes/getUserLikes",
  async (apiPermission) => {
    const { token, userID } = apiPermission;
    const url = `https://media.imukulsaini.repl.co/v1/${userID}/likes`;
    const headers = {
      authorization: token,
    };
    const userResponse = await axios.get(url, { headers });
    return userResponse.data.likes[0];
  }
);



export const likePost = createAsyncThunk(
  "userLikes/likePost",
  async (postPermission) => {
    const { token, userID, postID } = postPermission;
    const url = `https://media.imukulsaini.repl.co/v1/${userID}/likes`;
    const headers = {
      authorization: token,
    };
    const userResponse = await axios.post(url, { postID }, { headers });
    return userResponse.data;
  }
);

export const unLikePost = createAsyncThunk(
  "userLikes/unLikePost",
  async (postPermission) => {
    const { token, userID, postID } = postPermission;

    const url = `https://media.imukulsaini.repl.co/v1/${userID}/likes`;
    const headers = {
      authorization: token,
    };
    const userResponse = await axios.delete(url, {
      headers,
      data: {
        postID,
      },
    });
    return userResponse.data;
  }
);


