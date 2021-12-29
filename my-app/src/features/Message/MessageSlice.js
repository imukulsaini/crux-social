import { createSlice } from "@reduxjs/toolkit";
import { getUserMessage , sendNewMessage  } from "./MessageApi";

const initialState ={

    status:'idle',
    messages:[],
    
}

const messageSlice = createSlice({
    name:'message',
    initialState,
    reducers:{
        
        newMessageReceived: (state , action)=>{
            state.messages.push(action.payload)
        }
    },
    extraReducers:{

        [getUserMessage.pending ] :(state ,action)=>{
            state.status = 'loading'
        },
        [getUserMessage.fulfilled]: (state,action)=>{
            state.messages = action.payload.messages;
            state.status = 'fulfilled';

        },
        [getUserMessage.rejected]:(state,action)=>{
            state.status = 'error'
        },

        [sendNewMessage.pending ] :(state ,action)=>{
            state.status = 'loading'
        },
        [sendNewMessage.fulfilled]: (state,action)=>{
            state.status = 'fulfilled';
            state.messages.push(action.payload.message); 

        },
        [sendNewMessage.rejected]:(state,action)=>{
            state.status = 'error'
        },
    }
})
export const { newMessageReceived } = messageSlice.actions
export default messageSlice.reducer;
