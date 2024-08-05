// UserTable.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ScrollView, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import Modal from 'react-native-modal';
import AddEditUserModal from './AddEditUserModal.js'
import styles from './styles.js';
import *  as service from './service.js';



const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [isAddUserVisible, setAddUserVisible] = useState(false);
  const [isEditUserVisible, setEditUserVisible] = useState(false);
  const [userToEdit, setEditUsers] = useState();
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' })


  // Fetch users from the server
  const fetchData = async () => {
    try {
      const res = await fetch('http://10.0.2.2:3000/users') 
      .then(res => res.json())
      .then(data => setUsers(data))
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {fetchData()}, []);

  
  const sortData = React.useMemo(() => {
    const sortedList = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {return sortConfig.direction === 'ascending' ? -1 : 1;}
    if (a[sortConfig.key] > b[sortConfig.key]) {return sortConfig.direction === 'ascending' ? 1 : -1;}
    return 0;
  }); 
    return sortedList;
  }, [users, sortConfig]);
  

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  

  // Function to add a new user to the server
  const addUserToServer = async (newUser) => {
    try {
      const res = await fetch('http://10.0.2.2:3000/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      
      if (res.ok) {
        fetchData()
      } else {
        console.error('Error saving user:', res.statusText);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  
  // Add user locally and call the function to add to the server
  const addUser = (newUser) => {
    addUserToServer(newUser);
  };
  
  const deleteUser = async (userId) => {
    try {
      const res = await fetch(`http://10.0.2.2:3000/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        fetchData()
      } else {
        console.error('Error deleting user:', res.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };  
  
  
  const editUser = async (editedUser) => {
    try {
      const res = await fetch(`http://10.0.2.2:3000/update/${userToEdit.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedUser),
        },
      );
      if (res.ok) {
        fetchData()
      } else {
        console.error('Error edting user:', res.statusText);
      }
    } catch (error) {
      console.error('Error edting user:', error);
    };
  };

  const showAlert = (item) =>
    Alert.alert(
      'Alert',
      'Are you sure you want to delete the record?',
      [
        {
          text: 'no',
          style: 'no',
        },
        {
          text: 'yes',
          onPress: () => deleteUser(item),
          style: 'yes',
        },
      ],
      {
        cancelable: true,
      }
    );
  
  
  return (
    <View style={styles.container}>
      <View>
      {users.length > 0 ? (
        <Text style={styles.titleText}>user list</Text>
      ) : (
        <Text style={styles.titleText}>The list of users is empty</Text>
      )}
      </View>
      {users.length > 0 && 
      <ScrollView horizontal>
        <SafeAreaView>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => requestSort('id')}>
              <Text style={[styles.id, styles.headerText]}>id</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => requestSort('firstName')}>
              <Text style={[styles.columnName, styles.headerText]}>firstName</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => requestSort('lastName')}>
              <Text style={[styles.columnName, styles.headerText]}>lastName</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => requestSort('phoneNumber')}>
              <Text style={[styles.phoneNumber, styles.headerText]}>phoneNumber</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => requestSort('email')}>  
              <Text style={[styles.email, styles.headerText]}>email</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => requestSort('role')}>
              <Text style={[styles.columnName, styles.headerText]}>role</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={sortData}
            renderItem={({ item , index}) => (
            <View style={(index % 2)? styles.row : styles.row2}>
              <Text style={[styles.text, styles.id]}>{item.id}</Text>
              <Text style={[styles.text, styles.columnName]}>{item.firstName}</Text>
              <Text style={[styles.text, styles.columnName]}>{item.lastName}</Text>
              <Text style={[styles.text, styles.phoneNumber]}>{item.phoneNumber}</Text>
              <Text style={[styles.text, styles.email]}>{item.email}</Text>
              <Text style={[styles.text, styles.columnName]}>{item.role}</Text>
              <View style={styles.buttons}>
              <Pressable style={styles.button} onPress={() => showAlert(item.id)}>
                <Text style={styles.buttonText}>delete</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={() => {
                  setEditUserVisible(true)
                  setEditUsers(item)
                }}>
                <Text style={styles.buttonText}>edit</Text>
              </Pressable>
              </View>
            </View>
            )}/>
        </SafeAreaView>
      </ScrollView>}
      {isEditUserVisible && <Modal isVisible={isEditUserVisible}>
                  <AddEditUserModal
                    onClose={() => setEditUserVisible(false)}
                    onSave={(editedUser) => {
                      editUser(editedUser);
                      setEditUserVisible(false);
                      }}
                    userId={userToEdit}
                  />
                </Modal>}
        {isAddUserVisible && <Modal isVisible={isAddUserVisible}>
          <AddEditUserModal
            onClose={() => setAddUserVisible(false)}
            onSave={(newUser) => {
              addUser(newUser);
              setAddUserVisible(false);
            }}/>
        </Modal>}
      <View style={styles.addUser}>
        <Button style={styles.addUser} title="add user" color='green' onPress={() => setAddUserVisible(true)}/>
      </View>
    </View>
  );
};

export default UserTable;