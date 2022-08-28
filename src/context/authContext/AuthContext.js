import React, { createContext, useReducer } from "react";

export const authContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: action.payload };
    default:
      break;
  }
};

function AuthContext({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });
  console.log(state.user);
  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
}

export default AuthContext;
