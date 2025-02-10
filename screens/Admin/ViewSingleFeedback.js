import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Rating } from 'react-native-ratings';  


export default function ViewSingleFeedback({route}) {
  const id = route.params.id;   
  const [feedback, setFeedback] = useState({});
  const [description, setDescription] = useState('');   
 

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Feedback</Text> 
 
      {  Object.keys(feedback).map((item, index) => (
        <View key={index} style={[styles.card,{flexDirection:'row',justifyContent:'space-between'}]}>
          <Text style={styles.label}>{item}</Text>
          <Rating
            type='star'
            ratingCount={5}
            imageSize={20}
            startingValue={feedback[item] ?? 0}
            jumpValue={0.5}
            fractions={1} 
            onFinishRating={(rating) => updateRating(item, rating)} 
          />
        </View>
      ))} 

        <View style={styles.card}>
          <Text style={styles.label}>Overall Description</Text>
          <TextInput 
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.textInput}
            multiline
          /> 
        </View>  
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
    fontSize: 16,
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
});
