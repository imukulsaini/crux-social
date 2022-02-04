import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkErrorAndReturnMessage } from "../util/errorHandler";
import { API_KEY } from "../../utils";

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (newPostData, { rejectWithValue }) => {
    const { userID, token, imageUrl, caption } = newPostData;
    const postData = { caption: caption, imageUrl: imageUrl };
    const headers = {
      authorization: token,
    };
    const url = `${API_KEY}/users/${userID}/posts`;
    try {
      const postResponse = await axios.post(url, { postData }, { headers });
      return postResponse.data.post;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const getTimelinePosts = createAsyncThunk(
  "posts/getTimelinePosts",
  async (postPermission, { rejectWithValue }) => {
    const { userID, token } = postPermission;
    const url = `${API_KEY}/users/${userID}/posts/timeline`;

    const headers = {
      authorization: token,
    };
    try {
      const postResponse = await axios.get(url, { headers });
      return postResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (postPermission, { rejectWithValue }) => {
    const { userID } = postPermission;
    const url = `${API_KEY}/users/${userID}/posts`;
    try {
      const postResponse = await axios.get(url);
      return postResponse.data.posts;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const getPostByID = createAsyncThunk(
  "posts/getPostByID",
  async (postPermission, { rejectWithValue }) => {
    const { token, postID } = postPermission;
    const headers = {
      authorization: token,
    };
    const url = `${API_KEY}/posts/${postID}`;
    try {
      const postResponse = await axios.get(url, { headers });
      return postResponse.data.posts;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);
