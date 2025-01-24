import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Years() {
  const years = [2020, 2021, 2022, 2023, 2024, 2025]; 
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Records</Text>
      <View style={styles.cnt}>
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            style={styles.folder} 
            onPress={()=>navigation.navigate('Batches')}
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
    fontSize: 24,
    fontWeight: 'bold',
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
