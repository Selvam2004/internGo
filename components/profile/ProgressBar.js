import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';  
const ProgressBarCard = ({ progress }) => {  

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Profile Completion</Text>
      <Progress.Bar
        progress={progress / 100}
        width={null}
        height={12}
        color={progress >= 70 ? '#4CAF50' : progress>=10?'#FFC107':'#ff4d4d'}  
        unfilledColor="#ddd"
        borderRadius={8}
        borderWidth={0}
      />
      <Text style={styles.percentage}>{progress}% Complete</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 4, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  percentage: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
    color: '#555',
  },
});

export default ProgressBarCard;
