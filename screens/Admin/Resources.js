import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ProfileCard from '../../components/resources/ProfileCard';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

export default function Resources() {
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    year: '',
    batch: [],
    designation: [],
    selectedFilter: 'Year', 
  });

  const years = ['2023', '2024', '2025'];
  const batches = ['Batch 1', 'Batch 2', 'Batch 3'];
  const designations = ['Front-end', 'Back-end', 'Testing'];

  const itemsPerPage = 5;  
  const [currentPage, setCurrentPage] = useState(1);
  const profileData=[1,2,3,3,4,4,5,5,3,4,3]
  const totalPages = Math.ceil(profileData.length / itemsPerPage);
  
  const currentItems = profileData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSelection = (item) => {
    const { selectedFilter } = filters;
    let selectedArray;

    if (selectedFilter === 'Year') {
       setFilters({ ...filters, year: item });
    } else if (selectedFilter === 'Batch') {
      selectedArray = filters.batch.includes(item) ? filters.batch.filter(i => i !== item) : [...filters.batch, item];
      setFilters({ ...filters, batch: selectedArray });
    } else if (selectedFilter === 'Designation') {
      selectedArray = filters.designation.includes(item) ? filters.designation.filter(i => i !== item) : [...filters.designation, item];
      setFilters({ ...filters, designation: selectedArray });
    }
  };

  return (
    <ScrollView>
      <View><Text style={styles.header}>Resources</Text></View>
      <View style={styles.container}> 
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
          />
        </View>
 
        <TouchableOpacity style={styles.filterBadge} onPress={() => setModalVisible(true)}>
          <Text style={styles.filterBadgeText}>Filters</Text>
        </TouchableOpacity>

        <View style={styles.profileCardContainer}>
        {currentItems.map((item,id) => (
            <ProfileCard key={id} />
          ))}
        </View>

        {totalPages>0&&<View style={styles.paginationContainer}>
          <TouchableOpacity 
            style={styles.paginationButton} 
            onPress={() => setCurrentPage(prev =>(prev-1))}
            disabled={currentPage === 1}
          >
            <Text style={styles.paginationText}>Previous</Text>
          </TouchableOpacity>
          <Text style={{color:'black'}}>{currentPage} / {totalPages}</Text>
          <TouchableOpacity 
            style={styles.paginationButton} 
            onPress={() => setCurrentPage(prev => (prev+1))}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.paginationText}>Next</Text>
          </TouchableOpacity>
        </View>}

      </View>
 
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
            
          <View style={styles.modalContent}>
          
            <View style={styles.sidebar}>
              <View><Text style={styles.filterHeader}>Filters</Text></View>
              <TouchableOpacity onPress={() => setFilters({ ...filters, selectedFilter: 'Year' })} style={styles.tab}>
                <Text style={filters.selectedFilter === 'Year' ? styles.activeTabText : styles.tabText}>Year</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilters({ ...filters, selectedFilter: 'Batch' })} style={styles.tab}>
                <Text style={filters.selectedFilter === 'Batch' ? styles.activeTabText : styles.tabText}>Batch</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilters({ ...filters, selectedFilter: 'Designation' })} style={styles.tab}>
                <Text style={filters.selectedFilter === 'Designation' ? styles.activeTabText : styles.tabText}>Designation</Text>
              </TouchableOpacity>
            </View>
 
            <View style={styles.content}>
              <Text style={styles.modalHeader}>Select {filters.selectedFilter}</Text>
              <ScrollView  showsHorizontalScrollIndicator={false} style={styles.badgeContainer} contentContainerStyle={{alignItems:'flex-start'}}>
                {(filters.selectedFilter === 'Year' ? years : filters.selectedFilter === 'Batch' ? batches : designations).map(item => (
                  <TouchableOpacity
                    key={item}
                    style={[styles.badge, 
                      (filters.selectedFilter === 'Year' && filters.year===item) || 
                      (filters.selectedFilter === 'Batch' && filters.batch.includes(item)) || 
                      (filters.selectedFilter === 'Designation' && filters.designation.includes(item)) 
                      ? styles.selectedBadge : null]}
                    onPress={() => toggleSelection(item)}
                  >
                    <Text style={styles.badgeText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity style={styles.applyButton} onPress={() => { 
                setModalVisible(false);
              }}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',  
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',  
    padding: 10,
    shadowColor: '#000',  
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
    color: '#333',
    paddingVertical: 5, 
  },
  profileCardContainer: {
    marginBottom: 10,
  },
  filterBadge: {
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  filterBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterHeader:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    width: '90%',
    height:"70%",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
  },
  sidebar: {
    width: '30%',
    paddingRight: 5, 
  },
  content: {
    width: '70%',
    paddingLeft:40,
    marginTop:50
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tab: {
    marginVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  badgeContainer: {
    flexDirection: 'row', 
    marginBottom: 15,
  },
  badge: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginBottom:10
  },
  selectedBadge: { 
    backgroundColor: '#007BFF', 
  }, 
  badgeText: {
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems:'center'
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#dc3545',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems:'center'
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  paginationButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  paginationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});