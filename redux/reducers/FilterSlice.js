import { createSlice } from "@reduxjs/toolkit";

const FilterSlice = createSlice({
    name:'filters',
    initialState:{
        filters:{}
    },
    reducers:{
        setFilters:(state,action)=>{
            state.filters=action.payload
        }, 
        removeFilters:(state)=>{
            state.filters ={}
        } 
    }
})

export const {setFilters,removeFilters } = FilterSlice.actions;
export default FilterSlice.reducer