import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext/AuthContext";
import { auth } from "../firebase/config";

function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { dispatch } = useContext(authContext);
  const login = async (email, password) => {
    setIsPending(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      dispatch({ type: "LOGIN", payload: response.user });
      if (response) {
        navigate("/");
      }
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setIsPending(false);
    }
  };
  return { error, isPending, login };
}

export default useLogin;
