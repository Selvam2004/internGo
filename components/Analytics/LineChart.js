import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const CustomLineChart = ({ data }) => { 
 
  const labels = Object.keys(data); 
  const values = Object.values(data).map((value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 1 : parseFloat((num * 2).toFixed(1));  
});

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{  backgroundColor: "#ffffff", borderRadius: 10 }}>
        

        <LineChart
          data={{
            labels: labels, 
            datasets: [{ data: values }],
          }}
          width={Math.max(screenWidth, labels.length * 100)}  
          height={350} 
          yAxisInterval={1} 
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 1,  
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "5", 
            },
            propsForLabels: {
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
          bezier
          style={{ 
            borderRadius: 16,
          }}
          fromZero 
          segments={9} 
          formatYLabel={(value) => Math.trunc(value).toString()}
        />
      </View>
    </ScrollView>
  );
};

export default CustomLineChart;
