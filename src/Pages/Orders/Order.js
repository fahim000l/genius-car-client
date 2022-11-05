import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import OrderRow from './OrderRow/OrderRow';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const { user, LogOut } = useContext(AuthContext);


    useEffect(() => {
        fetch(`https://genius-car-server-lac.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {

                if (res.status === 403 || res.status === 401) {
                    LogOut()
                        .then(() => { })
                        .catch(err => console.error(err))
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setOrders(data);
            });
    }, [user?.email, LogOut]);
    // console.log(orders);


    const deleteOrder = (_id) => {
        fetch(`https://genius-car-server-lac.vercel.app/orders/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const remaining = orders.filter(order => order._id !== _id);
                setOrders(remaining);
            })
    }

    const handleStatus = (_id) => {
        fetch(`https://genius-car-server-lac.vercel.app/orders/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
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