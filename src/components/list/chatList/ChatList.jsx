import { useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useEffect } from "react";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promisses = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.reciverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocRef.data();
          return { ...item, user };
        });

        const chatsData = await Promise.all(promisses);
        setChats(chatsData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  console.log(chats, "chats");

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {/* char list sec */}
      {chats.map((chat) => (
        <div className="item" key={chat.ChatId}>
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>{chat.user.name}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
