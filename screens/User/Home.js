import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function Home() {
  const [taskStatuses, setTaskStatuses] = useState(['Pending', 'Pending']);  

  const toggleStatus = (index) => {
    const newStatuses = [...taskStatuses];
    if (newStatuses[index] === 'Pending') {
      newStatuses[index] = 'In Progress';
    } else if (newStatuses[index] === 'In Progress') {
      newStatuses[index] = 'Completed';
    } else {
      newStatuses[index] = 'Pending';
    }
    setTaskStatuses(newStatuses);
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}> 
        <View><Text style={{fontWeight:'bold',fontSize:24,paddingVertical:10}}>Welcome Selvam S</Text></View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Get Started!</Text>
          <Text style={styles.cardDescription}>
            Explore your dashboard to manage your internships, track applications, and communicate with mentors.
          </Text>
        </View>
 
        <View style={styles.card}>
          <Text style={styles.announcementTitle}>Announcements</Text>
          <View style={styles.announcementPlaceholder}>
            <Text style={styles.placeholderText}>No announcement currently</Text>
          </View>
        </View>
 
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          {taskStatuses.map((status, index) => (
            <View key={index} style={styles.taskContainer}>
              <Text style={styles.cardDescription}>
                Task {index + 1}: Complete the onboarding process.
              </Text>
              <View style={styles.taskStatusContainer}>
                <Text style={styles.taskStatusText}>Status: {status}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.toggleButton} onPress={() => toggleStatus(index)}>
                    <Text style={styles.toggleButtonText}>Toggle Status</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
        
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 InternGo. All rights reserved.</Text> 
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#f0f4f8',
  },
  content: {
    padding: 20, 
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 5,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  announcementPlaceholder: {
    height: 150,  
    width: '100%',  
    backgroundColor: '#e0e0e0', 
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  taskContainer: {
    marginBottom: 15,
    padding:10,
    backgroundColor:'#e0e0e0',
    borderRadius:10
  },
  taskStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  taskStatusText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#343a40',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});