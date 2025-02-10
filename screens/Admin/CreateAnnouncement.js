import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

export default function CreateAnnouncement() {
  const [announcement, setAnnouncement] = useState('');
  const [selectedCommon, setSelectedCommon] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const isSpecific = selectedCommon === 'specific';

  const showToast = (state, message) => {
    Toast.show({
      type: state,
      text1: 'Announcement',
      text2: message,
      position: 'bottom',
      swipeable: true,
      visibilityTime: 1500,
    });
  };

  const handleSubmit = () => {
    if (!announcement.trim()) {
      showToast('error', 'Please enter an announcement message!');
      return;
    }
    if (isSpecific && (!selectedBatch || !selectedDesignation || !selectedRole)) {
      showToast('error', 'Please select all fields for specific announcements!');
      return;
    }

    showToast('success', 'Announcement Created Successfully! ✅');

    // Reset fields after submission
    setAnnouncement('');
    setSelectedCommon('all'); // Reset to default
    setSelectedBatch('');
    setSelectedDesignation('');
    setSelectedRole('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create Announcement</Text>

      {/* Common Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Common:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCommon}
            onValueChange={(itemValue) => setSelectedCommon(itemValue)}
          >
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Specific" value="specific" />
          </Picker>
        </View>
      </View>

      {/* Batch Field (Disabled unless Specific is selected) */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Batch:</Text>
        <View style={[styles.pickerContainer, !isSpecific && styles.disabledPicker]}>
          <Picker
            selectedValue={selectedBatch}
            enabled={isSpecific}
            onValueChange={(itemValue) => setSelectedBatch(itemValue)}
          >
            <Picker.Item label="Select Batch" value="" />
            <Picker.Item label="Batch 1" value="batch1" />
            <Picker.Item label="Batch 2" value="batch2" />
            <Picker.Item label="Batch 3" value="batch3" />
          </Picker>
        </View>
      </View>

      {/* Designation Field (Disabled unless Specific is selected) */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Designation:</Text>
        <View style={[styles.pickerContainer, !isSpecific && styles.disabledPicker]}>
          <Picker
            selectedValue={selectedDesignation}
            enabled={isSpecific}
            onValueChange={(itemValue) => setSelectedDesignation(itemValue)}
          >
            <Picker.Item label="Select Designation" value="" />
            <Picker.Item label="Frontend" value="frontend" />
            <Picker.Item label="Backend" value="backend" />
            <Picker.Item label="Testing" value="testing" />
          </Picker>
        </View>
      </View>

      {/* Role Field (Disabled unless Specific is selected) */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Role:</Text>
        <View style={[styles.pickerContainer, !isSpecific && styles.disabledPicker]}>
          <Picker
            selectedValue={selectedRole}
            enabled={isSpecific}
            onValueChange={(itemValue) => setSelectedRole(itemValue)}
          >
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Intern" value="intern" />
            <Picker.Item label="Mentor" value="mentor" />
            <Picker.Item label="Admin" value="admin" />
          </Picker>
        </View>
      </View>

      {/* Announcement Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Announcement:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter announcement message..."
          multiline
          value={announcement}
          onChangeText={setAnnouncement}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Announcement</Text>
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  disabledPicker: {
    opacity: 0.5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    minHeight: 80,
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

