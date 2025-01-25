import { View, Text, StyleSheet ,Image, TouchableOpacity, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Intro from '../../components/profile/Intro'
import PersonalDetails from '../../components/profile/PersonalDetails'
import CompanyDetails from '../../components/profile/CompanyDetails'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../../utils/axiosInstance'
import ErrorPage from './Error'


export default function Profile() {
  const {userId,email,token} = useSelector((state)=> state.auth.data?.data);   
  const [currentUser,setCurrentUser] = useState('');
  const [error,setError] = useState(false); 

  const fetchUser = async()=>{
    try{
      const response = await axiosInstance.get(`/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      ); 
       if(response.data.data){
        setCurrentUser(response.data.data);
        console.log(response.data.data);
       }
    }
    catch(error){
      console.log(error.response.data.message);
    }
    

  }
 
  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <ScrollView style={styles.container}>
      {error === false ? (
        <View>
          <Intro user={currentUser} token={token} fetchUser={fetchUser} edit={email==currentUser.mail}/>
          <PersonalDetails  user={currentUser} token={token} fetchUser={fetchUser} edit={email==currentUser.mail}/>
          <CompanyDetails  user={currentUser}/>
        </View>
      ) : (
        <ErrorPage onRetry={fetchUser} />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
    marginTop:10
  },   
})