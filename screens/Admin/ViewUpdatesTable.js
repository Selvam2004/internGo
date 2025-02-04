import { View, Text } from 'react-native'
import React from 'react'

export default function ViewUpdatesTable({route}) {
    const {date} = route.params;
    console.log(date)
  return (
    <View>
      <Text>ViewUpdatesTable</Text>
    </View>
  )
}