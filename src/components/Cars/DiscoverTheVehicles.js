import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import carData from "../../data/carData";

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch("https://backend-yax1.onrender.com/cars");
      const data = await response.json();
      if (Array.isArray(data)) {
        setCars(data);
      } else {
        console.error("Error fetching cars: Received data is not an array");
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Brand</th>
          <th>Model</th>
          <th>Daily Price</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.car_id}>
            <td>{car.car_id}</td>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.daily_price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CarList;
