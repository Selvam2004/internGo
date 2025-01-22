import { View, Text, StyleSheet ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import Intro from '../../components/profile/Intro'


export default function Profile() {
  return (
    <View style={styles.container}>
      <Intro/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
    marginTop:10
  },   
})