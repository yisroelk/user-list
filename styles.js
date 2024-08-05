import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      marginTop: 50,
      backgroundColor: '#d3d3d3',
    },
    titleText: {
      fontSize: 30,
      textAlign: 'center',
      backgroundColor: '#fff',
      fontWeight: 'bold',

    },

    text: {
      fontSize: 20,
      borderWidth: 1,
      borderColor: '#F0F0F0',
      height: 38,
      width: 50, 
      textAlign: 'center',
      verticalAlign: 'middle',
    },

    row: {
      flexDirection: 'row',
      backgroundColor: '#fff',
    },

    row2: {
      flexDirection: 'row',
      backgroundColor: '#ccc',
    },

    headerText: {
      textAlign: 'center',
      verticalAlign: 'middle',
      fontSize: 20,
      fontWeight: 'bold',
      borderBottomWidth: 2,
      height: 38,
    },

    id: {
      width: 50,
    },

    columnName: {
      width: 130,
    },

    phoneNumber: {
      width: 150,
    },

    email: {
      width: 250,
    },

    addUser: {
      marginTop: 20
    },

    button: {
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      width: 70,
      marginHorizontal: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft: 5,
      marginRight: 5,
    },
  });

  export default styles;