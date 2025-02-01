import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import CreateCard from "../../components/plans/CreateCard";
import Plans from "../../components/plans/Plans";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../utils/axiosInstance";
import ErrorPage from "../User/Error";


export default function CreatePlan() {
  const {token} = useSelector((state)=>state.auth.data?.data);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [plans,setPlans] = useState([]);

  const fetchPlans  = async()=>{
    try{
      setLoading(true);
      setError(""); 
      console.log(`Bearer ${token}`);
      const response = await axiosInstance.get('/api/plans')
      if(response){
        console.log(response.data.data);
        setPlans(response.data.data);
      }
    }
    catch(err){
      console.log(err.response);
      setError(err.response);
    }
    finally{
      setLoading(false);
    }
  }
  
  useEffect(()=>{
    fetchPlans();
  },[])
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loading?(
                <View style={styles.loadingContainer}> 
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>loading...</Text>
                </View>
             ):
      error?<ErrorPage onRetry={fetchPlans}/>:
      <View>
      <Text style={styles.heading}>Create</Text>
      <CreateCard token={token} fetchPlans={fetchPlans}/>
      <Plans token={token} plan={plans}/>
      </View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex:1,
    padding:20
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom:10
  },
  loadingContainer: {
    position: 'absolute',
    flexDirection:'row',
    top: 300,
    left:120,
    justifyContent: 'center',
    alignItems: 'center', 
    zIndex: 1,  
},
loadingText: { 
    padding:5,
    fontSize: 16,
    color: '#000',  
}
});
