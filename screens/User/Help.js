import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { axiosInstance } from '../../utils/axiosInstance';

export default function Help() {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'Low',
    recipient: 'Admin',
    selectedMentor: '',
  });

  const mentors = useSelector(state => state.mentors?.mentors)?.map(val => val.name);
  
  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: 'Help Request',
      text2: message,
      position: "top",
      swipeable: true,
      visibilityTime: 1500,
    });
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { subject, description ,mentor} = formData;
    
    if (subject === '' || description === ''||mentor=='') {
      showToast('error', 'Please fill all details');
      return;
    }
    
    try {
      const response = await axiosInstance.post(``, formData);
      if (response) {
        showToast('success', 'Your request is submitted. Thank you!');
      }
    } catch (err) {
      const msg = JSON.stringify(err?.response?.data?.message) || 'Help request not submitted';
      showToast('error', msg);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.header}>Raise a Help Request</Text>

        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter subject"
          value={formData.subject}
          onChangeText={(value) => handleChange('subject', value)}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter description"
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(value) => handleChange('description', value)}
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.priority}
            onValueChange={(value) => handleChange('priority', value)}
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </View>

        <Text style={styles.label}>Raise Help To</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.recipient}
            onValueChange={(value) => handleChange('recipient', value)}
          >
            <Picker.Item label="Admin" value="Admin" />
            <Picker.Item label="Mentor" value="Mentor" />
          </Picker>
        </View>

        {formData.recipient === 'Mentor' && (
          <>
            <Text style={styles.label}>Select Mentor</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.selectedMentor}
                onValueChange={(value) => handleChange('selectedMentor', value)}
              >
                {mentors.map((mentor, index) => (
                  <Picker.Item key={index} label={mentor} value={mentor} />
                ))}
              </Picker>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#007BFF',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
