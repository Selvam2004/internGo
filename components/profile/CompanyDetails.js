import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const DEFAULT = 'N/A'
export default function EmployeeDetails({user}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const role = useSelector(state=>state.auth.data?.data.role);  
  const [editableFields, setEditableFields] = useState({
    Designation:user.designation || DEFAULT,
    Department :user.department || DEFAULT, 
    "Employee ID":user.employeeId || DEFAULT, 
    Status:user.status || DEFAULT,
    'Asset No':'3453' || DEFAULT,
    'Date of Joining':user.dateOfJoining || DEFAULT,
    Batch:user.year || DEFAULT,
    Phase:user.phase || DEFAULT,
    'Training status':'DSA' || DEFAULT

  });

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    setModalVisible(false); 
  };

  const handleChange = (field, value) => {
    setEditableFields({ ...editableFields, [field]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Employee Details</Text>
        <TouchableOpacity style={[styles.editButton, { flexDirection: 'row' ,display:role=='Admins'?'':'none'}]} onPress={handleEdit}>
          <Icon name="edit" style={styles.editIcon} size={18} color="white" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        {Object.entries(editableFields).map(([name, value], i) => (
          <View style={styles.row} key={i}>
            <Text style={styles.label}>{name}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
 
      <Modal
  animationType="slide"
  transparent={true}
  visible={isModalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalHeading}>Edit Employee Details</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.entries(editableFields).map(([name, value], i) => (
          <View key={i} style={styles.modalField}>
            <Text style={styles.modalLabel}>{name}</Text>
            <TextInput
              style={styles.modalInput}
              value={value}
              onChangeText={(text) => handleChange(name, text)}
            />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom:20
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  editText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  table: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'rgb(217, 217, 217)',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
 modalContent: {
  backgroundColor: '#fff',
  width: '90%',
  maxHeight: '80%', 
  borderRadius: 8,
  padding: 20,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 5,
  shadowOffset: { width: 0, height: 2 },
  elevation: 5,
},
scrollContainer: {
  paddingBottom: 20,  
},
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalField: {
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'rgb(217, 217, 217)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
