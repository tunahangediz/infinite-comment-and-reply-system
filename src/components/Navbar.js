import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext/AuthContext";
import { auth } from "../firebase/config";

function Navbar() {
  const { dispatch } = useContext(authContext);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT", payload: null });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full bg-indigo-600 py-2 mb-4">
      <nav className="max-w-4xl w-full flex mx-auto justify-between items-center text-white">
        <Link to="/">
          <h1 className="text-2xl font-semi-bold">Home</h1>
        </Link>

        <ul className="flex gap-4 ">
          {auth.currentUser ? (
            <li>
              <button onClick={handleLogout}>LOGOUT</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">LOGIN </Link>
              </li>
              <li>
                <Link to="/signup">SIGNUP</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
