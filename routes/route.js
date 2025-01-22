import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Authentication/login';
import Logo from '../assets/internGo.png';
import { Image } from 'react-native';
import SignUp from '../screens/Authentication/signup';
import DashBoard from '../screens/dashboard/DashBoard';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const Stack = createStackNavigator();
function Route() { 
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <NavigationContainer>
    <Stack.Navigator>
    {!auth ? (
      <>
        <Stack.Screen
          name="signup"
          options={{
            headerTitle: () => (
              <Image
                source={Logo}
                style={{ width: 350, height: 100 }}
                resizeMode="contain"
              />
            ),
            headerLeft: null,
          }}
          component={SignUp}
        />
        <Stack.Screen
          name="login"
          options={{
            headerTitle: () => (
              <Image
                source={Logo}
                style={{ width: 350, height: 100 }}
                resizeMode="contain"
              />
            ),
            headerLeft: null,
          }}
          component={Login}
        />
      </>
    ) : (
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown:false 
        }}
        component={DashBoard}
      />
    )}
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Route