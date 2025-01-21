import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Authentication/login';
import Logo from '../assets/internGo.png';
import { Image } from 'react-native';
import SignUp from '../screens/Authentication/signup';
import DashBoard from '../screens/dashboard/DashBoard';
const Stack = createStackNavigator();
function Route() {
  return (
  <Stack.Navigator>
    
      <Stack.Screen name='signup' options={{
      headerTitle:()=>{
        return <Image source={Logo} style={{ width: 350, height: 100 }} resizeMode="contain"/>
      },
      headerLeft:null
    }} component={SignUp}/>

    <Stack.Screen name='login' options={{
      headerTitle:()=>{
        return <Image source={Logo} style={{ width: 350, height: 100 }} resizeMode="contain"/>
      },
      headerLeft:null
    }} component={Login}/>

      <Stack.Screen name='dashboard' options={{
      headerTitle:'DashBoard',
      headerLeft:null
    }} component={DashBoard}/>

   </Stack.Navigator>
  )
}

export default Route