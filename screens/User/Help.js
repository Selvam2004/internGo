import React from "react";
import { View, Text, Dimensions } from "react-native";
import { VictoryChart, VictoryPolarAxis, VictoryArea } from "victory-native";

const screenWidth = Dimensions.get("window").width;

const data = [
  { x: "Speed", y: 80 },
  { x: "Accuracy", y: 90 },
  { x: "Creativity", y: 75 },
  { x: "Efficiency", y: 85 },
  { x: "Consistency", y: 95 },
];

const RadarChart = () => {
  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Performance Overview</Text>
      <VictoryChart polar width={screenWidth - 40} height={350}>
        {/* Radar Chart Axes */}
        <VictoryPolarAxis />
        
        {/* Radar Data */} 
        <VictoryArea 
          data={data}
          style={{ data: { fill: "rgba(34, 202, 236, 0.4)", stroke: "blue", strokeWidth: 2 } }}
        />
      </VictoryChart>
    </View>
  );
};

export default RadarChart;
