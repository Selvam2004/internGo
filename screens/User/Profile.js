import { View, Text, StyleSheet ,Image, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import Intro from '../../components/profile/Intro'
import PersonalDetails from '../../components/profile/PersonalDetails'
import CompanyDetails from '../../components/profile/CompanyDetails'


export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      <Intro/>
      <PersonalDetails/>
      <CompanyDetails/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
    marginTop:10
  },   
})