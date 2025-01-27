import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { axiosInstance } from '../../utils/axiosInstance';

const DEFAULT = "N/A";

export default function AssetDetails({ user,asset, fetchUser, token }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); 
  const role = useSelector((state) => state.auth.data?.data.role);

  const [fields, setFields] = useState({ 
    type: asset?.assetType || DEFAULT,
    name: asset?.assetName || DEFAULT, 
    givenOn: asset?.givenOn?.split('T')[0] || DEFAULT,
  });

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleSave = () => { 
    let update = {}; 
     
    if(fields.type !== DEFAULT && fields.type !== asset?.assetType) {
      update.assetType = fields.type;
    }

    if(fields.name !== DEFAULT && fields.name !== asset?.assetName) {
      update.assetName = fields.name;
    }

    if(fields.givenOn !== DEFAULT && fields.givenOn !== asset?.givenOn) {
      update.givenOn = fields.givenOn;
    }

    if(update){
      handleSubmit(update);   
    }
  };

  const handleSubmit = async(update) => {
    try {
      const response = await axiosInstance.patch(`/api/users/update/assets`, {  
        userId:user.id,
        assetType:update.assetType, 
        }, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });

      if (response) {
        fetchUser();   
      }
    } catch (err) {
      console.log(err.response.data);  
    } finally {
      setModalVisible(false);    
    }
  };

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
    handleChange('givenOn', formattedDate);
    hideDatePicker();
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Asset Details</Text>
        <TouchableOpacity
          style={[
            styles.editButton,
            { flexDirection: 'row', display: role === 'Admins' ?  '' : 'none' },
          ]}
          onPress={handleEdit}
        >
          <Icon name="edit" style={styles.editIcon} size={18} color="white" />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
 
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Type</Text>
          <Text style={styles.value}>{asset?.assetType || DEFAULT}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{asset?.assetName|| DEFAULT}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Given On</Text>
          <Text style={styles.value}>{asset?.givenOn || DEFAULT}</Text>
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
            <Text style={styles.modalHeading}>Edit Asset Details</Text>
            <ScrollView>  
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Type</Text>
                <TextInput
                  style={styles.modalInput}
                  value={fields.type}
                  onChangeText={(text) => handleChange('type', text)}
                />
              </View> 
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Name</Text>
                <TextInput
                  style={styles.modalInput}
                  value={fields.name}
                  onChangeText={(text) => handleChange('name', text)}
                />
              </View> 
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Given On</Text>
                <TouchableOpacity onPress={showDatePicker} style={styles.modalInput}>
                  <Text style={{ color: fields.givenOn === DEFAULT ? '#aaa' : '#333' }}>
                    {fields.givenOn === DEFAULT ? 'Select Date' : fields.givenOn}
                  </Text>
                </TouchableOpacity>
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

      {/* Date Time Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
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
  error: {
    color: 'red',
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
});
