import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react' 
import ErrorPage from '../../components/error/Error';
import InteractionCard from '../../components/interactions/InteractionCard';
import Icon from "react-native-vector-icons/MaterialIcons";
import InteractionEditCard from '../../components/interactions/InteractionEditCard';


export default function Interactions() { 
  const [error, setError] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [search, setSearch] = useState(""); 

  const handleSearch = (text) => {
    setSearch(text); 
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchInteractions()
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);
   
  const fetchInteractions = async()=>{

  }

  return (
    <View style={styles.container}>
      {error?<ErrorPage onRetry={fetchInteractions}/>:
      <>
      <Text style={styles.header}>Interactions</Text>
      <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={24}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={search}
            placeholder="Search..."
            placeholderTextColor="#888"
            onChangeText={(text)=>handleSearch(text)}
          />
         </View>

      { 
      loading?<View style={{justifyContent:'center',height:500}}><Text style={{textAlign:'center'}}>Loading...</Text></View>:
        <>
         <InteractionEditCard/>
        </>
      }
      </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:20
  },
  header:{
    fontSize:20,
    marginBottom:10,
    fontWeight:'bold'
  }, 
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 5,
  },
})