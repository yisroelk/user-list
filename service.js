  // Fetch users from the server
  export const getUsers = async () => {
    try {
      const res = await fetch('http://10.0.2.2:3000/users') 
      .then(res => res.json())
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };