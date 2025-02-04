import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TaskTable({route}) {
    const {date} = route.params; 
    const [dailyTask, setDailyTask] = useState([]);
    const [editable, setEditable] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1); 
    const showButton = (today.toISOString().split('T')[0] == date) || (tomorrow.toISOString().split('T')[0] == date);
    const heading = [
      "Task Name",
      "Activities Planned",
      "Activities Completed",
      "Estimated Time",
      "Actual Time",
      "Status",
    ];

    

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{date}</Text>
      <View  style={styles.milestone}>

           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View style={styles.headerRow}>
                  {heading.map((field) => (
                    <Text key={field} style={styles.headerText}>
                      {field}
                    </Text>
                  ))} 
                </View> 

                  { 
                  dailyTask.length>0&&
                  dailyTask.map((row) => (
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
                        value={row.objectiveDays?.toString() }
                        onChangeText={(text) =>
                          handleRowChange(
                            milestone.id,
                            row.id,
                            "objectiveDays",
                            text
                          )
                        }
                        placeholder="0"
                        editable={editable == milestone.id}
                        keyboardType="number-pad"
                      />
                      <TextInput
                        style={styles.input}
                        value={row.noOfInteractions?.toString()}
                        placeholder="0"
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
                           style={{ flex: 1, height: "100%" }}
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
                  ))
                   }

              </View>
            </ScrollView>
            {dailyTask.length==0&&<View style={{height:100,justifyContent:'center'}}><Text style={{textAlign:'center'}}>No Tasks to Display</Text></View>}
          
          {showButton&& <View style={styles.footer}>
              {editable  ? (
                <>
                  <TouchableOpacity onPress={() => handleAddRow()}>
                    <View style={styles.addButton}>
                      <Icon name="add" size={20} color="#fff" />
                      <Text style={styles.addButtonText}> Add Row </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={loading} onPress={() => {}}>
                    <View
                      style={[styles.addButton, { backgroundColor: loading?'lightgreen':"green" }]}
                    >
                      <Text style={styles.addButtonText}> Save Changes </Text>
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={() => { }}>
                  <View style={styles.addButton}>
                    <Icon name="edit" size={20} color="#fff" />
                    <Text style={styles.addButtonText}> Edit </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            }
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    padding:10,
  },
  heading:{
    fontSize:20,
    fontWeight:'bold', 
    padding:20
  },
  milestone: {
    marginTop:20,
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