import { createSlice } from "@reduxjs/toolkit";
import { getUserMessage, sendNewMessage } from "../..//api/message/MessageApi";

const initialState = {
  status: "idle",
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    newMessageReceived: (state, action) => {
      if (
        state.messages.length > 0 &&
        state.messages[0].conversationID === action.payload.conversationID
      ) {
        state.messages.push(action.payload);
      }
    },
    clearMessages: (state) => {
      state.messages = [];
      state.status = "idle";
    },
  },
  extraReducers: {
    [getUserMessage.pending]: (state, action) => {
      state.status = "pending";
    },
    [getUserMessage.fulfilled]: (state, action) => {
      state.messages = action.payload.messages;
      state.status = "fulfilled";
    },
    [getUserMessage.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [sendNewMessage.pending]: (state, action) => {
      state.status = "pending";
    },
    [sendNewMessage.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.messages.push(action.payload.message);
    },
    [sendNewMessage.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});
export const { newMessageReceived, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
