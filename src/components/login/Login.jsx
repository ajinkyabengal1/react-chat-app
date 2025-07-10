import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
// import { upload } from "../../lib/upload";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);

  // signup image sec
  const handleAvatar = (e) => {
    console.log(e.target.files[0], "111");
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
      console.log(avatar, "222");
    }
  };

  // login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("login successfull");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // register function
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // img url
      // const imgUrl = await upload(avatar.file);

      // sigunup doc
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        // avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      // chats doc
      await setDoc(doc(db, "userschats", res.user.uid), {
        chats: [],
      });

      toast.success("account created Successfully");
      console.log("User created:", res.user);
    } catch (error) {
      console.error(error);
      toast.error("Registration Unsuccessful");
    } finally {
      setLoading(false);
    }

    console.log(username);
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcone Back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}> {loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
