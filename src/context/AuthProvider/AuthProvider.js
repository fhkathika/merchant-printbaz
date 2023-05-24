import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (token) => {
    try {
        const response = await fetch("https://mserver.printbaz.com/user", {
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
  // First, fetch user data and then set the user

  const fetchedUser = await fetchUserData(token); 
  setToken(fetchedUser);
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
