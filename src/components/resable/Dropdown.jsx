import React from 'react'
import { Select } from "antd";
import { useState, useEffect } from 'react';

const Dropdown = ({options, handleChange}) => {
    
    return (
        <div>
            <Select
                onChange={handleChange}
                style={{ width: 200 }}
                options={options}
            />
        </div>
    )
}

