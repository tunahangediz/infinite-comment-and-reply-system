import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import useFirestore from "../hooks/useFirestore";

function CommentForm({ parent_id, setIsActive }) {
  const [value, setValue] = useState("");
  const { isPending, addDocument } = useFirestore("comments");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    if (!auth.currentUser) {
      navigate("/login");
    }
    e.preventDefault();
    const commentSchema = {
      content: value,
      parentId: parent_id ? parent_id : null,
      author: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      likes: [],
      dislikes: [],
    };
    if (setIsActive) {
      setIsActive((prevState) => !prevState);
    }
    addDocument(commentSchema);
    setValue("");
  };
  return (
    <div className="max-w-[35rem]  w-full mx-auto pb-2">
      <form onSubmit={handleSubmit}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-24 rounded-md py-2 px-4"
        ></textarea>
        <div className="flex w-full flex-row-reverse">
          <button className="bg-indigo-600 p-2 rounded-md text-white">
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
