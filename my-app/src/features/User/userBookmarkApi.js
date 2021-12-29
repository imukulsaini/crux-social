import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserBookmark = createAsyncThunk(
  "userBookmark/getUserBookmark",
  async (apiPermission) => {
    const { token, userID } = apiPermission;
    const url = `https://media.imukulsaini.repl.co/v1/${userID}/bookmarks`;
    const headers = {
      authorization: token,
    };
    const userResponse = await axios.get(url, { headers });
    console.log('user Bookmark is = ',userResponse.data.bookmarks[0])
    return userResponse.data.bookmarks[0];
  }
);

export const addBookmark = createAsyncThunk(
  "userBookmark/addBookmark",
  async (postPermission) => {

    const { token, userID, postID } = postPermission;

    const url = `https://media.imukulsaini.repl.co/v1/${userID}/bookmarks`;
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
    const url = `https://media.imukulsaini.repl.co/v1/${userID}/bookmarks`;
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
