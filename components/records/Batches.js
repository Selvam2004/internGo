import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import UserTable from './UserTable';

export default function Batches({navigation}) {
  const Batches = ["Batch 1","Batch 2","Batch 3"]; 

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Click to view details:</Text>
      <View style={styles.cnt}>
        {Batches.map((year,i) => (
          <TouchableOpacity
            key={i}
            style={styles.folder} 
            onPress={()=>navigation.navigate('Users')}
          >
            <Text style={styles.folderText}>{year}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
    color: '#333',
  },
  cnt: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  folder: {
    width: '45%',  
    aspectRatio: 1,  
    backgroundColor: '#4caf50',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  folderText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});
