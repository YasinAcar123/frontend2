import React, { useState, useEffect } from "react";
import { Carousel, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CarsCarousel = () => {
  const [cars, setCars] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("https://backend-yax1.onrender.com/cars/")
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const chunkArray = (array, chunkSize) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  const carChunks = chunkArray(cars, 4);

  const redirectBookingPage = (id) => {
    console.log(id);
    navigate(`/booking/${id}`);
  };

  console.log("Cars:", cars, "Car chunks:", carChunks);

  return (
    <Container>
      <Carousel>
        {carChunks.map((carChunk, index) => (
          <Carousel.Item key={index}>
            <Row>
              {carChunk.map((car) => (
                <Col key={car.car_id} md={3}>
                  <div className="car-card">
                    <h5>
                      {car.brand} {car.model}
                    </h5>
                    <p>Daily Price: CHF{car.daily_price}</p>
                    <Button
                      onClick={() => redirectBookingPage(car.car_id)}
                      variant="primary"
                    >
                      Book Now
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default CarsCarousel;
