import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../Contexts/AuthProvider';

const LogIn = () => {

    const { logIn } = useContext(AuthContext);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';


    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        logIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                const currentUser = {
                    email: user.email
                }
                fetch('https://genius-car-server-lac.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.token);
                        localStorage.setItem('genius-token', data.token);
                        form.reset();
                        navigate(from, { replace: true });
                    })

            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            })

    }

    return (
        <div className="hero py-20">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-full h-full lg:w-[50%]">
                    <img className='w-full' src={img} alt="" />
                </div>
                <div className="card py-5 flex-shrink-0 shadow-2xl w-full h-full lg:w-[50%]">
                    <form onSubmit={handleSubmit} className="card-body">
                        <h1 className="text-5xl font-bold">Log In</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="text" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <NavLink href="#" className="label-text-alt link link-hover">Forgot password?</NavLink>
                            </label>
                        </div>
                        <p className='text-red-600 font-bold'>{error}</p>
                        <div className="form-control mt-6">
                            <input className="btn btn-secondary" type="submit" value="Log In" />
                        </div>
                    </form>
                    <p className='font-bold'>Doesn't have an account? <NavLink className={'text-secondary'} to={'/signup'}>Sign Up</NavLink></p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;