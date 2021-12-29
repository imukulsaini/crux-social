import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserMessage = createAsyncThunk(
  "message/getUserMessage",
  async (accessData) => {
    const { token, userID, conversationID } = accessData;
    const url = `https://media.imukulsaini.repl.co/v1/${userID}/${conversationID}/messages`;

    const headers = {
      authorization: token,
    };

    const messageResponse = await axios.get(
      url,

      {
        headers,
      }
    );

    return messageResponse.data;
  }
);

export const sendNewMessage = createAsyncThunk("/message/sendNewMessage" , async (accessData)=>{
    const { text , conversationID , userID , token } = accessData;

    const url = `https://media.imukulsaini.repl.co/v1/${userID}/${conversationID}/messages`;

    const headers = {
        authorization: token,
      };
    const messageResponse = await axios.post(url ,{ message:text } , { headers});
    return messageResponse.data;
})
