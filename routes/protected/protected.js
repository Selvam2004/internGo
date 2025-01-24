import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DashBoard from '../../screens/dashboard/DashBoard';
import Batches from '../../components/records/Batches'
import UserTable from '../../components/records/UserTable'
import { useSelector } from 'react-redux';
import NoPermission from '../../screens/User/NoPermission';
import Profile from '../../screens/User/Profile';

const tabs = [
    {name : 'Batches',permission:'profile.update',component:Batches},
    {name : 'Users',permission:'profile.update',component:UserTable},
    {name : 'User',permission:'profile.update',component:Profile},
]

const Stack = createStackNavigator();
export default function Protected() {
  const data = useSelector(state=>state.auth.data?.data?.permissions); 
  const permission = data || null;
  return (
    <Stack.Navigator>
        <Stack.Screen name='dashboard' options={{headerShown:false}} component={DashBoard}/> 
        {Array.isArray(permission) && permission.length>0 ? tabs.map((tab, id) => {
        return (
          permission.includes(tab.permission) && (
            <Stack.Screen name={tab.name} component={tab.component} key={id}  />
          )
        );
         }):<Stack.Screen name='Blank' component={NoPermission}/>} 
    </Stack.Navigator>
  )
}