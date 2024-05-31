import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { Input } from "antd";
import { Button } from "antd";

const { Option } = Select;

const CarPictures = () => {
  const [carInfo, setCarInfo] = useState([]);
  const [selectOptions, setSelectOptions] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    fetch("https://backend-yax1.onrender.com/cars")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched car data:", data); // Debugging: log the fetched data
        setCarInfo(data);
      })
      .catch((error) => console.error("Error fetching car data:", error));
  }, []);

  const handleChange = (value) => {
    setSelectOptions(value);
    console.log("Selected car:", value);
  };

  console.log("pictureUrl", pictureUrl);
  console.log("selectOptions", selectOptions);

  async function addPicture() {
    const response = await fetch(
      `https://backend-yax1.onrender.com/image/${selectOptions}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: pictureUrl,
        }),
      }
    );
    const data = await response.json();
    console.log("Added picture:", data);
  }

  return (
    <div className="text-3xl flex flex-col items-center mt-20 gap-4">
      CarPictures
      <Select value={selectOptions} onChange={handleChange} className="w-96">
        {carInfo.map((car) => {
          const carId = car.car_id;
          return (
            <Option key={carId} value={car.id}>
              {car.model}
            </Option>
          );
        })}
      </Select>
      <Input
        placeholder="Picture URL"
        value={pictureUrl}
        onChange={(e) => setPictureUrl(e.target.value)}
        className="w-96"
      />
      <Button type="primary" className="w-96" onClick={addPicture}>
        Add Picture
      </Button>
    </div>
  );
};

export default CarPictures;
