import { createSlice } from "@reduxjs/toolkit";
import {
  checkUserCredentials,
  createNewUser,
  deleteUserAccount,
  followUser,
  getUserData,
  getUserInfoByUsername,
  searchUser,
  unfollowUser,
  updateUserData,
  updateUserPassword,
} from "../../api/user/userApi";

const initialState = {
  refreshUserStatus: "idle",
  isUserLogin: false,
  token: "",
  userID: "",
  error: "",
  logoutStatus: null,
  userData: [],
  userSearchData: [],
  profileUpdateStatus: "idle",
  deleteAccountStatus: "idle",
  passwordChangeStatus: "idle",
  loginStatus: "idle",
  signupStatus: "idle",
  searchStatus: "idle",
  followStatus: "idle",
  profileStatus: "idle",
  unfollowStatus: "idle",
  profileData: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeAvatar: (state, action) => {
      state.userData.avatar = action.payload;
    },
    updateProfileData: (state, action) => {
      state.profileData = action.payload.data;
    },
    changeUpdateStatus: (state, action) => {
      state.profileUpdateStatus = action.payload;
    },
    followProfile: (state, action) => {
      if (state.userID === action.payload.result.followerID) {
        state.userData.following.push(action.payload.profile);
        if (state?.profileData._id === state.userID) {
          state?.profileData?.following?.push(action.payload.profile);
        }
      }
      if (state.profileData._id === action.payload.result.followingID) {
        state.profileData.followers.push(state.userData);
      }
    },
    unFollowProfile: (state, action) => {
      if (state.userID === action.payload.result.followerID) {
        const findIndex = state.userData.following.findIndex(
          (user) => user._id === action.payload.result.followingID
        );
        findIndex !== -1 && state.userData.following.splice(findIndex, 1);

        // findIndex !== -1 && state.profileData.following.splice(findIndex, 1);
      }
      if (state.profileData._id === action.payload.result.followingID) {
        const findIndex = state.profileData.followers.findIndex(
          (user) => user._id === state.userID
        );
        findIndex !== -1 && state.profileData.followers.splice(findIndex, 1);
      }
    },
    logout: (state, action) => {
      state.isUserLogin = false;
      state.token = "";
      state.userData = null;
      state.userID = "";
      state.error = "";
      state.loginStatus = "idle";
      state.signupStatus = "idle";
      state.refreshUserStatus = "idle";
      state.logoutStatus = "success";
      localStorage.clear();
    },
  },
  extraReducers: {
    [checkUserCredentials.pending]: (state, action) => {
      state.loginStatus = "pending";
    },
    [checkUserCredentials.fulfilled]: (state, action) => {
      state.loginStatus = "fulfilled";
      state.userID = action.payload.userData._id;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.isUserLogin = true;
    },
    [checkUserCredentials.rejected]: (state, action) => {
      state.loginStatus = "rejected";
      state.error = action.payload;
    },

    [getUserData.pending]: (state, action) => {
      state.refreshUserStatus = "pending";
    },
    [getUserData.fulfilled]: (state, action) => {
      state.userID = action.payload.userData._id;
      state.isUserLogin = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.refreshUserStatus = "fulfilled";
    },
    [getUserData.rejected]: (state, action) => {
      state.refreshUserStatus = "rejected";
      state.error = action.payload;
    },

    [createNewUser.pending]: (state, action) => {
      state.signupStatus = "pending";
    },
    [createNewUser.fulfilled]: (state, action) => {
      state.signupStatus = "fulfilled";
      state.userID = action.payload.userData._id;
      state.isUserLogin = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },
    [createNewUser.rejected]: (state, action) => {
      state.signupStatus = "rejected";
      state.error = action.payload;
    },

    [updateUserData.pending]: (state, action) => {
      state.profileUpdateStatus = "pending";
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.userData = action.payload.userData;
      state.profileUpdateStatus = "fulfilled";
    },
    [updateUserData.rejected]: (state, action) => {
      state.profileUpdateStatus = "rejected";
      state.error = action.payload;
    },

    [updateUserPassword.pending]: (state, action) => {
      state.passwordChangeStatus = "pending";
    },
    [updateUserPassword.fulfilled]: (state, action) => {
      state.passwordChangeStatus = "fulfilled";
    },
    [updateUserPassword.rejected]: (state, action) => {
      state.passwordChangeStatus = "rejected";
      state.error = action.payload;
    },

    [deleteUserAccount.pending]: (state, action) => {
      state.deleteAccountStatus = "pending";
    },
    [deleteUserAccount.fulfilled]: (state, action) => {
      state.deleteAccountStatus = "fulfilled";
    },
    [deleteUserAccount.rejected]: (state, action) => {
      state.deleteAccountStatus = "rejected";
      state.error = action.payload;
    },

    [getUserInfoByUsername.pending]: (state, action) => {
      state.profileStatus = "pending";
    },
    [getUserInfoByUsername.fulfilled]: (state, action) => {
      state.profileStatus = "fulfilled";
      state.profileData = action.payload.user;
    },
    [getUserInfoByUsername.rejected]: (state, action) => {
      state.profileStatus = "rejected";
      state.error = action.payload;
    },

    [searchUser.pending]: (state, action) => {
      state.searchStatus = "pending";
    },
    [searchUser.fulfilled]: (state, action) => {
      state.searchStatus = "fulfilled";
      state.userSearchData = action.payload.result;
    },
    [searchUser.rejected]: (state, action) => {
      state.searchStatus = "rejected";
      state.error = action.payload;
    },
  },
});
export const {
  changeAvatar,
  updateProfileData,
  followProfile,
  unFollowProfile,
  logout,
  changeUpdateStatus,
} = userSlice.actions;

export default userSlice.reducer;
