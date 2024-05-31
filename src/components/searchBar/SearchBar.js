import React, { useState } from "react";
import { Button, DatePicker, Space } from "antd";
import moment from "moment";
import axios from "axios";
import SearchCard from "./SearchCard";

const { RangePicker } = DatePicker;

function CarSearchBar() {
  const [date, setDate] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);

  const onChange = (dates, dateStrings) => {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    setDate(dates);
  };

  const disabledDate = (current) => {
    // Can select today and future days
    return current && current < moment().startOf("day");
  };

  const search = async () => {
    try {
      // Debugging: log the date array
      console.log("Date array:", date);

      const response = await axios.post(
        "https://backend-yax1.onrender.com/booking/available",
        {
          startDate: date[0],
          endDate: date[1],
        },
        {
          withCredentials: true,
        }
      );
      console.log("Available cars:", response.data);
      setAvailableCars(response.data);
    } catch (error) {
      console.error("Error searching for cars:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pb-10">
      <Space direction="vertical" size={40}>
        <RangePicker showTime onChange={onChange} disabledDate={disabledDate} />
      </Space>
      <Button onClick={search} type="primary" className="mt-5 w-40">
        Search
      </Button>
      <SearchCard data={availableCars} />
    </div>
  );
}

export default CarSearchBar;
