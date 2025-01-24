import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Photo from '../../assets/photo.png';

const ProfileCard = () => { 
  const profileData = {
    name: "selvam",
    email: "selvam@finest.com",
    designation: "Front-end developer",
    contact: "9876054321",
    batch: "Batch 1", 
    phase:"Phase 1"
  };

  return (
    <View style={styles.card}>
      <Image source={Photo} style={styles.profileImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.detailText}>{profileData.email}</Text>
        <Text style={styles.detailText}>{profileData.designation}</Text>
        <Text style={styles.detailText}>{profileData.contact}</Text>
        <Text style={styles.detailText}>{profileData.batch} {profileData.phase}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal:10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,  
    marginRight: 20,
  },
  detailsContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 14,
    color: '#555',
  },
});

export default ProfileCard;