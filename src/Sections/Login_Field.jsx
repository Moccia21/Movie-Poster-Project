import React, { useState } from "react";
import { Link } from "react-router-dom";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init";

const Login_Field = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged In Successfully!");
    } catch (error) {
      console.error("Error Logging In:", error.message);
    }
  };

  return (
    <section>
      <div className="login_container">
        <h1 className="login_title">Login</h1>
        <form className="login_inputs">
          <input type="email" className="login_input" placeholder="Email: "
          value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="login_input" type="password" placeholder="Password: " value={password} onChange={(e) => setPassword(e.target.value)} />
        </form>
        <div className="login_btn-container">
          <Link to={"/"}>
          <button className="login_btn" onClick={handleLogin}>Sign In</button>
          </Link>
          <Link to={'/Register'} className="link">
          <button className="login_btn">Join Now</button>
          </Link>
        </div>
        <div className="forgot_container">
          <p className="forgot_password">Forgot your password?</p>
        </div>
      </div>
    </section>
  );
};

export default Login_Field;
