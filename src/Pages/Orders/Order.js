import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import OrderRow from './OrderRow/OrderRow';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);

    // console.log(user?.email);
    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOrders(data);
            });
    }, [user?.email]);
    // console.log(orders);


    const deleteOrder = (_id) => {
        fetch(`http://localhost:5000/orders/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const remaining = orders.filter(order => order._id !== _id);
                setOrders(remaining);
            })
    }

    const handleStatus = (_id) => {
        fetch(`http://localhost:5000/orders/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(order => order._id !== _id);
                    const approving = orders.find(order => order._id === _id);
                    setOrders([approving, ...remaining]);
                }
            })
    }


    return (
        <div>
            <h1 className='text-3xl font-bold py-5'>you have {orders.length} orders</h1>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Service Name</th>
                            <th>Price</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                deleteOrder={deleteOrder}
                                handleStatus={handleStatus}
                            ></OrderRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;