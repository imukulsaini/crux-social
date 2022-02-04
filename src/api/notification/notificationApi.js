import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkErrorAndReturnMessage } from "../util/errorHandler";
import { API_KEY } from "../../utils";

export const getUserNotifications = createAsyncThunk(
  "notifications/getUserNotification",
  async (data, { rejectWithValue }) => {
    const { userID, token } = data;
    const headers = {
      authorization: token,
    };
    const url = `${API_KEY}/users/${userID}/notifications`;
    try {
      const response = await axios.get(
        url,

        { headers }
      );
      return response.data.notifications;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);    }
  }
);

export const readNotification = createAsyncThunk(
  "notifications/readNotification",
  async (data, { rejectWithValue }) => {
    const { notificationID, userID, token } = data;
    const headers = {
      authorization: token,
    };
    const url = `${API_KEY}/users/${userID}/notifications/${notificationID}/read`;
    try {
      const response = await axios.post(url, {}, { headers });
      return response.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);    }
  }
);
