import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function MentorHome() { 
  const { name, role } = useSelector((state) => state.auth.data?.data); 
  const announcement = useSelector(state=>state.notifications?.announcement)

  return (
    <ScrollView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}> 
        <View>
          <Text style={styles.welcomeText}>Welcome {name}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Get Started!</Text>
          <Text style={styles.cardDescription}>
            Track your assigned interns, schedule interactions, and review progress reports to help interns grow effectively.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.announcementTitle}>
            📢 Announcements
          </Text>
          {announcement.length>0?announcement.map((data,i)=>(
          <View key={i} style={styles.announcementItem}>
            <Text style={styles.announcementText}> 
               {data}
            </Text>
          </View>
            )):<View style={{height:80,justifyContent:'center'}}><Text style={{textAlign:'center'}}>No Announcement Currently</Text></View>}
        </View>
 
        <View style={styles.statCard}>
          <Icon name="clipboard-check" size={32} color="green" />
          <Text style={styles.statTitle}>Interactions Taken</Text>
          <Text style={styles.statValue}>25</Text>
        </View>

        <View style={styles.statCard}>
          <Icon name="clock" size={32} color="red" />
          <Text style={styles.statTitle}>Interactions Pending</Text>
          <Text style={styles.statValue}>5</Text>
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
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingVertical: 10,
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
  announcementItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  announcementText: {
    fontSize: 16,
    color: '#333',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
    marginTop: 4,
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
