import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { createNewComment ,getPostComments} from './PostCommentsApi';


const initialState = {

comments:[],
status:'idle'

}


export const commentSlice = createSlice({
    name:'postComment',
    initialState,
    reducers:{

        newCommentIsAdded:(state,action)=>  {
            
          
            state.comments.push(action.payload)

        }

    },
    extraReducers:{
        [createNewComment.pending ] :(state ,action)=>{
            state.status = 'loading'
        },
        [createNewComment.fulfilled]: (state,action)=>{
            
            // state.comments = action.payload.comments
            state.status = 'fulfilled';

        },
        [createNewComment.rejected]:(state,action)=>{
            state.status = 'error'
        },

        [getPostComments.pending ] :(state ,action)=>{
            state.status = 'loading'
        },
        
        [getPostComments.fulfilled]: (state,action)=>{
            state.status = 'fulfilled';

            state.comments = action.payload.comments;

        },
        [getPostComments.rejected]:(state,action)=>{
            state.status = 'error'
        },
    }
})

export const { newCommentIsAdded } = commentSlice.actions

export default commentSlice.reducer;
