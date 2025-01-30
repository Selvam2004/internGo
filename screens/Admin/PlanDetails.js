import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library

export default function PlanDetails() {
  const [milestones, setMilestones] = useState([]);
  const [showAddMilestoneCard, setShowAddMilestoneCard] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ name: "", days: "", mentor: "" });

  const openMilestoneCard = () => {
    setNewMilestone({ name: "", days: "", mentor: "" });
    setShowAddMilestoneCard(true);
  };

  const handleAddMilestone = () => {
    if (!newMilestone.name.trim() || !newMilestone.days.trim() || !newMilestone.mentor.trim()) {
      Alert.alert("Error", "Please enter all milestone details.");
      return;
    }
    setMilestones([...milestones, { id: Date.now(), ...newMilestone, rows: [] }]);
    setShowAddMilestoneCard(false);
  };

  const handleDeleteMilestone = (milestoneId) => {
    setMilestones(milestones.filter(m => m.id !== milestoneId));
  };

  const handleAddRow = (milestoneId) => {
    setMilestones(milestones.map(m => m.id === milestoneId ? { ...m, rows: [...m.rows, { id: Date.now(), name: "", description: "", objective: "", days: "", interactions: "", roadmapType: "" }] } : m));
  };

  const handleDeleteRow = (milestoneId, rowId) => {
    setMilestones(milestones.map(m => m.id === milestoneId ? { ...m, rows: m.rows.filter(row => row.id !== rowId) } : m));
  };

  const handleRowChange = (milestoneId, rowId, field, value) => {
    setMilestones(milestones.map(m => m.id === milestoneId ? { ...m, rows: m.rows.map(row => row.id === rowId ? { ...row, [field]: value } : row) } : m));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Master plan</Text>
      <ScrollView>
        {milestones.map((milestone) => (
          <View key={milestone.id} style={styles.milestone}>
            <View style={styles.milestoneHeader}>
              <Text style={styles.milestoneTitle}>{milestone.name} - {milestone.mentor} ({milestone.days} days)</Text>
              <TouchableOpacity onPress={() => handleDeleteMilestone(milestone.id)}>
                <Icon name="delete" size={24} color="red" />  
              </TouchableOpacity>
            </View>
            <ScrollView horizontal>
              <View>
                <View style={styles.headerRow}>
                  {["Name", "Description", "Objective", "Days", "No. of Interactions", "Roadmap Type", "Delete"].map(field => (
                    <Text key={field} style={styles.headerText}>{field}</Text>
                  ))}
                </View>
                {milestone.rows.map(row => (
                  <View key={row.id} style={styles.row}>
                    {["name", "description", "objective", "days", "interactions", "roadmapType"].map(field => (
                      <TextInput
                        key={field}
                        style={styles.input}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={row[field]}
                        onChangeText={text => handleRowChange(milestone.id, row.id, field, text)}
                      />
                    ))}
                    <TouchableOpacity onPress={() => handleDeleteRow(milestone.id, row.id)}>
                      <Icon name="delete" size={24} color="red" /> {/* Delete icon */}
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddRow(milestone.id)}>
              <Text style={styles.addButtonText}>➕ Add Row</Text>
            </TouchableOpacity>
          </View>
        ))}
        {showAddMilestoneCard && (
          <View style={styles.addMilestoneCard}>
            <Text style={styles.cardTitle}>Add Milestone</Text>
            {["name", "days", "mentor"].map(field => (
              <TextInput
                key={field}
                style={styles.cardInput}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newMilestone[field]}
                onChangeText={(text) => setNewMilestone({ ...newMilestone, [field]: text })}
              />
            ))}
            <View style={styles.cardButtons}>
              <TouchableOpacity style={styles.cardButton} onPress={handleAddMilestone}>
                <Text style={styles.cardButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardButtonCancel} onPress={() => setShowAddMilestoneCard(false)}>
                <Text style={styles.cardButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
<TouchableOpacity style={styles.addButton} onPress={openMilestoneCard}>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Icon name="add" size={24} color="#fff" />
    <Text style={styles.addButtonText}>Add Milestone</Text>
  </View>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  milestone: { marginBottom: 15, padding: 15, backgroundColor: "#fff", borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  milestoneHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  milestoneTitle: { fontSize: 18, fontWeight: "bold" },
  headerRow: { flexDirection: "row", backgroundColor: "#ddd", padding: 8, borderRadius: 5 },
  headerText: { width: 130, fontWeight: "bold", textAlign: "center" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  input: { width: 130, borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 5, textAlign: "center", backgroundColor: "#fff" },
  addButton: { backgroundColor: "#007bff", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10, flexDirection: "row", justifyContent: "center" },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16, marginLeft: 10 },
  addMilestoneCard: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  cardInput: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 5, marginBottom: 10, backgroundColor: "#fff" },
  cardButtons: { flexDirection: "row", justifyContent: "space-between" },
  cardButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, flex: 1, marginRight: 5 },
  cardButtonCancel: { backgroundColor: "#dc3545", padding: 10, borderRadius: 5, flex: 1, marginLeft: 5 },
  cardButtonText: { color: "#fff", fontWeight: "bold", textAlign: "center" }
});