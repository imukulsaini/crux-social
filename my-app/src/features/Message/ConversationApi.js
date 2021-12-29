import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getConversation = createAsyncThunk("conversation/getConversation" , async (userData)=>{
    const { token , userID } = userData;

    const url =`https://media.imukulsaini.repl.co/v1/${userID}/conversation`;

    const headers = {
        authorization:token 
    }

    const conversationResponse = await axios.get(url,{headers},{
        data:{
            userID:userID

        }
    })
    
    return conversationResponse.data;

}) 