import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react' 
import  Icon  from 'react-native-vector-icons/Entypo';

export default function DownlodReport({id}) {
    
    const handleDownload = async()=>{
        try{
          Linking.openURL(`https://interngo.onrender.com/api/feedbacks/${id}/download`)           
        }
        catch(err){
          console.log(err);      
        }
      }
      
  return (
    <View>
             <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
        <TouchableOpacity onPress={handleDownload}>
         <View style={styles.downloadButton}>
         <Text style={{color:'white',fontWeight:'600',fontSize:16,paddingRight:5}}>Download</Text>
         <Icon name='download' color={'white'} size={18}/>
         </View>
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    downloadButton:{
        flexDirection:'row',
        backgroundColor:'#007BFF',   
        marginTop:15,
        padding:5,
        borderRadius:5,
    }
})