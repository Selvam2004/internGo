import { View, Text, StyleSheet ,Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import Intro from '../../components/profile/Intro'
import PersonalDetails from '../../components/profile/PersonalDetails'
import CompanyDetails from '../../components/profile/CompanyDetails'
import { useSelector } from 'react-redux'
import { axiosInstance } from '../../utils/axiosInstance'
import ErrorPage from '../User/Error'
import ProgressBarCard from '../../components/profile/ProgressBar'
import AddressDetails from '../../components/profile/AddressDetails'
import EducationalDetails from '../../components/profile/EducationalDetails'
import BankDetails from '../../components/profile/BankDetails'
import AssetDetails from '../../components/profile/AssetDetails'


export default function SpecificProfile({route}) {
  const {userId} = route.params; 
  const {userId:id,token} = useSelector((state)=> state.auth.data?.data);   
  const [currentUser,setCurrentUser] = useState('');
  const [error,setError] = useState(false); 
  const [loading,setLoading] = useState(false); 

  const fetchUser = async()=>{
    try{
      setLoading(true);
      setError(false);
      console.log(token);
      const response = await axiosInstance.get(`/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      ); 
       if(response.data.data){
        setCurrentUser(response.data.data);
        console.log(currentUser.email,email);
       }
    }
    catch(error){
      console.log(error);
      setError(error.response.data.message)
    }
    finally{
      setLoading(false);
    }

  }
 
  useEffect(()=>{
    fetchUser();
  },[])
  const props = {
    user: currentUser ,
    token: token,
    fetchUser: fetchUser , 
    edit: false,
  };
  return (
    <ScrollView style={styles.container}>
      {error === false ? (
        <View>
          <Intro  {...props}/>
          <ProgressBarCard progress={currentUser.profilePercentage}/>
          <PersonalDetails  {...props}/>
          <AddressDetails {...props}/>
          <EducationalDetails {...props}/>
          <BankDetails {...props}/>
          <AssetDetails {...props} asset={currentUser.asset}/>
          <CompanyDetails  {...props} />
        </View>
      ) : (
        <ErrorPage onRetry={fetchUser} />
      )}
            {loading && (
                <View style={styles.loadingContainer}> 
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>loading...</Text>
                </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
    marginTop:10
  },   
  loadingContainer: {
    position: 'absolute',
    flexDirection:'row',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    zIndex: 1,  
},
loadingText: { 
    padding:5,
    fontSize: 16,
    color: '#000',  
}
})