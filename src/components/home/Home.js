import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import CarSearchBar from "../searchBar/SearchBar";
import styles from "./home.module.css";
import { useNavigate } from "react-router-dom";
import CarsCarousel from "../Cars/CarsCarousel";

const Home = () => {
  const navigate = useNavigate();

  const handleAuthAction = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
    <div className={styles.home}>
     <CarSearchBar/>
    </div>
  );
};

export default Home;
