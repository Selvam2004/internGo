import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import EditPlan from "../../components/plans/EditPlan";
import AddMilestone from "../../components/plans/AddMilestone";
import ErrorPage from "../User/Error";
import { axiosInstance } from "../../utils/axiosInstance";

export default function PlanDetails({ route }) {
  const { id } = route.params;
  const [milestones, setMilestones] = useState([]);
  const addMilestoneRef = useRef(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const fetchMilestone = async()=>{
    try{
      setLoading(true);
      const response = await axiosInstance.get(`/api/plans/${id}`);
      const res = response.data.data.milestones;
      //setMilestones(res);
    }
    catch(err){
      console.log(err.response);
      setError(true);
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchMilestone();
  },[])

  const handleDeleteMilestone = (milestoneId) => {
    setMilestones(milestones.filter((m) => m.id !== milestoneId));
  };

  const handleAddRow = (milestoneId) => {
    setMilestones(
      milestones.map((m) =>
        m.id === milestoneId
          ? {
              ...m,
              rows: [
                ...m.rows,
                {
                  id: Date.now(),
                  name: "",
                  description: "",
                  objective: "",
                  days: "",
                  interactions: "",
                  roadmapType: "",
                },
              ],
            }
          : m
      )
    );
  };

  const handleDeleteRow = (milestoneId, rowId) => {
    setMilestones(
      milestones.map((m) =>
        m.id === milestoneId
          ? { ...m, rows: m.rows.filter((row) => row.id !== rowId) }
          : m
      )
    );
  };

  const handleRowChange = (milestoneId, rowId, field, value) => {
    setMilestones(
      milestones.map((m) =>
        m.id === milestoneId
          ? {
              ...m,
              rows: m.rows.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row
              ),
            }
          : m
      )
    );
  };

  return (
    <>
    {
      error?<ErrorPage onRetry={fetchMilestone}/>: 
    <View style={styles.container}>
      <EditPlan id={id} />
      <TouchableOpacity onPress={() => addMilestoneRef.current?.openCard()}>
      <View style={styles.addButton}>
        <Icon name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Milestone</Text>
      </View>
     </TouchableOpacity>

     <AddMilestone id={id} ref={addMilestoneRef}/>

      {loading?<View><Text style={{textAlign:'center',margin:50}}>Loading...</Text></View>:
      <ScrollView>

        {milestones.map((milestone) => (
          <View key={milestone.id} style={styles.milestone}>
            <View style={styles.milestoneHeader}>
              <TextInput
                style={styles.milestoneTitleInput}
                placeholder="Milestone Name"
                value={milestone.name}
                onChangeText={(text) =>
                  setMilestones(
                    milestones.map((m) =>
                      m.id === milestone.id ? { ...m, name: text } : m
                    )
                  )
                }
              />
              <TextInput
                style={styles.milestoneTitleInput}
                placeholder="Mentor"
                value={milestone.mentor}
                onChangeText={(text) =>
                  setMilestones(
                    milestones.map((m) =>
                      m.id === milestone.id ? { ...m, mentor: text } : m
                    )
                  )
                }
              />
              <TextInput
                style={styles.milestoneTitleInput}
                placeholder="Days"
                value={milestone.days}
                onChangeText={(text) =>
                  setMilestones(
                    milestones.map((m) =>
                      m.id === milestone.id ? { ...m, days: text } : m
                    )
                  )
                }
                keyboardType="numeric"
              />
              <TouchableOpacity
                onPress={() => handleDeleteMilestone(milestone.id)}
              >
                <View>
                  <Icon name="delete" size={24} color="red" />
                </View>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal>

              <View>
                <View style={styles.headerRow}>
                  {[
                    "Name",
                    "Description",
                    "Objective",
                    "Days",
                    "No. of Interactions",
                    "Roadmap Type",
                    "Delete",
                  ].map((field) => (
                    <Text key={field} style={styles.headerText}>
                      {field}
                    </Text>
                  ))}
                </View>
                {milestone.rows.map((row) => (
                  <View key={row.id} style={styles.row}>
                    {[
                      "name",
                      "description",
                      "objective",
                      "days",
                      "interactions",
                      "roadmapType",
                    ].map((field) => (
                      <TextInput
                        key={field}
                        style={styles.input}
                        placeholder={
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        value={row[field]}
                        onChangeText={(text) =>
                          handleRowChange(milestone.id, row.id, field, text)
                        }
                      />
                    ))}
                    <TouchableOpacity
                      onPress={() => handleDeleteRow(milestone.id, row.id)}
                    >
                      <View>
                        <Icon name="delete" size={24} color="red" />{" "}
                        {/* Delete icon */}
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddRow(milestone.id)}
            >
              <View>
                <Text style={styles.addButtonText}>➕ Add Row</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}       
         
      </ScrollView>
      }

    </View>
    }
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  milestone: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  milestoneHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  milestoneTitleInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 5,
  },
  headerText: { width: 130, fontWeight: "bold", textAlign: "center" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  input: {
    width: 130,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },

  
  
});
