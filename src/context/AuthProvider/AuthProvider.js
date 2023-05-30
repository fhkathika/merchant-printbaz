import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
const navigate=useNavigate()
  const fetchUserData = async (token) => {
    try {
        const response = await fetch("https://mserver.printbaz.com/user",  //add this when upload  in main server 
        // const response = await fetch("http://localhost:5000/user",   //add this when work local server
         
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const userData = await response.json();
            console.log('fetchUserData response', userData);
            setUser(userData)
            return userData;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    } finally {
        setLoading(false);
    }
};


const loginUser = async (token, userData) => {
  localStorage.setItem("token", token);

  try {
    const fetchedUser = await fetchUserData(token); 
    setUser(fetchedUser); // Update the user state with fetchedUser
    console.log('User logged in successfully', fetchedUser);

    // Navigate to the dashboard after setting the user state
    navigate("/dashboard");
  } catch (error) {
    console.error("Error logging in:", error);
  }
};


  useEffect(() => {
    // Check if the user is logged in and fetch user data
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const authInfo = {
    user,
    token,
    loading,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
