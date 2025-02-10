import React from "react";
import { View, Text, Dimensions } from "react-native";
import Svg, { Polygon, Line, Text as SvgText, Circle } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;
const size = screenWidth - 40; 
const center = size / 2;  
const radius = center - 70; 
const levels = 5; 

const polarToCartesian = (angle, value, maxValue) => ({
  x: center + radius * (value / maxValue) * Math.cos(angle - Math.PI / 2),
  y: center + radius * (value / maxValue) * Math.sin(angle - Math.PI / 2),
});

const  SpiderChart = ({ data }) => {
  const categories = Object.keys(data);
  const values = Object.values(data);
  const maxValue = Math.max(...values);  
  const angleStep = (2 * Math.PI) / categories.length;
 
  const points = categories.map((_, i) => {
    const { x, y } = polarToCartesian(angleStep * i, values[i], maxValue);
    return `${x},${y}`;
  });

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Performance Chart
      </Text>

      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>  
        {[...Array(levels)].map((_, level) => {
          const r = (radius * (level + 1)) / levels;
          return (
            <Polygon
              key={level}
              points={categories
                .map((_, i) => {
                  const { x, y } = polarToCartesian(angleStep * i, ((level + 1) / levels) * maxValue, maxValue);
                  return `${x},${y}`;
                })
                .join(" ")}
              stroke="gray"
              fill="none"
              strokeWidth="1"
            />
          );
        })}
 
        {categories.map((_, i) => {
          const { x, y } = polarToCartesian(angleStep * i, maxValue, maxValue);
          return <Line key={i} x1={center} y1={center} x2={x} y2={y} stroke="gray" strokeWidth="1" />;
        })}
 
        {categories.map((category, i) => {
          const { x, y } = polarToCartesian(angleStep * i, maxValue * 1.1, maxValue);
          return (
            <SvgText key={i} x={x} y={y} fontSize="12" textAnchor="middle" fill="black">
              {category}
            </SvgText>
          );
        })}
 
        <Polygon points={points.join(" ")} fill="rgba(34, 202, 236, 0.5)" stroke="blue" strokeWidth="2" />
 
        {categories.map((_, i) => {
          const { x, y } = polarToCartesian(angleStep * i, values[i], maxValue);
          return <Circle key={i} cx={x} cy={y} r="5" fill="blue" />;
        })}
      </Svg>
    </View>
  );
};

export default SpiderChart;
