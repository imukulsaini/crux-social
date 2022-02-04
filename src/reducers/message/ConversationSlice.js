import { createSlice } from "@reduxjs/toolkit";
import { getConversation, makeAConversation } from "../../api/message/ConversationApi";

const initialState = {
  status: "idle",
  members: [],
  conversationRoom: [],
  createStatus: "idle",
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: {
    [getConversation.pending]: (state, action) => {

      state.status = "pending";
    },
    [getConversation.fulfilled]: (state, action) => {
      state.status = "fulfilled";

      state.conversationRoom = action.payload.conversation;
    },
    [getConversation.rejected]: (state, action) => {
      state.status= "rejected";
    },

    [makeAConversation.pending]: (state, action) => {
      state.createStatus = "loading";
    },
    [makeAConversation.fulfilled]: (state, action) => {
      state.createStatus = "fulfilled";

      state.conversationRoom = action.payload.conversation;
    },
    [makeAConversation.rejected]: (state, action) => {
      state.createStatus = "error";
    },
  },
});

export default conversationSlice.reducer;
