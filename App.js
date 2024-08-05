// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import UserTable from './UserTable';


const App = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <UserTable />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App; 