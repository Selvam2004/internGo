import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

export default function Notification() {
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      message: 'Meeting scheduled tomorrow at 10 AM. Please review the agenda.', 
      timestamp: '2025-02-07 10:30 AM', 
      read: false 
    },
    { 
      id: 2, 
      message: 'New system update available. Update now for better performance.', 
      timestamp: '2025-02-06 5:45 PM', 
      read: false 
    },
    { 
      id: 3, 
      message: 'Weekly team sync-up on Friday at 4 PM. Check the agenda.', 
      timestamp: '2025-02-05 2:00 PM', 
      read: true 
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => markAsRead(item.id)}
      style={{
        backgroundColor: item.read ? '#E0E0E0' : 'skyblue', 
        padding: 12,
        marginVertical: 6,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontWeight: item.read ? 'normal' : 'bold', fontSize: 14 }}>
        {item.message}
      </Text>
      <Text style={{ fontSize: 10, color: 'gray', textAlign: 'right', marginTop: 5 }}>
        {item.timestamp}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
