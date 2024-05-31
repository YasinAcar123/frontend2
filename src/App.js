import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import SignInForm from "./components/LoginSignup/SignInForm";
import SignUpForm from "./components/LoginSignup/SignUpForm";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRouter from "./components/LoginSignup/ProtectedRouter";
import DiscoverTheVehicles from "./components/Cars/DiscoverTheVehicles";
import UserDashboard from "./components/dashboarduser/UserDashboard";
import AdminDashboard from "./components/dashboarduser/AdminDashboard";
import CarManagement from "./components/carManagement/CarManagement";
import CarPictures from "./components/Cars/CarPictures";
import CarsCarousel from "./components/Cars/CarsCarousel";
import BookingPage from "./booking/BookingPage";
import CarDetails from "./components/carManagement/CarDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discoverthevehicles" element={<DiscoverTheVehicles />} />
              <Route path="/dashboard" element={<ProtectedRouter><UserDashboard /></ProtectedRouter>} />
              <Route path="/carpictures" element={<CarPictures />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/admindashboard" element={<ProtectedRouter><AdminDashboard /></ProtectedRouter>} />
              <Route path="/carmanagement" element={<ProtectedRouter><CarManagement /></ProtectedRouter>} />
              <Route path="/carscarousel" element={<CarsCarousel />} /> Add the route for CarsCarousel
              <Route path="/booking/:id" element={<BookingPage/>} />
              <Route path="/car/:id" element={<CarDetails />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
