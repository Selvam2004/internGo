import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Switch } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const InteractionEditCard = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);
    const [editedDetails, setEditedDetails] = useState({
        assignedInterviewer: 'Arshad',
        date: '2025-02-10',
        time: '12:30 PM',
        duration: '1 hour',
    });

    const details = {
        name: 'JS Interaction',
        assignedIntern: 'Selvam',
        assignedMentor: 'Arshad',
        assignedInterviewer: editedDetails.assignedInterviewer,
        date: editedDetails.date,
        time: editedDetails.time,
        duration: editedDetails.duration,
        status: 'COMPLETED',
    };

    const handleSave = () => {
        console.log('Saved Details:', editedDetails);
        setModalVisible(false);
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={{flexDirection:'row' ,alignItems:'center'}}>
                <View style={[styles.statusDot, details.status === 'COMPLETED' ? styles.greenDot : styles.redDot]}></View>
                <Text style={styles.title}>{details.name}</Text>
                </View>
                <Switch
                    value={isScheduled}
                    onValueChange={setIsScheduled}
                    trackColor={{ false: '#ccc', true: '#28a745' }}                   
                />
            </View>

            <View style={styles.namesContainer}>
                <View style={styles.nameItem}>
                    <Text style={styles.label}>Intern</Text>
                    <Text style={styles.value}>{details.assignedIntern}</Text>
                </View>
                <View style={styles.nameItem}>
                    <Text style={styles.label}>Mentor</Text>
                    <Text style={styles.value}>{details.assignedMentor}</Text>
                </View>
                <View style={styles.nameItem}>
                    <Text style={styles.label}>Interviewer</Text>
                    <Text style={styles.value}>{details.assignedInterviewer}</Text>
                </View>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Icon name="access-time" size={16} color="#555" />
                    <Text style={styles.detailText}>{details.time}</Text>
                </View>
                <View style={styles.detailItem}>
                    <FontAwesome name="calendar" size={16} color="#555" />
                    <Text style={styles.detailText}>{details.date}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon name="timer" size={16} color="#555" />
                    <Text style={styles.detailText}>{details.duration}</Text>
                </View>
            </View>



            <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.editText}>Edit Interaction</Text>
            </TouchableOpacity>
 
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Interaction</Text>

                        <Text style={styles.modalLabel}>Interviewer</Text>
                        <TextInput
                            style={styles.input}
                            value={editedDetails.assignedInterviewer}
                            onChangeText={(text) => setEditedDetails({ ...editedDetails, assignedInterviewer: text })}
                        />

                        <Text style={styles.modalLabel}>Date</Text>
                        <TextInput
                            style={styles.input}
                            value={editedDetails.date}
                            onChangeText={(text) => setEditedDetails({ ...editedDetails, date: text })}
                        />

                        <Text style={styles.modalLabel}>Time </Text>
                        <TextInput
                            style={styles.input}
                            value={editedDetails.time}
                            onChangeText={(text) => setEditedDetails({ ...editedDetails, time: text })}
                        />

                        <Text style={styles.modalLabel}>Duration</Text>
                        <TextInput
                            style={styles.input}
                            value={editedDetails.duration}
                            onChangeText={(text) => setEditedDetails({ ...editedDetails, duration: text })}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export default InteractionEditCard;


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        margin: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin:4,
        marginRight:8
    },
    greenDot: {
        backgroundColor: 'green',
    },
    redDot: {
        backgroundColor: 'red',
    },
    namesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    nameItem: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#777',
        marginBottom: 2,
    },
    value: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        paddingLeft: 5,
        fontSize: 14,
        color: '#555',
    },
    editButton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    editText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
     
    modalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
});