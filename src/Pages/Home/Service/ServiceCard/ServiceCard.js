import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
    const { title, price, img } = service;
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl text-start">
            <figure><img className='w-full h-full' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title text-[#444444] text-2xl font-bold">{title}</h2>
                <div className="card-actions flex items-center justify-between text-xl font-semibold text-secondary">
                    <p>Price : $ {price}</p>
                    <FaArrowRight />
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;