import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../utils";
import { checkErrorAndReturnMessage } from "../util/errorHandler";
export const checkUserCredentials = createAsyncThunk(
  "users/checkUserCredentials",

  async (loginFormData, { rejectWithValue }) => {
    const { username, password } = loginFormData;
    const url = `${API_KEY}/login`;
    try {
      const userResponse = await axios.post(url, {
        username,
        password,
      });
      return userResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const createNewUser = createAsyncThunk(
  "users/createNewUser",

  async (userInfo, { rejectWithValue }) => {
    const { firstName, lastName, username, password, email } = userInfo;
    const url = `${API_KEY}/signup`;
    try {
      const userResponse = await axios.post(url, {
        object: "users",
        firstName,
        lastName,
        username,
        password,
        email,
      });
      return userResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (apiPermission, { rejectWithValue }) => {
    const { token, userID } = apiPermission;

    const url = `${API_KEY}/users/${userID}`;
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

export const updateUserData = createAsyncThunk(
  "users/updateUserData",
  async (apiPermission, { rejectWithValue }) => {
    const { token, userID, newUserData } = apiPermission;
    const { firstName, lastName, bio, website, avatar } = newUserData;
    const url = `${API_KEY}/users/${userID}/profile`;
    const headers = {
      authorization: token,
    };
    try {
      const userResponse = await axios.post(
        url,
        { firstName, lastName, bio, website, avatar },
        { headers }
      );
      return userResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "users/updateUserPassword",
  async (apiPermission, { rejectWithValue }) => {
    const { token, userID, newUserData } = apiPermission;
    const { currentPassword, newPassword } = newUserData;
    const url = `${API_KEY}/users/${userID}/password`;
    const headers = {
      authorization: token,
    };
    try {
      const userResponse = await axios.post(
        url,
        { currentPassword, newPassword },
        { headers }
      );
      return userResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  "users/deleteUserAccount",
  async (apiPermission, { rejectWithValue }) => {
    const { token, userID } = apiPermission;
    const url = `${API_KEY}/users/${userID}`;
    const headers = {
      authorization: token,
    };
    try {
      const userResponse = await axios.delete(url, { headers });
      return userResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const getUserInfoByUsername = createAsyncThunk(
  "users/getUserInfoByUsername",
  async (apiPermission, { rejectWithValue }) => {
    const { username } = apiPermission;
    const url = `${API_KEY}/profile/${username}`;
    try {
      const userResponse = await axios.get(url);
      return userResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);


export const searchUser = createAsyncThunk(
  "users/searchUser",
  async (apiPermission, { rejectWithValue }) => {
    const { value, token } = apiPermission;
    const url = `${API_KEY}/search/${value}`;
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
