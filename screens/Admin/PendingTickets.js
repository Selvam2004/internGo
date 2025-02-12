import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import React, { useState } from 'react';

export default function HelpRequests() { 
  const [helpRequests, setHelpRequests] = useState([
    {
      id: 1,
      subject: 'Login Issue',
      description: 'Unable to log into my account with correct credentials.',
      priority: 'High',
      recipient: 'Admin',
      mentor: null,
      isResolved: false,
    },
    {
      id: 2,
      subject: 'Mentor Not Responding',
      description: 'My mentor has not responded to my messages for a week.',
      priority: 'Medium',
      recipient: 'Mentor',
      mentor: 'John Doe',
      isResolved: false,
    },
    {
      id: 3,
      subject: 'Course Material Missing',
      description: 'The backend development module is missing study materials.',
      priority: 'Low',
      recipient: 'Admin',
      mentor: null,
      isResolved: true,
    },
  ]);
 
  const toggleResolved = (id) => {
    setHelpRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, isResolved: !request.isResolved } : request
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Help Requests</Text>
      <View style={{marginBottom:20}}>
      {helpRequests.map((request) => (
        <View key={request.id} style={styles.card}>
          <Text style={styles.subject}>{request.subject}</Text>
          <Text style={styles.description}>{request.description}</Text>
          <Text style={styles.details}>
            <Text style={styles.boldText}>Priority:</Text> {request.priority}
          </Text>
          <Text style={styles.details}>
            <Text style={styles.boldText}>Raised To:</Text> {request.recipient}
          </Text>
          {request.recipient === 'Mentor' && (
            <Text style={styles.details}>
              <Text style={styles.boldText}>Mentor:</Text> {request.mentor}
            </Text>
          )}

          <View style={styles.switchContainer}>
            <Text style={styles.statusText}>
              Status: {request.isResolved ? 'Resolved' : 'Pending'}
            </Text>
            <Switch
              value={request.isResolved}
              onValueChange={() => toggleResolved(request.id)}
            />
          </View>
        </View>
      ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#007BFF',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

