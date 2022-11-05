import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard/ServiceCard';

const Service = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://genius-car-server-lac.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, []);

    return (
        <div>
            <div>
                <p className='text-secondary font-bold text-xl'>Service</p>
                <h2 className='text-6xl font-bold my-[20px]'>Our Service Area</h2>
                <p className='w-[50%] mx-auto'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            <div className='grid gap-[24px] grid-cols-1 lg:grid-cols-3 md:grid-cols-2 py-[50px] mx-5'>
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Service;