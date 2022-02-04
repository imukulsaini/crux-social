import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../utils";
import { checkErrorAndReturnMessage } from "../util/errorHandler";

export const getConversation = createAsyncThunk(
  "conversation/getConversation",
  async (userData, { rejectWithValue }) => {
    const { token, userID } = userData;

    const url = `${API_KEY}/users/${userID}/conversation`;

    const headers = {
      authorization: token,
    };
    try {
      const conversationResponse = await axios.get(
        url,
        { headers },
        {
          data: {
            userID: userID,
          },
        }
      );
      return conversationResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);

export const makeAConversation = createAsyncThunk(
  "conversation/makeAConversation",
  async (userInfo, { rejectWithValue }) => {
    const { senderID, receiverID, userID, token } = userInfo;

    const url = `${API_KEY}/users/${userID}/conversation`;

    const headers = {
      authorization: token,
    };
    try {
      const conversationResponse = await axios.post(
        url,
        {
          receiverID: receiverID,
          senderID: senderID,
        },
        { headers }
      );
      return conversationResponse.data;
    } catch (error) {
      const message = checkErrorAndReturnMessage(error);
      return rejectWithValue(message);
    }
  }
);
