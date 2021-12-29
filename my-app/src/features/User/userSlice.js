import { createSlice } from "@reduxjs/toolkit";

import { checkUserCredentials , getUserData , createNewUser ,updateUserData} from "./userApi";


const initialState= {

    userData:[],
    token:'',
    userID:'',
    status:'idle',
    isUserLogin:false,

    userInfoFromSearch:[]
    
}

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        
    },
    extraReducers:{

        [checkUserCredentials.pending ] :(state ,action)=>{
            state.status = 'loading'
        },
        [checkUserCredentials.fulfilled]: (state,action)=>{
            
            state.status = 'fulfilled';

            state.userID = action.payload.userData._id;
            state.userData = action.payload.userData

            state.token = action.payload.token ;
            state.isUserLogin = true;


        },
        [checkUserCredentials.rejected]:(state,action)=>{
            state.status = 'error'
        },

        [getUserData.pending]:(state,action)=>{
            state.status = 'loading'
        },
        [getUserData.fulfilled]:(state,action)=>{
            
            state.userID = action.payload.userData._id;
            state.isUserLogin = true;
            state.userData = action.payload.userData
            state.status = 'fulfilled';
        },
        [getUserData.rejected]:(state,action)=>{
            state.status = 'error'
        },
        
        [createNewUser.pending]:(state,action)=>{
            state.status = 'loading'
        },
        [createNewUser.fulfilled]:(state,action)=>{
            
            state.userID = action.payload.userData._id;
            state.isUserLogin = true;
            state.userData = action.payload.userData
            state.token = action.payload.token ;

            state.status = 'fulfilled';
        },
        [createNewUser.rejected]:(state,action)=>{
            state.status = 'error'
        },

        [updateUserData.pending]:(state,action)=>{
            state.status = 'loading'
        },
        [updateUserData.fulfilled]:(state,action)=>{
            
            
            state.userData = action.payload.userData;
            state.status = 'fulfilled';
        },
        [updateUserData.rejected]:(state,action)=>{
            state.status = 'error'
        }


    }
})

export default userSlice.reducer;
