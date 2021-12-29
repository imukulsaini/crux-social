import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const createNewPost = createAsyncThunk(
  
  "posts/createNewPost",
  async (newPostData) => {

    const { userID, token, imageUrl, caption } = newPostData;
    const postData = { caption: caption, imageUrl: imageUrl };

    const headers = {
      authorization: token,
    };

    const url = `https://media.mukulsaini02.repl.co/v1/${userID}/posts`;
    const postResponse = await axios.post(url, { postData }, { headers } );

    return postResponse.data;
  }
);



export const getTimelinePosts = createAsyncThunk("posts/getTimelinePosts" , async (postPermission)=>{
  const { userID ,  token  } = postPermission;
  const url = `https://media.imukulsaini.repl.co/v1/${userID}/timeline`;

  const headers = {
    authorization: token,
  };
  const postResponse = await axios.get(url,{ headers })
  console.log(postResponse.data)
  return postResponse.data;
})



export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (postPermission) => {
    const { userID, token } = postPermission;
    const headers = {
      authorization: token,
    };
    console.log(userID, token);
    const url = `https://media.imukulsaini.repl.co/v1/${userID}/posts/`;
    const postResponse = await axios.get(url, { headers });
    return postResponse.data.posts;
  }
);

export const getPostByID = createAsyncThunk(
  "posts/getPostByID",
  async (postPermission) => {
    const {token,postID } = postPermission;
    const headers = {
      authorization: token,
    };
    const url = `https://media.imukulsaini.repl.co/v1/posts/${postID}`;
    const postResponse = await axios.get(url, { headers });
    console.log(postResponse,'postIDvala')
    return postResponse.data.posts;
  }
);

