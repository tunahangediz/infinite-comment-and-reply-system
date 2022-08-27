import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { commentContext } from "./commentContext";

function CommentState({ children }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentArr = [];
      snapshot.forEach((doc) => {
        let comment = { id: doc.id, ...doc.data() };
        commentArr.push(comment);
      });
      setComments(commentArr);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  console.log(comments);

  return (
    <commentContext.Provider value={{ comments: comments }}>
      {children}
    </commentContext.Provider>
  );
}

export default CommentState;
