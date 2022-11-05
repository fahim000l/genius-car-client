import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, deleteOrder, handleStatus }) => {

    const { _id, customerInfo, service_title, service_id, price, status } = order;
    const [serviceInfo, setServiceInfo] = useState({});

    useEffect(() => {
        fetch(`https://genius-car-server-lac.vercel.app/services/${service_id}`)
            .then(res => res.json())
            .then(data => setServiceInfo(data))
    }, [service_id])

    return (
        <tr>
            <th>
                <label>
                    <button onClick={() => deleteOrder(_id)} className="btn btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded-xl w-24 h-24">
                            {
                                serviceInfo?.img &&
                                <img src={serviceInfo.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{service_title}</div>
                        <div className="text-sm opacity-50">{customerInfo.email}</div>
                    </div>
                </div>
            </td>
            <td>
                $ {price}
            </td>
            <td>{customerInfo.customerName}</td>
            <th>
                <button onClick={() => handleStatus(_id)} className="btn btn-ghost btn-xs">{status ? status : 'Pending'}</button>
            </th>
        </tr>
    );
};

export default OrderRow;