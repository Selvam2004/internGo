import React, { useEffect, useState } from 'react';
import {
  View,
  Text, 
  ScrollView, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Rating } from 'react-native-ratings';  
import ErrorPage from '../../components/error/Error';
import { axiosInstance } from '../../utils/axiosInstance';
import SpiderChart from '../../components/feedback/spiderGraph';
import PerformanceChart from '../../components/Analytics/LineChart'; 
import InteractionAttendedCard from '../../components/Analytics/InteractionAttended';
import  Icon  from 'react-native-vector-icons/Entypo';

export default function SpecificAnalytics({route}) {
  const id = route.params.userId;   
  const [feedback, setFeedback] = useState({});
  const [interaction, setInteraction] = useState([]);
  const [description, setDescription] = useState('');   
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false); 
  useEffect(()=>{
    fetchInteraction();
  },[])
  const fetchInteraction = async()=>{
    try{
      setError(false);
      setLoading(true);
      const response = await axiosInstance.get(`api/feedbacks/intern/${id}`);
      if(response){
        const data = response?.data?.data; 
        const dt ={};
        data.forEach(fb => {
            dt[fb.interaction.name]=fb.avg_rating
        });          
        setInteraction(data)
         setFeedback(dt)
      }
    }
    catch(err){
      setError(true);        
      console.log(err?.response?.data?.message);      
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
            {error?<ErrorPage onRetry={fetchInteraction}/>:
      loading?<View style={{height:500,justifyContent:'center'}}><Text style={{fontWeight:'600',textAlign:'center'}}>Loading...</Text></View>:
      <View style={{marginBottom:20}}> 
      <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            color: "#000000",
            marginBottom: 10,
          }}
        >
          Performance Analysis
        </Text>
       {Object.keys(feedback).length>0&&<PerformanceChart data={feedback}/>}

        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
            <TouchableOpacity>
       <View style={styles.downloadButton}>
        <Text style={{color:'white',fontWeight:'600',fontSize:16,paddingRight:5}}>Download</Text>
        <Icon name='download' color={'white'} size={18}/>
        </View>
        </TouchableOpacity>
        </View>


       <View style={{marginTop:10}}> 
          <Text style={styles.label}>Interactions Attended:</Text> 
          {interaction.length>0&&interaction.map((intr,index)=>(<InteractionAttendedCard key={index} interaction={intr.interaction}/>))}
        </View>

 


        </View>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    minHeight: 80,
    textAlignVertical: 'top',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  downloadButton:{
    flexDirection:'row',
    backgroundColor:'#007BFF',   
    marginTop:15,
    padding:5,
    borderRadius:5,
}
});
