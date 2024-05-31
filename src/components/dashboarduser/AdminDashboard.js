import React from "react";
import CarListComponent from "../Cars/CarComponent";
import CarManagement from "../carManagement/CarManagement";
import CarPictures from "../Cars/CarPictures";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <CarPictures/>
      <CarManagement/>
    </div>
  );
};

export default AdminDashboard;
