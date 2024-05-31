import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CarInfo from "../Details/CarInfo";

const CarDetails = () => {
  const { id } = useParams();
  const [carInfo, setCarInfo] = useState([]);
  const [carData, setCarData] = useState({});

  useEffect(() => {
    fetch(`https://backend-yax1.onrender.com/image/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched car data:", data); // Debugging: log the fetched data
        setCarInfo(data);
      })
      .catch((error) => console.error("Error fetching car data:", error));
  }, [id]);

  useEffect(() => {
    fetch(`https://backend-yax1.onrender.com/cars/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched car data:", data); // Debugging: log the fetched data
        setCarData(data);
      })
      .catch((error) => console.error("Error fetching car data:", error));
  }, [id]);

  console.log("CarInfo:", carInfo, "CarData:", carData);

  return (
    <div>
      <CarInfo carData={carData} carPictures={carInfo} />
    </div>
  );
};

export default CarDetails;
