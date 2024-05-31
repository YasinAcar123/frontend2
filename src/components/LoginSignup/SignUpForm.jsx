import React, { useState } from "react";
import styles from './SignUpForm.module.css'
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState();
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (age < 18) {
      alert("You must be at least 18 years old to sign up.");
      return;
    }
    const response = await fetch("https://backend-yax1.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstname, lastname, age }),
    });
    if (response.ok) {
      alert("Sing up");
      navigate("/");
      console.log("Successfull!");
    } else {
      console.error("Could not Sign up!");
    }
  };

  return (
    <div className={styles.signupContainer} >
      <form className={styles.signup} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
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
        <input
          className={styles.input}
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button className={styles.button} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
