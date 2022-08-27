import React, { useState } from "react";
import { auth } from "../firebase/config";
import useFirestore from "../hooks/useFirestore";

function CommentForm({ parent_id, setIsActive }) {
  const [value, setValue] = useState("");
  const { isPending, addDocument } = useFirestore("comments");
  const handleSubmit = (e) => {
    e.preventDefault();
    const commentSchema = {
      content: value,
      parentId: parent_id ? parent_id : null,
      author: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      likes: [],
      dislikes: [],
    };
    setIsActive((prevState) => !prevState);
    addDocument(commentSchema);
    setValue("");
  };
  return (
    <div className="max-w-[35rem]  w-full mx-auto">
      <form onSubmit={handleSubmit}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-24"
        ></textarea>
        <button className="bg-purple-500 p-2 rounded-md">submit</button>
      </form>
    </div>
  );
}

export default CommentForm;
