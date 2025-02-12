import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
    name:'notifications',
    initialState:{
        notifications:[],
        announcement:[]
    },
    reducers:{
        setNotifications:(state,action)=>{
            state.notifications=action.payload
        },
        addNotification:(state,action)=>{
            state.notifications.unshift(action.payload)
        },
        removeNotification:(state,action)=>{
            state.notifications = state.notifications.filter(n=>n.id!=action.payload)
        },
        markAsRead:(state)=>{
            state.notifications=state.notifications.map(n=>({...n,isRead:true}));
        },
        clearAllNotifications:(state)=>{
            state.notifications=[]
        },
        setAnnouncement:(state,action)=>{
            state.announcement=action.payload
        },
        addAnnouncement:(state,action)=>{
            state.announcement.unshift(action.payload)
        },
    }
})

export const {setNotifications,addNotification,markAsRead,removeNotification,clearAllNotifications,setAnnouncement,addAnnouncement} = NotificationSlice.actions;
export default NotificationSlice.reducer