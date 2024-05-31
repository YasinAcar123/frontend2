import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    daily_price: "",
    availability: true,
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backend-yax1.onrender.com/cars/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setCars((prevCars) => [...prevCars, data]);
      setFormData({
        brand: "",
        model: "",
        year: "",
        daily_price: "",
        availability: true,
      });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  const handleDelete = async (carId) => {
    try {
      await fetch(`https://backend-yax1.onrender.com/cars/${carId}`, {
        method: "DELETE",
      });
      setCars((prevCars) => prevCars.filter((car) => car.car_id !== carId));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Car Management</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formModel">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDailyPrice">
              <Form.Label>Daily Price</Form.Label>
              <Form.Control
                type="text"
                name="daily_price"
                value={formData.daily_price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Car
            </Button>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Year</th>
                <th>Daily Price</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars &&
                cars.map((car) => (
                  <tr key={car.car_id}>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td>{car.daily_price}</td>
                    <td>{car.availability ? "Available" : "Not Available"}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(car.car_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default CarManagement;

// import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';

// const CarForm = ({ carId }) => {
//   const [formData, setFormData] = useState({
//     brand: '',
//     model: '',
//     year: '',
//     dailyPrice: '',
//     availability: true
//   });

//   useEffect(() => {
//     // Burada, varolan bir araç güncellenirken, belirli bir carId geçirilirse, o aracın verilerini yükleyebiliriz
//     if (carId) {
//       fetch(`https://backend-yax1.onrender.com/cars/${carId}`)
//         .then(response => response.json())
//         .then(data => {
//           setFormData(data);
//         })
//         .catch(error => console.error('Error fetching car:', error));
//     }
//   }, [carId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const requestOptions = {
//       method: carId ? 'PUT' : 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     };

//     fetch(`https://backend-yax1.onrender.com/cars${carId ? `https://backend-yax1.onrender.com/${carId}` : ''}`, requestOptions)
//       .then(response => response.json())
//       .then(data => console.log('Car saved:', data))
//       .catch(error => console.error('Error saving car:', error));
//   };
//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="formBrand">
//         <Form.Label>Brand</Form.Label>
//         <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} />
//       </Form.Group>
//       <Form.Group controlId="formModel">
//         <Form.Label>Model</Form.Label>
//         <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} />
//       </Form.Group>
//       <Form.Group controlId="formYear">
//         <Form.Label>Year</Form.Label>
//         <Form.Control type="text" name="year" value={formData.year} onChange={handleChange} />
//       </Form.Group>
//       <Form.Group controlId="formDailyPrice">
//         <Form.Label>Daily Price</Form.Label>
//         <Form.Control type="text" name="dailyPrice" value={formData.dailyPrice} onChange={handleChange} />
//       </Form.Group>
//       <Form.Group controlId="formAvailability">
//         <Form.Check
//           type="checkbox"
//           label="Availability"
//           checked={formData.availability}
//           onChange={() => setFormData(prevState => ({ ...prevState, availability: !formData.availability }))}
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         {carId ? 'Update Car' : 'Add Car'}
//       </Button>
//     </Form>
//   );
// };

// export default CarForm;
