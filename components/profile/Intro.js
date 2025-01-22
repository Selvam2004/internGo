import { View, Text, StyleSheet ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import Photo from '../../assets/photo.png'
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
export default function Intro() {
    const handleEditPress = async () => {
        try {
          const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1, // Allows selecting only one image
          });
      
          if (result.didCancel) {
            console.log('User cancelled image picker');
          } else if (result.errorMessage) {
            console.error('ImagePicker Error:', result.errorMessage);
          } else if (result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            console.log('Selected Image URI:', uri);
            // Update your UI or state with the selected image URI
          }
        } catch (error) {
          console.error('An error occurred while picking the image:', error);
        }
      };
  return (
    <View style={styles.profileCnt}>
    <View style={styles.imageContainer}>
      <Image source={Photo} style={styles.profile} />
      <TouchableOpacity onPress={handleEditPress}>
        <Icon name="edit" style={styles.editIcon} size={24} color="white" />
      </TouchableOpacity>
    </View>

    <View style={{marginLeft:15,marginTop:5,overflow:'hidden'}}>

       <Text style={{fontWeight:'bold',fontSize:20}}>Profile</Text>
       <Text style={{fontSize:15 ,color:'green',fontWeight:'600',marginTop:5}}>Selvam S</Text>
       <Text style={{fontSize:12,marginTop:5}}>selvam@finestcoder.com</Text>
       <Text style={{fontSize:12,marginTop:5}}>Phase 1 Batch 1</Text>
       <Text style={{fontSize:12,marginTop:5}}>Front-end Developer</Text>         

    </View>
    
  </View>
  )
}

const styles = StyleSheet.create({
    profile:{
        width: 130, 
        height: 130, 
        borderRadius: 75, 
        borderWidth: 2,
        borderColor: '#ccc',
      },
    profileCnt:{
        backgroundColor:'white',
        paddingVertical:20,
        paddingLeft:10,
        borderRadius:20,
        flexDirection:'row'
      },
      imageContainer: {
        position: 'relative',
      },
      editIcon: {
        position: 'absolute',
        left: 100,  
        bottom: 12.5,  
        backgroundColor: '#6200EE', 
        borderRadius: 20,  
        padding: 3,
        elevation: 5, 
      },
})