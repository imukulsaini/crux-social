import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../utils";
import { checkErrorAndReturnMessage } from "../util/errorHandler";

export const getUserLikes = createAsyncThunk(
  "userLikes/getUserLikes",
  async (apiPermission, { rejectWithValue }) => {
    const { token, userID } = apiPermission;
    const url = `${API_KEY}/users/${userID}/likes`;
    const headers = {
      authorization: token,
    };
    try {
      const userResponse = await axios.get(url, { headers });
      return userResponse.data.likes[0];
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const likePost = createAsyncThunk(
  "userLikes/likePost",
  async (postPermission) => {
    const { token, userID, postID } = postPermission;
    const url = `${API_KEY}/users/${userID}/likes`;
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

    const url = `${API_KEY}/users/${userID}/likes`;
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
