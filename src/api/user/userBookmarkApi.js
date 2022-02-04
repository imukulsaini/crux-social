import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../utils";

export const getUserBookmark = createAsyncThunk(
  "userBookmark/getUserBookmark",
  async (apiPermission) => {
    const { token, userID } = apiPermission;
    const url = `${API_KEY}/users/${userID}/bookmarks`;
    const headers = {
      authorization: token,
    };
    const userResponse = await axios.get(url, { headers });
    return userResponse.data.bookmarks[0];
  }
);

export const saveBookmark = createAsyncThunk(
  "userBookmark/saveBookmark",
  async (postPermission) => {
    const { token, userID, postID } = postPermission;
    const url = `${API_KEY}/users/${userID}/bookmarks`;
    const headers = {
      authorization: token,
    };

    const userResponse = await axios.post(url, { postID }, { headers });
    return userResponse.data;
  }
);

export const removeBookmark = createAsyncThunk(
  "userBookmark/removeBookmark",
  async (postPermission) => {
    const { token, userID, postID } = postPermission;
    const url = `${API_KEY}/users/${userID}/bookmarks`;
    const headers = {
      authorization: token,
    };

    const userResponse = await axios.delete(url, {
      headers,
      data: {
        postID,
      },
    });
    return userResponse.data;
  }
);
