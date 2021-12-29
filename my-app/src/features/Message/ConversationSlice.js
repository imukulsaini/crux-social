import { createSlice } from "@reduxjs/toolkit";
import  {getConversation} from "./ConversationApi";

const initialState ={

    status:'idle',
    members:[],
    conversationRoom:[],
    
}

const conversationSlice = createSlice({
    name:'conversation',
    initialState,
    reducers:{

    },
    extraReducers:{

        [getConversation.pending ] :(state ,action)=>{
            state.status = 'loading'
        },
        [getConversation.fulfilled]: (state,action)=>{

            state.status = 'fulfilled';

            state.conversationRoom = action.payload.conversation;
        },
        [getConversation.rejected]:(state,action)=>{
            state.status = 'error'
        },
    }
})

export default conversationSlice.reducer;
