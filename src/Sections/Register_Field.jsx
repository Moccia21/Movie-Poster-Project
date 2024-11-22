import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/init";

const Register_Field = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Registered Successfully!");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <section>
      <div className="login_container">
        <h1 className="login_title">Register</h1>
        <form className="register_inputs">
          <input
            type="text"
            className="register_input"
            placeholder="First Name "
          />
          <input
            type="text"
            className="register_input"
            placeholder="Last Name "
          />
          <input type="email" className="register_input" value={email} placeholder="Email "
          onChange={(e) => setEmail(e.target.value)} />
          <input
            className="register_input"
            type="text"
            placeholder="Password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div className="login_btn-container">
          <Link to={"/"}>
          <button className="login_btn" onClick={handleRegister}>
            Join Now
          </button>
          </Link>
          <Link to={"/Login"} className="link">
            <button className="login_btn">Sign In</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register_Field;
