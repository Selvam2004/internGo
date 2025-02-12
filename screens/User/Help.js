import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

export default function Help() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [recipient, setRecipient] = useState('Admin');
  const [selectedMentor, setSelectedMentor] = useState('');

  const mentors = useSelector(state=>state.mentors?.mentors)?.map(val=>val.name); 
  
  const handleSubmit = () => {
    console.log({ subject, description, priority, recipient, selectedMentor });
    alert('Help request submitted!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Raise a Help Request</Text>

      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter subject"
        value={subject}
        onChangeText={setSubject}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={priority} onValueChange={setPriority}>
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>

      <Text style={styles.label}>Raise Help To</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={recipient} onValueChange={setRecipient}>
          <Picker.Item label="Admin" value="Admin" />
          <Picker.Item label="Mentor" value="Mentor" />
        </Picker>
      </View>

      {recipient === 'Mentor' && (
        <>
          <Text style={styles.label}>Select Mentor</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={selectedMentor} onValueChange={setSelectedMentor}>
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
