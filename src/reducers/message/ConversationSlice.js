import { createSlice } from "@reduxjs/toolkit";
import { getConversation, makeAConversation } from "../../api/message/ConversationApi";

const initialState = {
  members: [],
  conversationRoom: [],
  createStatus: "idle",
  getStatus :"idle"
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: {
    [getConversation.pending]: (state, action) => {
      state.getStatus = "pending";
    },
    [getConversation.fulfilled]: (state, action) => {
      state.getStatus = "fulfilled";

      state.conversationRoom = action.payload.conversation;
    },
    [getConversation.rejected]: (state, action) => {
      state.getStatus= "rejected";
    },

    [makeAConversation.pending]: (state, action) => {
      state.createStatus = "pending";
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
