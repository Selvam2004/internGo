import React from "react";
import { View, Dimensions } from "react-native";
import { VictoryChart, VictoryArea, VictoryAxis } from "victory-native";

const screenWidth = Dimensions.get("window").width;

// Example Data
const DATA = [
  { x: new Date(2024, 0, 1), y: 30 },
  { x: new Date(2024, 1, 1), y: 45 },
  { x: new Date(2024, 2, 1), y: 50 },
  { x: new Date(2024, 3, 1), y: 70 },
  { x: new Date(2024, 4, 1), y: 90 },
];

export function MyChart() {
  return (
    <View>
      <VictoryChart width={screenWidth - 40}>
        {/* X-Axis (Time) */}
        <VictoryAxis tickFormat={(t) => `${t.getMonth() + 1}/${t.getFullYear()}`} />

        {/* Y-Axis */}
        <VictoryAxis dependentAxis />

        {/* Area Chart */}
        <VictoryArea
          data={DATA}
          style={{ data: { fill: "red", stroke: "red" } }}
          interpolation="natural"
        />
      </VictoryChart>
    </View>
  );
}
