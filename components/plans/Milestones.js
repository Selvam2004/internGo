import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { axiosInstance } from "../../utils/axiosInstance";
import { Picker } from "@react-native-picker/picker";

const mile = [
  {
    id: 1,
    name: "Project Kickoff",
    mentorName: "John Doe",
    milestoneDays: 5,
    objectives: [
      {
        id: 101,
        name: "Define project scope",
        milestoneId: 1,
        description:
          "Identify the overall objectives and deliverables of the project.",
        objectiveDays: 2,
        noOfInteractions: 1,
        roadmapType: "Planning",
      },
      {
        id: 102,
        name: "Identify stakeholders",
        milestoneId: 1,
        description: "List all key stakeholders involved in the project.",
        objectiveDays: 3,
        noOfInteractions: 2,
        roadmapType: "Planning",
      },
    ],
  },
  {
    id: 2,
    name: "Design Phase",
    mentorName: "Jane Smith",
    milestoneDays: 10,
    objectives: [
      {
        id: 201,
        name: "Develop wireframes",
        milestoneId: 2,
        description: "Create visual wireframes for the UI/UX design.",
        objectiveDays: 5,
        noOfInteractions: 3,
        roadmapType: "Design",
      },
      {
        id: 202,
        name: "Get client approval",
        milestoneId: 2,
        description: "Present designs to the client for feedback and approval.",
        objectiveDays: 5,
        noOfInteractions: 2,
        roadmapType: "Design",
      },
    ],
  },
  {
    id: 3,
    name: "Development Phase",
    mentorName: "Alex Johnson",
    milestoneDays: 20,
    objectives: [
      {
        id: 301,
        name: "Setup project structure",
        milestoneId: 3,
        description: "Initialize the project repository and folder structure.",
        objectiveDays: 4,
        noOfInteractions: 2,
        roadmapType: "Development",
      },
      {
        id: 302,
        name: "Develop core features",
        milestoneId: 3,
        description: "Implement the main functionalities of the application.",
        objectiveDays: 16,
        noOfInteractions: 6,
        roadmapType: "Development",
      },
    ],
  },
  {
    id: 4,
    name: "Testing & QA",
    mentorName: "Emily Davis",
    milestoneDays: 7,
    objectives: [
      {
        id: 401,
        name: "Write test cases",
        milestoneId: 4,
        description: "Create unit tests and integration test scenarios.",
        objectiveDays: 3,
        noOfInteractions: 2,
        roadmapType: "Testing",
      },
      {
        id: 402,
        name: "Conduct performance testing",
        milestoneId: 4,
        description: "Run load tests and optimize system performance.",
        objectiveDays: 4,
        noOfInteractions: 2,
        roadmapType: "Testing",
      },
    ],
  },
  {
    id: 5,
    name: "Deployment & Maintenance",
    mentorName: "Michael Brown",
    milestoneDays: 5,
    objectives: [
      {
        id: 501,
        name: "Deploy on production",
        milestoneId: 5,
        description: "Deploy the application to the live environment.",
        objectiveDays: 3,
        noOfInteractions: 1,
        roadmapType: "Deployment",
      },
      {
        id: 502,
        name: "Monitor performance",
        milestoneId: 5,
        description:
          "Track application performance and fix post-launch issues.",
        objectiveDays: 2,
        noOfInteractions: 1,
        roadmapType: "Deployment",
      },
    ],
  },
];

