import React, { useState } from "react";
import styles from "./SignInForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, userName, setIsAuthenticated, setUserName } =
    useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://backend-yax1.onrender.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      setIsAuthenticated(true);
      navigate("/");
    } else {
      console.error("Could not log in!");
    }
  };

  return (
    <div className={styles.signinContainer}>
      <form className={styles.signin} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
      <Link className={styles.signup} to="/Signup">
        Sign up
      </Link>
    </div>
  );
}

export default SignInForm;
