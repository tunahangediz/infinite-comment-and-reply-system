import { async } from "@firebase/util";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { commentContext } from "../context/commentContext/commentContext";
import { auth, db } from "../firebase/config";
import CommentForm from "./CommentForm";
import EditForm from "./EditForm";

function Comment({ comment, parentName }) {
  const { comments, loading } = useContext(commentContext);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  let replies = [];
  replies = comments.filter(
    (rootComment) => rootComment.parentId == comment.id
  );
  const hasReplies = replies && replies.length > 0;

  const increaseLike = async () => {
    const likesArr = [...comment.likes];
    const uid = auth.currentUser.uid;

    if (comment.dislikes.indexOf(uid) > -1) {
      const dislikesArr = comment.dislikes.filter((dislike) => dislike != uid);
      const docRef = doc(db, "comments", comment.id);
      console.log(dislikesArr);

      await updateDoc(docRef, {
        dislikes: dislikesArr,
      });
    }

    if (likesArr.indexOf(uid) == -1) {
      likesArr.push(uid);
      const docRef = doc(db, "comments", comment.id);
      await updateDoc(docRef, {
        likes: likesArr,
      });
      console.log(comment.id);
    }
  };

  const decreaseLike = async () => {
    const dislikesArr = [...comment.dislikes];
    const uid = auth.currentUser.uid;
    if (comment.likes.indexOf(uid) > -1) {
      const likesArr = comment.likes.filter((like) => like != uid);
      const docRef = doc(db, "comments", comment.id);

      await updateDoc(docRef, {
        likes: likesArr,
      });
    }

    if (dislikesArr.indexOf(uid) == -1) {
      dislikesArr.push(uid);
      const docRef = doc(db, "comments", comment.id);
      await updateDoc(docRef, {
        dislikes: dislikesArr,
      });
      console.log(comment.id);
    }
  };

  const deleteComment = async () => {
    const docRef = doc(db, "comments", comment.id);
    await deleteDoc(docRef);
  };
  return (
    <div className=" flex flex-col max-w-[35rem] w-full mx-auto items-end ">
      <div className="w-full">
        <div className="  rounded-md mb-4  bg-white  p-4 min-h-[100px] h-full flex  ">
          <div className=" mr-4 w-10 h-20 rounded text-indigo-400 bg-indigo-100 font-semibold flex flex-col items-center justify-around py-2 ">
            <button onClick={increaseLike}>
              <img src="./images/icon-plus.svg" alt="" />
            </button>
            <div>{comment.likes.length - comment.dislikes.length}</div>
            <button onClick={decreaseLike}>
              <img src="./images/icon-minus.svg" alt="" />
            </button>
          </div>
          <div className="w-full">
            <div className="flex justify-between  pr-2 mb-4">
              <div className="flex items-center gap-2">
                <div className=" bg-black rounded-full w-8 h-8 flex items-center justify-center ">
                  <img
                    className="w-8 h-8"
                    src="./images/favicon-32x32.png"
                    alt=""
                  />
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold">
                    {comment.author.split("@")[0]}{" "}
                  </p>
                  {auth.currentUser.uid == comment.uid && (
                    <strong className="p-1 bg-blue-800 text-white text-xs">
                      YOU
                    </strong>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {/* when current user is author of comment it can remove or edit the comment*/}
                {auth.currentUser.uid == comment.uid && (
                  <div className="flex gap-2 text-[10px]">
                    <div
                      onClick={deleteComment}
                      className=" hover:opacity-30 cursor-pointer font-semibold flex items-center gap-1 text-red-600 "
                    >
                      <img src="./images/icon-delete.svg" alt="" />
                      DELETE
                    </div>
                    <div
                      onClick={() => setIsEditing((prevState) => !prevState)}
                      className=" hover:opacity-30 cursor-pointer font-semibold flex items-center gap-1 text-violet-800 "
                    >
                      <img src="./images/icon-edit.svg" alt="" />
                      EDIT
                    </div>
                  </div>
                )}
                <button
                  className="hover:opacity-30 cursor-pointer "
                  onClick={() => setIsActive((prevState) => !prevState)}
                >
                  <img src="./images/icon-reply.svg" alt="" />
                </button>
              </div>
            </div>

            {isEditing ? (
              <EditForm
                comment={comment}
                parentName={parentName ? parentName : ""}
              />
            ) : (
              <p className="max-w-md break-words pr-4">
                {parentName && (
                  <span className=" text-purple-600 font-semibold">
                    @{parentName}{" "}
                  </span>
                )}
                {comment.content}
              </p>
            )}
          </div>
        </div>
      </div>
      {isActive && (
        <CommentForm parent_id={comment.id} setIsActive={setIsActive} />
      )}

      <div className="max-w-lg w-full flex flex-col items-end">
        {hasReplies &&
          replies.map((replie) => (
            <div key={replie.id} className=" w-11/12 ">
              <Comment comment={replie} parentName={comment.author} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comment;
