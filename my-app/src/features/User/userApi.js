import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const checkUserCredentials = createAsyncThunk("users/fetchUsers" , async (loginFormData )=>{
    const { username , password } = loginFormData;
    
    const url = 'https://media.imukulsaini.repl.co/login'
    const userResponse = await axios.post(url,{
        username:username,
        password:password
    });
    return userResponse.data;
})