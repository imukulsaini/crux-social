import { createSlice } from "@reduxjs/toolkit";
import { checkUserCredentials  } from "./userApi";


const initialState= {
    userData:[],
    token:'',
    userID:'',
    status:'idle'
}

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        
    },
    extraReducers:{
        [checkUserCredentials.pending] :(state ,action)=>{
            state.status = 'loading'
        },
        [checkUserCredentials.fulfilled]: (state,action)=>{
            state.token = action.payload.token 
            state.status = 'fulfilled'
        },
        [checkUserCredentials.rejected]:(state,action)=>{
            state.status = 'error'
        }
    }
})

export default userSlice.reducer;
