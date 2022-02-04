import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkErrorAndReturnMessage } from "../util/errorHandler";

import { API_KEY } from "../../utils";

export const getUserFollowers = createAsyncThunk(
  "userFollowers/getUserFollowers",
  async (apiPermission, { rejectWithValue }) => {
    const { token, userID } = apiPermission;

    const url = `${API_KEY}/users/${userID}/followers`;
    const headers = {
      authorization: token,
    };
    try {
      const userResponse = await axios.get(url, { headers });
      return userResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);


export const followUser = createAsyncThunk(
  "users/followUser",
  async (apiPermission, { rejectWithValue }) => {
    const { token, userID, profileID } = apiPermission;
    const url = `${API_KEY}/users/${userID}/follow`;
    const headers = {
      authorization: token,
    };
    try {
      const userResponse = await axios.post(
        url,
        { userId: profileID },
        { headers }
      );
      return userResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);
export const unfollowUser = createAsyncThunk(
  "users/followUser",
  async (apiPermission, { rejectWithValue }) => {
    const { token, userID, profileID } = apiPermission;
    const url = `${API_KEY}/users/${userID}/follow`;
    const headers = {
      authorization: token,
    };

    try {
      const userResponse = await axios.delete(url, {
        headers,
        data: {
          userId: profileID,
        },
      });
      return userResponse;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);
