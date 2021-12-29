import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkUserCredentials = createAsyncThunk(
  "users/checkUserCredentials",
  async (loginFormData) => {
    const { username, password } = loginFormData;
    
    const url = "https://media.imukulsaini.repl.co/v1/login";
    const userResponse = await axios.post(url, {
      username,
      password,
    });
    return userResponse.data;
  }
);


export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (apiPermission) => {
    const { token, userID } = apiPermission;
    const url = `https://media.imukulsaini.repl.co/v1/users/${userID}`;
    const headers = {
      authorization: token,
    };

    const userResponse = await axios.get(url, { headers });
    console.log(userResponse.data);
    return userResponse.data;
  }
);



export const updateUserData = createAsyncThunk(
  "users/updateUserData",
  async (apiPermission) => {
    const { token, userID, newUserData } = apiPermission;
    const { firstName, lastName, bio, website , avatar } = newUserData;
    const url = `https://media.imukulsaini.repl.co/v1/users/${userID}/profile`;

    const headers = {
      authorization: token,
    };
    const userResponse = await axios.post(
      url,
      { firstName, lastName, bio, website ,avatar},
      { headers }
    );

    return userResponse.data;
  }
);



export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async (userPerm) => {
    const { firstName, lastName, username, password, email } = userPerm;
    const url = `https://media.imukulsaini.repl.co/v1/signup`;

    const userResponse = await axios.post(url, {
      object: "users",
      firstName,
      lastName,
      username,
      password,
      email,
    });
    return userResponse.data;
  }
);



export const updateUserPassword = createAsyncThunk(
  "users/updateUserPassword",
  async (apiPermission) => {
    const { token, userID, newUserData } = apiPermission;
    const { currentPassword, newPassword } = newUserData;
    const url = `https://media.imukulsaini.repl.co/v1/users/${userID}/password`;

    const headers = {
      authorization: token,
    };
    const userResponse = await axios.post(
      url,
      { currentPassword, newPassword },
      { headers }
    );
    return userResponse.data;
  }
);



export const deleteUserAccount = createAsyncThunk(
  "users/deleteUserAccount",
  async (apiPermission) => {
    const { token, userID } = apiPermission;
    const url = `https://media.imukulsaini.repl.co/v1/users/${userID}`;

    const headers = {
      authorization: token,
    };

    const userResponse = await axios.delete(url, { headers });
    return userResponse.data;
  }
);



export const getUserInfoByUsername = createAsyncThunk(
  "users/getUserInfoByUsername",
  async (apiPermission) => {
    const { token, userID } = apiPermission ;
    const url = `https://media.imukulsaini.repl.co/v1/users/${userID}`;

    const headers = {
      authorization: token,
    };

    const userResponse = await axios.delete(url, { headers });
    console.log(userResponse)
    return userResponse.data;
  }
);



