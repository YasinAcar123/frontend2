import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../Pictures/BrandLogo.png";
import { useAuth } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import SignInModal from "../LoginSignup/LoginModal.js";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const { isAuthenticated, userName, setIsAuthenticated, setUserName } =
    useAuth();
  const navigate = useNavigate();

  function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const decodeToken = () => {
    const token = getCookie("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded;
    } else {
      return null;
    }
  };

  console.log(decodeToken());

  const handleClickLogout = async () => {
    try {
      const token = sessionStorage.getItem("token");
      console.log(token);
      const response = await fetch(
        "https://backend-yax1.onrender.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsAuthenticated(false);
        navigate("/");
      } else {
        console.error("Could not log out!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="navbar">
      <img className="logo" alt="logo" src={logo} />
      <NavLink to="/">Home</NavLink>
      <NavLink to="discoverthevehicles">Discover The Vehicles</NavLink>
      {decodeToken() && decodeToken().role && (
        <NavLink to="admindashboard">Admin Dashboard</NavLink>
      )}
      {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}

      <NavLink to="/about">About</NavLink>
      {!isAuthenticated && <SignInModal />}
      {isAuthenticated && <button onClick={handleClickLogout}>Logout</button>}
    </div>
  );
};

export default Navbar;
