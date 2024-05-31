import React, { useState, useEffect } from "react";
import ChangePassword from "./ChangePassword";
import UserBookingTable from "./UserBookingTable";

function UserDashboard() {
  const [userBookings, setUserBookings] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getCookie = (name) => {
      let value = `; ${document.cookie}`;
      let parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const decodeToken = () => {
      return new Promise((resolve, reject) => {
        let token = getCookie("user");
        if (token && token.startsWith("j%3A")) {
          // Decode the URL-encoded token and remove the 'j:' prefix
          token = decodeURIComponent(token).slice(2);
          try {
            const decoded = JSON.parse(token);
            resolve(decoded);
          } catch (error) {
            reject("Invalid token specified");
          }
        } else {
          reject("No token found");
        }
      });
    };

    const fetchUserBookings = (userId) => {
      return fetch(`https://backend-yax1.onrender.com/booking/user/${userId}`, {
        method: "GET",
        credentials: "include",
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user bookings");
        }
      });
    };

    decodeToken()
      .then((decodedData) => {
        setUserData(decodedData);
        if (decodedData && decodedData.user_id) {
          return fetchUserBookings(decodedData.user_id);
        }
        throw new Error("User ID not found");
      })
      .then((bookings) => {
        setUserBookings(bookings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(userBookings);

  return (
    <div className="flex flex-col gap-4 px-12 py-6">
      <ChangePassword />
      <UserBookingTable bookings={userBookings} />
    </div>
  );
}

export default UserDashboard;
