import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import Photo from '../../assets/photo.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FileIcon from 'react-native-vector-icons/AntDesign';  
import CameraIcon from 'react-native-vector-icons/FontAwesome';   
import * as ImagePicker from 'expo-image-picker';

export default function Intro() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  useEffect(() => {
    requestPermissions(); 
  }, []);
  const requestPermissions = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (status !== 'granted') { 
    const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (newStatus !== 'granted') {
      alert('Permission to access media library is required!');
    }
  }
  };
  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypes,
      allowsEditing: true,
      quality: 1,
      base64:true
    });

    if (!result.canceled) {
      setImageUri(`data:image/jpeg;base64,${result.assets[0].base64}`); 
      console.log(result.assets[0].base64)
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.profileCnt}>
      <View style={styles.imageContainer}>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.profile} />:
        <Image source={Photo} style={styles.profile} />}
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Icon name="edit" style={styles.editIcon} size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={{ marginLeft: 15, marginTop: 5, overflow: 'hidden' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Profile</Text>
        <Text style={{ fontSize: 15, color: 'green', fontWeight: '600', marginTop: 5 }}>Selvam S</Text>
        <Text style={{ fontSize: 12, marginTop: 5 }}>selvam@finestcoder.com</Text>
        <Text style={{ fontSize: 12, marginTop: 5 }}>Phase 1 Batch 1</Text>
        <Text style={{ fontSize: 12, marginTop: 5 }}>Front-end Developer</Text>
      </View>

      <Modal
        transparent={true}
        animationType='slide'
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback>
              <View style={styles.modalcnt}>
                <Text style={{ margin: 'auto', textAlign: 'center', fontSize: 18 }}>Choose an option</Text>
                <View style={styles.iconContainer}>
                  <TouchableOpacity style={styles.iconButton} onPress={takePhoto}>
                    <CameraIcon name="camera" size={40} color="black" />
                    <Text style={styles.iconText}>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton} onPress={selectImage}>
                    <FileIcon name="folderopen" size={40} color="black" />
                    <Text style={styles.iconText}>File</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 130,
    height: 130,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  profileCnt: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingLeft: 10,
    borderRadius: 20,
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    left: 100,
    bottom: 12.5,
    backgroundColor: '#6200EE',
    borderRadius: 20,
    padding: 3,
    elevation: 5,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalcnt: {
    width: "100%",
    height: "30%",
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom:50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
  },
});