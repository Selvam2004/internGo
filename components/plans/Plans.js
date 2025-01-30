import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Swipeable, GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Plans({ plan }) {
  const [plans, setPlans] = useState(plan || []);
  const navigation = useNavigation();
  useEffect(() => {
    setPlans(plan);
  }, [plan]);
  const handleNavigate = (item) => {
    navigation.navigate("Plan Details", {
      id: item,
    });
  };
  const handleDelete = (id) => {
    Alert('Confirm',"Are you sure to delete")
  };
  const finishSubmit = async (id) => {

  };
  const deleteButton = (id)=>{
    return (
      <TouchableOpacity onPress={() => handleDelete(id)}>
      <View style={styles.deleteBox}> 
         <Icon name="delete" size={24} color="white" />
      </View>
      </TouchableOpacity>
  
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 Training Plans</Text>

      {plans.length !== 0 ? (
        plans.map((item, index) => (
          <GestureHandlerRootView>
            <Swipeable renderRightActions={()=>deleteButton(item.id)}>
          <TouchableHighlight
            underlayColor={"lightgray"}
            activeOpacity={0.6}
            key={index}
            onPress={() => handleNavigate(item.id)}
          >
            <View style={styles.card}> 
                <Text style={styles.cardTitle}>{item.name}</Text>
 
              <Text style={styles.cardDays}>
                🗓️ Total Days:{" "}
                <Text style={styles.boldText}>{item.planDays}</Text>
              </Text>
              <Text
                style={styles.cardDescription}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {item.description}
              </Text>
            </View>
            
          </TouchableHighlight>
          </Swipeable>
          </GestureHandlerRootView>
        ))
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>
            No Plans available
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    paddingHorizontal:40,
    margin: 5,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 4,
  },
  cardDays: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 6,
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  cardDescription: {
    fontSize: 14,
    color: "#6b7280",
  },
  deleteBox: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height:'80%', 
    marginTop:10,
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
  }, 
});
