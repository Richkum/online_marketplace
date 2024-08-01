import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
<<<<<<< HEAD
    const userId = localStorage.getItem("user_id");
=======
    const userId = localStorage.getItem("id");
>>>>>>> feature/listing
    if (token && userId) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
      setUser({ id: userId });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
<<<<<<< HEAD
    localStorage.setItem("user_id", userData.user.id);
=======
    localStorage.setItem("id", userData.user.id);
>>>>>>> feature/listing
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    setIsAuthenticated(true);
    setUser(userData.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
<<<<<<< HEAD
    localStorage.removeItem("user_id");
=======
    localStorage.removeItem("id");
>>>>>>> feature/listing
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
