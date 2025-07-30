import React from "react";
import "./detail.css";
import { auth } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { db } from "../../lib/firebase";
import { arrayRemove, arrayUnion, updateDoc, doc } from "firebase/firestore";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // chat user Details
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setting</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            {/* Gallery photo Items */}
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://deadline.com/wp-content/uploads/2024/04/spider-man-sam-raimi.jpg?w=681&h=383&crop=1"
                  alt=""
                />
                <span>photo_2025_08.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://deadline.com/wp-content/uploads/2024/04/spider-man-sam-raimi.jpg?w=681&h=383&crop=1"
                  alt=""
                />
                <span>photo_2025_08.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://deadline.com/wp-content/uploads/2024/04/spider-man-sam-raimi.jpg?w=681&h=383&crop=1"
                  alt=""
                />
                <span>photo_2025_08.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://deadline.com/wp-content/uploads/2024/04/spider-man-sam-raimi.jpg?w=681&h=383&crop=1"
                  alt=""
                />
                <span>photo_2025_08.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
