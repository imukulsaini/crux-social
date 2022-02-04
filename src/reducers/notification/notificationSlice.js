import { createSlice } from "@reduxjs/toolkit";
import {
  getUserNotifications,
  readAllNotification,
} from "../../api/notification/notificationApi";

const initialState = {
  notifications: [],
  status: "idle",
  error: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: {
    [getUserNotifications.pending]: (state, action) => {
      state.status = "pending";
    },
    [getUserNotifications.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.notifications = action.payload;
    },
    [getUserNotifications.rejected]: (state, action) => {
      state.status = "rejected";
    },

  },
});

export default notificationSlice.reducer;
