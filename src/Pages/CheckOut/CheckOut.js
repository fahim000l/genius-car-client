import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/AuthProvider';
import './CheckOut.css'

const CheckOut = () => {

    const service = useLoaderData();
    const { user } = useContext(AuthContext)
    // console.log(service);
    const { _id, title, img, price } = service;


    const handleSubmit = (event) => {

        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'Not Registered';
        const phone = form.phone.value;
        const message = form.message.value;
        console.log(name, email, phone, message);

        const orderInfo = {
            service_id: _id,
            service_title: title,
            price,
            customerInfo: {
                customerName: name,
                email,
                phone,
                message
            }
        }

        fetch('https://genius-car-server-lac.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(orderInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    Swal.fire('Your order has been confirmed');
                }
                form.reset();
            })
    }

    return (
        <div className='p-10'>
            <h1 className='text-5xl font-bold py-4'>{title}</h1>
            <img className='w-full background-design h-[350px] rounded-lg pb-5 ' src={img} alt="" />
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <input type="text" name='firstName' placeholder="First Name" className="input input-bordered w-full" />
                    <input type="text" name='lastName' placeholder="Last Name" className="input input-bordered w-full" />
                    <input type="text" name='email' readOnly defaultValue={user?.email} placeholder="Email" className="input input-bordered w-full" />
                    <input type="text" name='phone' placeholder="Phone Number" className="input input-bordered w-full" />
                </div>
                <textarea name='message' className="textarea textarea-bordered w-full my-5" placeholder="Your Message"></textarea>
                <input className='btn btn-secondary w-full' type="submit" value="Confirm Order" />
            </form>
        </div>
    );
};

export default CheckOut;