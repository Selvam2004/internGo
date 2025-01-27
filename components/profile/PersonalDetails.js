import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { axiosInstance } from '../../utils/axiosInstance';

const DEFAULT = "N/A";

export default function PersonalDetails({ user, edit ,fetchUser,token}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); 
  const [error,setError] = useState(); 
  const role = useSelector((state) => state.auth.data?.data.role);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 15);
 
  const [fields, setFields] = useState({ 
    dob: user.dateOfBirth?.split('T')[0] || DEFAULT,
    contact: user.phone_no || DEFAULT, 
    gender: user.gender || "Select Gender",
    bloodGroup: user.bloodGroup || "Select Blood Group",
  });
  useEffect(()=>{
    if(user){
      setFields({ 
        dob: user.dateOfBirth?.split('T')[0] || DEFAULT,
        contact: user.phone_no || DEFAULT, 
        gender: user.gender || "Select Gender",
        bloodGroup: user.bloodGroup || "Select Blood Group",
      })
    }
  },[user]);
  const handleEdit = () => {
    setModalVisible(true);
  };

  

  const handleSave = () => {
    let err = "";
    let update ={}
    setError('');
    if(fields.dob!=DEFAULT&&fields.dob!=user.dateOfBirth){
      update.dateOfBirth=fields.dob;
    }
    if(fields.contact!=DEFAULT&&fields.contact!=user.phone_no){
      if(fields.contact.length!=10){
        err  = "*Enter valid contact number"
      }
      else{
        update.phone_no=fields.contact;
      } 
    }    
    if(fields.gender!="Select Gender"&&fields.gender!=user.gender){
      update.gender=fields.gender;
    }
    if(fields.bloodGroup!="Select Blood Group"&&fields.bloodGroup!=user.bloodGroup){
      update.bloodGroup=fields.bloodGroup;
    }
    if(err){
      setError(err);
    }
    else{
      handleSubmit(update);
    }
    console.log(update);
    
  };

  const handleSubmit = async(update)=>{
    try{ 
      const response = await axiosInstance.patch(`/api/users/update/${user.id}`,{...update},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        }
      );
      if(response){
        fetchUser();
      }
    }
    catch(err){
      console.log(err.response.data);
    }
    finally{ 
      setModalVisible(false);  
    }
  }

  const handleChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };
 
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    const formattedDate = date.toISOString().split('T')[0];  
    handleChange('dob', formattedDate);
    hideDatePicker();
  };
  
  const handleClose = ()=>{
    setModalVisible(false);
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Personal Details</Text>
        <TouchableOpacity
          style={[
            styles.editButton,
            { flexDirection: 'row', display: role === 'Admins' ? (edit ? '' : 'none') : '' },
          ]}
          onPress={handleEdit}
        >
          <Icon name="edit" style={styles.editIcon} size={18} color="white" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
 
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name|| DEFAULT}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email|| DEFAULT}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>DOB</Text>
          <Text style={styles.value}>{user.dateOfBirth?.split('T')[0]|| DEFAULT}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Contact</Text>
          <Text style={styles.value}>{user.phone_no|| DEFAULT}</Text>
        </View> 
        <View style={styles.row}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>{user.gender|| DEFAULT}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Blood Group</Text>
          <Text style={styles.value}>{user.bloodGroup|| DEFAULT}</Text>
        </View>
      </View>
 
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
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>DOB</Text>
                <TouchableOpacity onPress={showDatePicker} style={styles.modalInput}>
                  <Text style={{ color: fields.dob === DEFAULT ? '#aaa' : '#333' }}>
                    {fields.dob === DEFAULT ? 'Select Date' : fields.dob}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Contact</Text>
                <TextInput
                  style={styles.modalInput}
                  value={fields.contact}
                  onChangeText={(text) => handleChange('contact', text)}
                  keyboardType="phone-pad"
                />
                <Text style={[styles.error,{display:error?'':'none'}]}>{error}</Text>
              </View> 
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Gender</Text>
                <View style={styles.picker}>
                <Picker
                  selectedValue={fields.gender}
                  onValueChange={(value) => handleChange('gender', value)}                  
                >
                  <Picker.Item label="Select Gender" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
                </View>
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Blood Group</Text>
                <View style={styles.picker}>
                <Picker
                  selectedValue={fields.bloodGroup}
                  onValueChange={(value) => handleChange('bloodGroup', value)}
                  
                >
                  <Picker.Item label="Select Blood Group" />
                  <Picker.Item label="A+" value="A+" />
                  <Picker.Item label="A-" value="A-" />
                  <Picker.Item label="B+" value="B+" />
                  <Picker.Item label="B-" value="B-" />
                  <Picker.Item label="O+" value="O+" />
                  <Picker.Item label="O-" value="O-" />
                  <Picker.Item label="AB+" value="AB+" />
                  <Picker.Item label="AB-" value="AB-" />
                </Picker>
                </View>

              </View>
            </ScrollView>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
 
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date" 
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        maximumDate={maxDate}
      /> 
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
  error:{
    color:'red',
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
  picker: {
    borderWidth: 1,
    borderColor: 'rgb(217, 217, 217)',
    borderRadius: 5,
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
