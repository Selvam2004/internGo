import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react' 
import ErrorPage from '../User/Error';
import InteractionCard from '../../components/interactions/InteractionCard';
import { axiosInstance } from '../../utils/axiosInstance';
import { useSelector } from 'react-redux';


export default function Interactions() { 
  const [error, setError] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [interactions, setInteractions] = useState([]); 
  const {userId } = useSelector(state=>state.auth.data?.data); 
  const fetchInteractions = async()=>{
    try{
      setError(false);
      setLoading(true);
      const response = await axiosInstance.get(`/api/interactions/${userId}`);
      if(response){           
        setInteractions(response.data.data?.interactionsAttended||[]);     
      }
    }
    catch(err){
      console.log(err.response.data?.message);
      setError(true);
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchInteractions();
  },[])
  return (
    <View style={styles.container}>
      {error?<ErrorPage onRetry={fetchInteractions}/>:
      <>
      <Text style={styles.header}>Interactions</Text>
 
      { 
      loading?<View style={{justifyContent:'center',height:500}}><Text style={{textAlign:'center'}}>Loading...</Text></View>:
        <>
        {interactions&&interactions.length>0?
        <>{interactions.map(intr=>(
             <InteractionCard key={intr.id} interaction={intr}/>
        ))}</>
        :
        <View style={{height:500,justifyContent:'center'}}><Text style={{fontSize:15,fontWeight:'400',textAlign:'center'}}>No Interactions Available</Text></View>}
        </>
      }
      </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:20
  },
  header:{
    fontSize:20,
    marginBottom:10,
    fontWeight:'bold'
  }, 
})