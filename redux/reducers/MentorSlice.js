import { createSlice } from "@reduxjs/toolkit";

const MentorSlice = createSlice({
    name:'mentors',
    initialState:{
        mentors:[]
    },
    reducers:{
        setMentors:(state,action)=>{
            state.mentors=action.payload
        }, 
        removeMentors:(state)=>{
            state.notifications =[]
        } 
    }
})

export const {setMentors,removeMentors } = MentorSlice.actions;
export default MentorSlice.reducer