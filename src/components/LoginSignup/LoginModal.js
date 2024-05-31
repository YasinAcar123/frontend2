// SignInModal.js dosyasına eklemek için
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap"; // Alert ekledik
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";

function SignInModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(""); // Hata durumu için state ekledik

  const { isAuthenticated, setUserRole, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setError(""); // Modal kapatılırken hata mesajını temizle
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://backend-yax1.onrender.com/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setIsAuthenticated(true);
      navigate("/");
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Could not log in!", error);
      setError("Email or password is incorrect. Please try again."); // Hata mesajını ayarla
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}{" "}
          {/* Hata mesajını göster */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p style={{ color: "black" }}>
            Don't have an account? <Link to="/Signup">Sign up</Link>
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignInModal;