export default function Milestones() {
  const [milestones, setMilestones] = useState(mile || []);
  const [editable, setEditable] = useState(null);
  const [error, setError] = useState("");
  //   useEffect(() => {
  //     if (props.milestones) {
  //     setMilestones(handleFill(props.milestones));
  //     }
  //   }, [props.milestones]);

  const heading = [
    "name",
    "description",
    "days",
    "interactions",
    "roadmapType",
  ];

  const handleFill = (milestone) => {
    return milestone.map((m) => {
      if (m.objectives?.length < 1) {
        return {
          ...m,
          objectives: [
            {
              id: Date.now(),
              name: "",
              description: "",
              objectiveDays: "",
              noOfInteractions: "",
              roadmapType: "",
            },
          ],
        };
      } else {
        return {
          ...m,
        };
      }
    });
  };

  const handleDeleteMilestone = async (milestoneId) => {
    Alert.alert("Confirm", "Are you sure want to delete?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          submitDeleteMilestone(milestoneId);
        },
      },
    ]);
  };

  const submitDeleteMilestone = async (milestoneId) => {
    try {
      const response = await axiosInstance.delete(
        `api/plans/delete/milestone/${milestoneId}`
      );
      if (response) {
        setMilestones(milestones.filter((m) => m.id !== milestoneId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddRow = (milestoneId) => {
    setMilestones(
      milestones.map((m) =>
        m.id === milestoneId
          ? {
              ...m,
              objectives: [
                ...m.objectives,
                {
                  id: Date.now(),
                  name: "",
                  description: "",
                  objectiveDays: "",
                  noOfInteractions: "",
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
          ? { ...m, objectives: m.objectives.filter((row) => row.id !== rowId) }
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
              objectives: m.objectives.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row
              ),
            }
          : m
      )
    );
  };

  const handleEdit = (id) => {
    setEditable(id);
  };

  const handleSave = (id) => {
    setError("");
    let create = [];
    let update = [];
    let original = milestones.filter((m) => m.id == id)[0];
    let updated = milestones.filter((m) => m.id == id)[0]; 
    if (
      updated.name?.trim() == "" ||
      updated.mentorName?.trim() == "" ||
      updated.milestoneDays == "" ||
      updated.milestoneDays == "0"
    ) {
      setError("*Please fill mentor details");
      return;
    }
    updated.objectives?.forEach((field) => {
      if (
        field.name?.trim() == "" ||
        field.description?.trim() == "" ||
        field.noOfInteractions == "0"||
        field.objectiveDays == "0"
      ) {
        
        setError("*Please fill all details");
        return;
      }
    });

    if(
        updated.name?.trim() !=original.name||
        updated.mentorName?.trim() !=original.name ||
        updated.milestoneDays!=original.name ||
        updated.milestoneDays !=original.name
    ){
        updateMilestone(id);
    }
    updated.objectives?.forEach((field) => {
        if (!Number(field.id)) {
           create.push(field);
        } 
      });
      if(create.length>0){
        createObjective(id,create)
      }
      updated.objectives?.forEach((field) => {
        if (Number(field.id)) {
            const comp = original.objectives.filter((i)=>i.id==field.id)[0];
            if(field.name.trim()!=comp.name||field.description.trim()!=comp.description||
               field.noOfInteractions!=comp.noOfInteractions?.toString()||
            field.objectiveDays!=comp.objectiveDays?.toString()||
            field.roadmapType!=comp.roadmapType){
                update.push(field);
            }
        } 
      });
      if(update.length>0){
        updateObjective(id,update)
      }
  };

  const updateMilestone = (id)=>{
    try{

    }
    catch(err){
        console.log(err.message);
    }
  }

  const createObjective = (id,create)=>{
    try{

    }
    catch(err){
        console.log(err.message);
    }
  }

  const updateObjective = (id,update)=>{
    try{

    }
    catch(err){
        console.log(err.message);
    }
  }

  return (
    <View>
      {milestones &&
        milestones.map((milestone) => (
          <View key={milestone.id} style={styles.milestone}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.milestoneHeader}>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    style={styles.milestoneName}
                    placeholder="Milestone Name"
                    value={milestone.name}
                    onChangeText={(text) =>
                      setMilestones(
                        milestones.map((m) =>
                          m.id === milestone.id ? { ...m, name: text } : m
                        )
                      )
                    }
                    editable={editable == milestone.id}
                  />
                  <Text style={styles.milestoneName}>-</Text>
                  <TextInput
                    style={styles.milestoneMentorName}
                    placeholder="Mentor"
                    value={milestone.mentorName}
                    onChangeText={(text) =>
                      setMilestones(
                        milestones.map((m) =>
                          m.id === milestone.id ? { ...m, mentorName: text } : m
                        )
                      )
                    }
                    editable={editable == milestone.id}
                  />
                  <Text style={styles.milestoneName}>(</Text>
                  <TextInput
                    style={styles.milestoneMentorName}
                    placeholder="Days"
                    value={milestone.milestoneDays?.toString()}
                    onChangeText={(text) =>
                      setMilestones(
                        milestones.map((m) =>
                          m.id === milestone.id
                            ? { ...m, milestoneDays: text }
                            : m
                        )
                      )
                    }
                    keyboardType="numeric"
                    editable={editable == milestone.id}
                  />
                  <Text style={styles.milestoneName}>
                    {milestone.milestoneDays > 1 ? ")Days" : ")Day"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteMilestone(milestone.id)}
                >
                  <View>
                    <Icon name="delete" size={24} color="red" />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
            {editable == milestone.id && error && (
              <Text style={{ color: "red" }}>{error}</Text>
            )}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View style={styles.headerRow}>
                  {heading.map((field) => (
                    <Text key={field} style={styles.headerText}>
                      {field}
                    </Text>
                  ))}
                  {editable == milestone.id && (
                    <Text style={[styles.headerText, { width: 70 }]}>
                      Delete
                    </Text>
                  )}
                </View>
                {milestone.objectives &&
                  milestone.objectives.map((row) => (
                    <View key={row.id} style={styles.row}>
                      <TextInput
                        style={styles.input}
                        value={row.name}
                        placeholder="Name"
                        onChangeText={(text) =>
                          handleRowChange(milestone.id, row.id, "name", text)
                        }
                        editable={editable == milestone.id}
                        multiline
                      />
                      <TextInput
                        style={styles.input}
                        value={row.description}
                        placeholder="description"
                        onChangeText={(text) =>
                          handleRowChange(
                            milestone.id,
                            row.id,
                            "description",
                            text
                          )
                        }
                        editable={editable == milestone.id}
                        multiline
                      />
                      <TextInput
                        style={styles.input}
                        value={row.objectiveDays?.toString() || "0"}
                        onChangeText={(text) =>
                          handleRowChange(
                            milestone.id,
                            row.id,
                            "objectiveDays",
                            text
                          )
                        }
                        editable={editable == milestone.id}
                        keyboardType="number-pad"
                      />
                      <TextInput
                        style={styles.input}
                        value={row.noOfInteractions?.toString() || "0"}
                        onChangeText={(text) =>
                          handleRowChange(
                            milestone.id,
                            row.id,
                            "noOfInteractions",
                            text
                          )
                        }
                        editable={editable == milestone.id}
                        keyboardType="number-pad"
                      />
                      <View style={styles.input}>
                        <Picker
                          enabled={editable == milestone.id}
                          selectedValue={row.roadmapType}
                          onValueChange={(text) =>
                            handleRowChange(
                              milestone.id,
                              row.id,
                              "roadmapType",
                              text
                            )
                          }
                        >
                          <Picker.Item label="DEFAULT" value="DEFAULT" />
                          <Picker.Item label="CUSTOM" value="CUSTOM" />
                        </Picker>
                      </View>
                      {editable == milestone.id && (
                        <TouchableOpacity
                          style={styles.delete}
                          onPress={() => handleDeleteRow(milestone.id, row.id)}
                        >
                          <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={{ textAlign: "center" }}>
                              <Icon name="close" color="red" size={24} />{" "}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
              </View>
            </ScrollView>

            <View style={styles.footer}>
              {editable == milestone.id ? (
                <>
                  <TouchableOpacity onPress={() => handleAddRow(milestone.id)}>
                    <View style={styles.addButton}>
                      <Icon name="add" size={20} color="#fff" />
                      <Text style={styles.addButtonText}> Add Row </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSave(milestone.id)}>
                    <View
                      style={[styles.addButton, { backgroundColor: "green" }]}
                    >
                      <Text style={styles.addButtonText}> Save Changes </Text>
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={() => handleEdit(milestone.id)}>
                  <View style={styles.addButton}>
                    <Icon name="edit" size={20} color="#fff" />
                    <Text style={styles.addButtonText}> Edit </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  milestone: {
    marginBottom: 15,
    padding: 10,
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
  milestoneName: {
    paddingVertical: 8,
    fontSize: 22,
    fontWeight: "bold",
  },
  milestoneMentorName: {
    paddingVertical: 8,
    fontSize: 20,
    fontWeight: "bold",
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    paddingVertical: 8,
    borderRadius: 5,
  },
  headerText: {
    width: 140,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: 140,
    height: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 5,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  delete: {
    width: 90,
    height: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
