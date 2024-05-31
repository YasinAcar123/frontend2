import React from 'react'
import { Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate  } from 'react-router-dom';

const SearchCard = ({data}) => {
    let navigate = useNavigate();
    console.log('Data:', data);

    const redirectBookingPage=(id)=>{
      console.log(id)
      navigate(`/booking/${id}`);
    }

  return (
    <div className='flex flex-wrap gap-5 justify-center'>
      {data.map((car, index) => (
        <div key={index} className='bg-gray-100 p-5 rounded-lg flex flex-col items-center justify-center'>
          <h5>{car.brand} {car.model}</h5>
          <img src={car.picture?.url} alt={car.model} className='w-full h-40 object-fill '/>
          <p className='text-black font-bold'>Price: TL {car.daily_price}</p>
          <Button onClick={()=>redirectBookingPage(car.car_id)} variant="primary">Book Now</Button>
        </div>
      ))}
    </div>
  );
}

export default SearchCard;