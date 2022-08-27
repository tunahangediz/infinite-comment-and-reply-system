import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import { authContext } from "../context/authContext/AuthContext";
import { auth } from "../firebase/config";

function useSignup() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useContext(authContext);

  const signup = async (email, password, displayName) => {
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response.user);
      if (!response) {
        throw new Error("failed to signup");
      }

      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      dispatch({ type: "LOGIN", payload: response.user });
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
}

export default useSignup;
