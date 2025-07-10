import Chat from "./components/chat/Chat";
import Deatil from "./components/detail/Deatil";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";

const App = () => {
  const user = true;

  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Deatil />{" "}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
