import React from "react";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const history = useHistory();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await fetch(
        "https://backend-yax1.onrender.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      console.log(document.cookie);
      if (response.ok) {
        console.log("Logged out!");
        alert("Logged out!");
        history.push("/login");
        navigate("/");
      } else {
        console.error("Could not log out!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return <button onClick={handleSignOut}>LogoutmlkelAKl,kalKA</button>;
};

export default SignOutButton;
