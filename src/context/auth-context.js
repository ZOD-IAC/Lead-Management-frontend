import React, { createContext, useState } from "react";

const AuthContext = createContext();

const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthSatate] = useState({
    token: "",
  });
};
