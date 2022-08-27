import { collection, onSnapshot } from "firebase/firestore";
import { comment } from "postcss";
import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Comment from "./components/Comment";
import CommentForm from "./components/CommentForm";
import Navbar from "./components/Navbar";
import { authContext } from "./context/authContext/AuthContext";
import { commentContext } from "./context/commentContext/commentContext";
import { auth, db } from "./firebase/config";
import useSignup from "./hooks/useSignup";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { comments, loading } = useContext(commentContext);
  const rootComments = comments.filter((comment) => comment.parentId === null);
  const { user } = useContext(authContext);

  // const getReplies = (id) => {
  //   return comments
  //     .filter((comment) => comment.parentId == id)
  //     .sort(
  //       (a, b) =>
  //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //     );
  // };
  const { signup } = useSignup();

  console.log(auth.currentUser);

  return (
    <div className="App bg-gray-400">
      <Navbar />
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <>
              {auth.currentUser && (
                <h1 className="text-2xl text-indigo-700">
                  {auth.currentUser.displayName}
                </h1>
              )}
              <CommentForm />
              {!loading && (
                <div className="pt-12">
                  {rootComments.map((rootComment) => (
                    <div key={rootComment.id}>
                      <Comment comment={rootComment} parentName="" />
                    </div>
                  ))}
                </div>
              )}
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
