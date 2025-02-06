import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Checkbox } from 'react-native-paper';

export default function GiveFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [description, setDescription] = useState('');
  const [showParameters, setShowParameters] = useState(true); // State to track visibility of parameters
 
  const parameters = [
    'Communication',
    'Problem Solving',
    'Real-time Scenario',
    'Leadership',
    'Teamwork',
    'Adaptability',
    'Creativity',
    'Technical Knowledge',
    'Decision Making',
    'Time Management',
  ];
 

  const toggleSelection = (param) => {
    setFeedback((prevFeedback) => {
      if (prevFeedback.some((item) => item.param === param)) {
        return prevFeedback.filter((item) => item.param !== param);
      } else {
        return [...prevFeedback, { param, rating: 0 }];
      }
    });
  };

  const handleSubmitCheckboxes = () => { 
    setShowParameters(false);  
  };

  const updateRating = (param, rating) => {
    setFeedback((prevFeedback) =>
      prevFeedback.map((item) =>
        item.param === param ? { ...item, rating } : item
      )
    );
  };

  const handleSubmitFeedback = () => {
    // Handle the overall feedback submission logic here
    console.log('Overall Feedback:', description);
    console.log('Ratings:', feedback);
    // Reset the form if needed
    setFeedback([]);
    setDescription('');
    setShowParameters(true); // Show parameters again for new feedback
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Give Feedback</Text>

      {/* Parameter Selection */}
      {showParameters && (
        <View style={styles.card}>
          <Text style={styles.label}>Select Parameters</Text>
          {parameters.map((param, index) => (
            <View key={index} style={styles.checkboxContainer}>
    <Checkbox
      status={feedback.some((item) => item.param === param) ? 'checked' : 'unchecked'}
      onPress={() => toggleSelection(param)}
    />
    <Text>{param}</Text>
            </View>
          ))}

          {/* Submit Button for Checkbox Selection */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitCheckboxes}>
            <Text style={styles.submitButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Feedback List (only if all required checkboxes are selected) */}
      {!showParameters  && feedback.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.label}>{item.param}</Text>
          <AirbnbRating
            count={5}
            defaultRating={item.rating}
            size={20}
            showRating={false}
            onFinishRating={(rating) => updateRating(item.param, rating)}
          />
        </View>
      ))}

      {/* Overall Description and Submit Button */}
      {!showParameters   && (
        <View style={styles.card}>
          <Text style={styles.label}>Overall Description</Text>
          <TextInput
            placeholder="Enter your overall feedback..."
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.textInput}
            multiline
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      )}
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
