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
    priority: 'LOW',
    recepient: 'Admins', 
  });

  const mentors = useSelector(state => state.mentors?.mentors)?.map(val => val.name);
  const userId = useSelector(state=>state.auth?.data?.data?.userId);
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
    const { subject, description ,recepientId,recepient} = formData; 
    
    if (subject === '' || description === '') {
      showToast('error', 'Please fill all details');
      return;
    }    
    if(recepient=='Mentors'&&recepientId==''){
      showToast('error', 'Please choose mentor');
      return;
    }
    try {
      const response = await axiosInstance.post(`api/helpdesk/`,{ userId:userId,...formData,resolvedStatus:'PENDING'});
      if (response) {
        showToast('success', 'Your request is submitted. Thank you!');
        setFormData({
          subject: '',
          description: '',
          priority: 'LOW',
          recepient: 'Admins', 
        })
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
             mode='dropdown'
          >
            <Picker.Item label="LOW" value="LOW" />
            <Picker.Item label="MEDIUM" value="MEDIUM" />
            <Picker.Item label="HIGH" value="HIGH" />
          </Picker>
        </View>

        <Text style={styles.label}>Raise Help To</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.recepient}
            onValueChange={(value) => handleChange('recepient', value)}
             mode='dropdown'
          >
            <Picker.Item label="Admin" value="Admins" />
            <Picker.Item label="Mentor" value="Mentors" />
          </Picker>
        </View>

        {formData.recepient === 'Mentors' && (
          <>
            <Text style={styles.label}>Select Mentor</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.recepientId}
                onValueChange={(value) => handleChange('recepientId', value)}
                mode='dropdown'
              >
                <Picker.Item  label='Select mentor' value='' enabled={false}/>
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
