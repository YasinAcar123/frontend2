import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { DatePicker, Button } from "antd";
import moment from "moment";
import { useParams } from "react-router-dom";

const { RangePicker } = DatePicker;

const BookingCalendar = ({ carId }) => {
  const [bookings, setBookings] = useState([]);
  const [disableDates, setDisableDates] = useState([]);
  const [userData, setUserData] = useState(null);
  const [dailyPrice, setDailyPrice] = useState(0);
  const { id } = useParams();
  const [carData, setCarData] = useState({});

  console.log(userData, "userData");

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

    decodeToken()
      .then((decodedData) => {
        setUserData(decodedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchBookingDates();
  }, []);

  useEffect(() => {
    fetch(`https://backend-yax1.onrender.com/cars/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched car data:", data); // Debugging: log the fetched data
        setCarData(data);
      })
      .catch((error) => console.error("Error fetching car data:", error));
  }, [id]);

  const priceAccordingToDates = useMemo(() => {
    let startDate = bookings[0]?.format("DD-MM-YYYY");
    let endDate = bookings[1]?.format("DD-MM-YYYY");

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const differeceInDays = endDate?.slice(0, 2) - startDate?.slice(0, 2);
    return differeceInDays * carData?.daily_price;
  }, [bookings]);

  console.log("Price:", priceAccordingToDates);

  const changeDate = (dates) => {
    if (dates) {
      setBookings([dates[0], dates[1]]);
      console.log(
        "Selected Dates:",
        dates[0].format("YYYY-MM-DD"),
        dates[1].format("YYYY-MM-DD")
      );
    } else {
      setBookings([]);
    }
  };

  const makeReservation = async () => {
    try {
      const response = await axios.post(
        "https://backend-yax1.onrender.com/booking/book",
        {
          carId: carId,
          startDate: bookings[0],
          endDate: bookings[1],
          id: userData.user_id,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Reservation successful:", response.data);
    } catch (error) {
      console.error("Error making reservation:", error);
    }
  };

  const fetchBookingDates = async () => {
    try {
      const response = await axios.get(
        `https://backend-yax1.onrender.com/booking/book/${carId}`,
        {
          withCredentials: true,
        }
      );
      console.log("Booking dates:", response.data);
      setDisableDates(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const disabledDate = (current) => {
    if (!current) return false;
    const beforeToday = current && current < moment().endOf("day");
    return (
      beforeToday ||
      disableDates.some(({ start_date, end_date }) => {
        return current >= moment(start_date) && current <= moment(end_date);
      })
    );
  };

  return (
    <div className="p-5 flex flex-col gap-3">
      <RangePicker
        showTime
        onChange={changeDate}
        value={
          bookings.length === 2
            ? [moment(bookings[0]), moment(bookings[1])]
            : []
        }
        disabledDate={disabledDate}
      />
      <p className="text-black font-bold">
        Toplam Fiyat: {priceAccordingToDates ? priceAccordingToDates : 0} TL
      </p>
      <Button
        disabled={bookings.length === 0}
        type="primary"
        onClick={makeReservation}
      >
        BOOK NOW
      </Button>
    </div>
  );
};

export default BookingCalendar;
