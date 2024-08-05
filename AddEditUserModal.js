// EditUserModal.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditUserModal = ( {onClose, onSave, userId={}} ) => {

  const [firstName, setFirstName] = useState(userId.firstName || '');
  const [lastName, setLastName] = useState(userId.lastName || '');
  const [phoneNumber, setPhoneNumber] = useState(userId.phoneNumber || '');
  const [email, setEmail] = useState(userId.email || '');
  const [role, setRole] = useState(userId.role || '');


  const handleSave = () => {
    if (firstName && lastName && phoneNumber && email && role) {
      onSave({ firstName, lastName, phoneNumber, email, role });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <View style={styles.modalContainer}>
      
        <Text style={styles.modalTitle}>{userId ?"Edit User": "Add New User"}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        inputMode='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        inputMode='email'
      />
      <TextInput
        style={styles.input}
        placeholder="Role (Manager or Waiter)"
        value={role}
        onChangeText={setRole}
      />
      <Button title="Save" color='green' onPress={handleSave} />
      <Button title="Cancel" color='red' onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default EditUserModal;