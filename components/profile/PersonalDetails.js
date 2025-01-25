import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector } from 'react-redux';

const DEFAULT = "N/A";
export default function PersonalDetails({user,edit}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const role = useSelector(state=>state.auth.data?.data.role);   
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); 
  const [loading,setLoading] = useState(false);


  const [editableFields, setEditableFields] = useState({
    Name:  DEFAULT,
    Email:   DEFAULT,
    DOB:  DEFAULT,
    Contact:   DEFAULT ,
    Education:  DEFAULT ,
    Gender:  DEFAULT,
    'Blood Group':  DEFAULT,
  });

  const [displayFields, setDisplayFields] = useState({
    Name: user.name || DEFAULT,
    Email: user.email || DEFAULT,
    DOB: user.dateOfBirth || DEFAULT,
    Contact: user.phone_no || DEFAULT ,
    Education: user.education || DEFAULT ,
    Gender:user.gender || DEFAULT,
    'Blood Group': user.bloodGroup || DEFAULT,
  });
  useEffect(() => {
    if (user) {
      const updatedFields = {
        Name: user.name || DEFAULT,
        Email: user.email || DEFAULT,
        DOB: user.dateOfBirth || DEFAULT,
        Contact: user.phone_no || DEFAULT,
        Education: user.education || DEFAULT,
        Gender: user.gender || DEFAULT,
        "Blood Group": user.bloodGroup || DEFAULT,
      };
      setEditableFields(updatedFields);
      setDisplayFields(updatedFields);
    }
  }, [user]);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDate=(name)=>{
    if(name=="DOB"){
      setDatePickerVisibility(true);
    }
    else{
      setDatePickerVisibility(false);
    }
    
  }
  const handleConfirm = (date) => {
    const day = String(date.getDate()) ;  
    const month = String(date.getMonth() + 1) ;  
    const year = date.getFullYear();  
    setEditableFields({ ...editableFields, DOB: day+"/"+month+"/"+year});
    hideDatePicker(); 
  };


  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    alert('hi')
    setModalVisible(false); 
  };

  const handleClose = () => {
    setModalVisible(false); 
  };

  const handleChange = (field, value) => {
    if(field=="DOB"){
      setDatePickerVisibility(true);
    }
    else{
      setEditableFields({ ...editableFields, [field]: value });
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Personal Details</Text>
        <TouchableOpacity style={[styles.editButton, { flexDirection: 'row' ,display:role=='Admins'?edit?'':'none':''}]} onPress={handleEdit}>
          <Icon name="edit" style={styles.editIcon} size={18} color="white" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        {Object.entries(displayFields).map(([name, value], i) => (
          <View style={styles.row} key={i}>
            <Text style={styles.label}>{name}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      <DateTimePickerModal
        mode="date" 
        isVisible={isDatePickerVisible} 
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
 
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Edit Personal Details</Text>
            <ScrollView>
              {Object.entries(editableFields).map(([name, value], i) => (
                <View key={i} style={styles.modalField}>
                  <Text style={styles.modalLabel}>{name}</Text> 
                  <TextInput
                    style={styles.modalInput}
                    value={value}
                    onFocus={() => handleDate(name)}
                    onChangeText={(text) => handleChange(name, text)}
                  /> 
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {loading && (
                <View style={styles.loadingContainer}> 
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={Styles.loadingText}>Please wait...</Text>
                </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
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
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
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
  closeButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    flexDirection:'row',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    zIndex: 1,  
},
loadingText: { 
    padding:5,
    fontSize: 16,
    color: '#000',  
}
});
