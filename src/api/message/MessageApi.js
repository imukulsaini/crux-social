import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../utils";
import { checkErrorAndReturnMessage } from "../util/errorHandler";

export const getUserMessage = createAsyncThunk(
  "message/getUserMessage",
  async (accessData, { rejectWithValue }) => {
    const { token, userID, conversationID } = accessData;
    const url = `${API_KEY}/users/${userID}/conversation/${conversationID}/messages`;
    const headers = {
      authorization: token,
    };

    try {
      const messageResponse = await axios.get(
        url,

        {
          headers,
        }
      );
      return messageResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const sendNewMessage = createAsyncThunk(
  "/message/sendNewMessage",
  async (accessData, { rejectWithValue }) => {
    const { text, conversationID, userID, token } = accessData;
    const url = `${API_KEY}/users/${userID}/conversation/${conversationID}/messages`;

    const headers = {
      authorization: token,
    };
    try {
      const messageResponse = await axios.post(
        url,
        { message: text },
        { headers }
      );
      return messageResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);
