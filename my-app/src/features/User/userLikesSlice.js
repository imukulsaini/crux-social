import { createSlice } from "@reduxjs/toolkit";

import { checkUserCredentials , getUserLikes ,likePost ,unLikePost} from "./userLikesApi";


const initialState= {

    userLikes:[],
    status:'idle',
    error:null,
   
}

const userLikesSlice = createSlice({
    
    name:'usersLikes',
    initialState,

    reducers: {},

    extraReducers:{


        [getUserLikes.pending ] :(state ,action)=>{
            state.status = 'loading'
        },
        [getUserLikes.fulfilled]: (state,action)=>{
            
            state.userLikes = action.payload.posts
            
            state.status = 'fulfilled';
        },
        [getUserLikes.rejected]:(state,action)=>{
            state.status = 'error'
        },


        [likePost.pending]:(state,action)=>{
            state.status = 'loading'
        },
        [likePost.fulfilled]:(state,action)=>{
            

            state.status = 'fulfilled';
        },
        [likePost.rejected]:(state,action)=>{
            state.status = 'error'
        },


        [unLikePost.pending]:(state,action)=>{
            state.status = 'loading'
        },
        [unLikePost.fulfilled]:(state,action)=>{
            state.status = 'fulfilled';
            const findRemovePostInUserLike = state.userLikes.findIndex(
                post => post._id === action.payload.postID
              ) 
              if(findRemovePostInUserLike !== -1){
                state.userLikes.splice(findRemovePostInUserLike,1)
              }
        },
        [unLikePost.rejected]:(state,action)=>{
            state.status = 'error'
        }
    }
})

export default userLikesSlice.reducer;
