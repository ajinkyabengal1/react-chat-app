import { useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useEffect } from "react";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!currentUser?.id) return;

    const unSub = onSnapshot(
      doc(db, "userschats", currentUser.id),
      async (res) => {
        const data = res.data();
        if (!data || !Array.isArray(data.chats)) {
          setChats([]);
          return;
        }

        const items = data.chats;

        const promisses = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.reciverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();
          return { ...item, user };
        });

        const chatsData = await Promise.all(promisses);
        setChats(chatsData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser?.id]);

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
      {chats.map(
        (chat) => (
          console.log(chat, "chats"),
          (
            <div className="item" key={chat.ChatId}>
              <img src={chat.user.avatar || "./avatar.png"} alt="" />
              <div className="texts">
                <span>{chat.user.username}</span>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
          )
        )
      )}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
