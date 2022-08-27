import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase/config";

function useFirestore(collectinInput) {
  const [isPending, setIsPending] = useState(false);

  const ref = collection(db, collectinInput);

  const addDocument = async (document) => {
    setIsPending(true);
    try {
      const respone = await addDoc(ref, {
        ...document,
        createdAt: serverTimestamp(),
      });
      setIsPending(false);
    } catch (error) {
      console.log(error.message);
      setIsPending(false);
    }
  };

  return { isPending, addDocument };
}

export default useFirestore;
