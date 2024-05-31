import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import CarComponent from "./CarComponent";

const CarListComponent = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch("https://backend-yax1.onrender.com/cars");
      const data = await response.json();
      setCars(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div>
      <h2>Car List</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div>
          {cars.map((car, index) => (
            <CarComponent key={index} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarListComponent;
