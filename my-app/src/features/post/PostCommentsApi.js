import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


export const createNewComment = createAsyncThunk(
  
  "posts/createNewComment",
  async (newCommentData) => {
    console.log('async function me h')
    const { postID,userID, token, comment} = newCommentData;



    const headers = {
      authorization: token,
    };


    const url = `https://media.imukulsaini.repl.co/v1/posts/${postID}/comments`;
    const postResponse = await axios.post(url,{comment:comment,commentBy:userID},{headers})
    return postResponse.data.comments;
  }
);




export const getPostComments = createAsyncThunk(
  "posts/getPostComments",
  async (postCommentPermission) => {
    const  {postID}  = postCommentPermission;
    const url = `https://media.imukulsaini.repl.co/v1/posts/${postID}/comments`;
    const postResponse = await axios.get(url)
    console.log('post comments',postResponse)
    return postResponse.data.comments[0];
  }
);
