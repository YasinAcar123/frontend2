import React from 'react'
import BookingDatePicker from './BookingDatePicker'
import { useParams } from 'react-router-dom';
import CarDetails from '../components/carManagement/CarDetails';

const BookingPage = () => {
    const { id } = useParams();

  return (
    <div className='flex gap-10'>
        <BookingDatePicker carId={id}/>
        <CarDetails/>
    </div>
  )
}

export default BookingPage