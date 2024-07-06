import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name:"",
    party:"",
    votes:[],
    voteCount: null
}

export const userSlice = createSlice({
    name:'user_info',
    initialState,
    reducers:{
        setUserInfo:(state , action)=>{
            state.name = action.payload.name
            state.party = action.payload.party
            state.votes = action.payload.votes
            state.voteCount = action.payload.voteCount
        },
        unsetUserInfo:(state , action)=>{ 
            state.name = action.payload.name
            state.party = action.payload.party
            state.votes = action.payload.votes
            state.voteCount = action.payload.voteCount
        }
    }
}) 

export const {setUserInfo , unsetUserInfo} = userSlice.actions

export default userSlice.reducer