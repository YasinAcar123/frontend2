import React from 'react'
import { Divider, Table } from 'antd';
import { useNavigate } from 'react-router-dom';

const UserBookingTable = ({ bookings }) => {
    const navigate = useNavigate();

    const columns = [
        {
            title: 'Booking ID',
            dataIndex: 'booking_id',
            key: 'booking_id'
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (text) => {
                return new Date(text).toLocaleDateString();
            }
            
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'endDate',
            render: (text) => {
                return new Date(text).toLocaleDateString();
            }
        },
        {
            title: 'Car ID',
            dataIndex: 'car_car_id',
            key: 'car_car_id',
            render: (text) => {
                return <a className='text-blue-500' onClick={() => navigate(`/booking/${text}`)}>{text}</a>
            }
        },
        {
            title: 'Total Price',
            dataIndex: 'total_price',
            key: 'total_price'
        },
    ];

    return (
        <div>
            <Divider orientation="left">Bookings</Divider>
            <Table dataSource={bookings} columns={columns} />
        </div>
    );
}

export default UserBookingTable;


