import { async } from "@firebase/util";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";

function EditForm({ comment, parentName }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(comment.content);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefult();
    const docRef = doc(db, "comments", comment.id);
    await updateDoc(docRef, {
      content: value,
    });
  };

  console.log(value);

  return (
    <div className={"max-w-[35rem]  w-full mx-auto "}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="w-full h-24  border rounded-xl"
        ></textarea>
        <button className="bg-purple-500 p-2 rounded-md">submit</button>
      </form>
    </div>
  );
}

export default EditForm;
