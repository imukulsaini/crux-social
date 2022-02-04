import { createSlice } from "@reduxjs/toolkit";
import { getUserFollowers ,followUser ,unfollowUser} from "../../api/user/userFollowersApi";



const initialState = {
  userFollowers: [],
  status: "idle",
  error: null,
};

const userFollowersSlice = createSlice({
  name: "userFollowers",
  initialState,
  reducers: {},

  extraReducers: {
    [getUserFollowers.pending]: (state, action) => {
      state.status = "pending";
    },
    [getUserFollowers.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.userFollowers = action.payload?.followers;
    },
    [getUserFollowers.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    [followUser.pending]: (state, action) => {
      state.followStatus = "pending";
    },
    [followUser.fulfilled]: (state, action) => {
      state.followStatus = "fulfilled";
    },
    [followUser.rejected]: (state, action) => {
      state.followStatus = "rejected";
      state.error = action.payload;
    },

    [unfollowUser.pending]: (state, action) => {
      state.unfollowStatus = "pending";
    },
    [unfollowUser.fulfilled]: (state, action) => {
      state.unfollowStatus = "fulfilled";
    },
    [unfollowUser.rejected]: (state, action) => {
      state.unfollowStatus = "rejected";
      state.error = action.payload;
    },
  },
});



export default userFollowersSlice.reducer;
