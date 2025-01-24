import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const data = [
  { sNo: 1, name: 'Selvam', email: 'selvam@finestcoder.com' },
  { sNo: 2, name: 'Kumar', email: 'kumar@example.com' },
  { sNo: 3, name: 'Arun', email: 'arun@developer.com' },
  { sNo: 4, name: 'John', email: 'john@reactnative.com' },
  { sNo: 5, name: 'Daisy', email: 'daisy@flower.com' },
  { sNo: 6, name: 'Eva', email: 'eva@tech.com' },
  { sNo: 7, name: 'Mike', email: 'mike@sample.com' },
];

export default function UserTable() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Table</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, styles.sNo]}>S.No</Text>
        <Text style={[styles.headerText, styles.name]}>Name</Text>
        <Text style={[styles.headerText, styles.email]}>Email</Text>
      </View>
      <ScrollView style={styles.tableBody}>
        {data.map((user, index) => (
        <TouchableOpacity key={index} onPress={()=>navigation.navigate('User')}>
          <View  style={styles.tableRow}>
            <Text style={[styles.rowText, styles.sNo]}>{user.sNo}</Text>
            <Text style={[styles.rowText, styles.name]}>{user.name}</Text>
            <Text style={[styles.rowText, styles.email]}>{user.email}</Text>
          </View>
         </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    borderRadius: 5,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableBody: {
    marginTop: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 15,
  },
  rowText: {
    color: '#333',
    textAlign: 'center',
  },
  sNo: {
    flex: 1,
  },
  name: {
    flex: 3,
  },
  email: {
    flex: 4,
  },
});
