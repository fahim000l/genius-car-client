import React, { useContext, useState } from 'react';
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../Contexts/AuthProvider';

const SignUp = () => {

    const {
        createUser,
        googleSignIn,
        fbSignIn
    } = useContext(AuthContext);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);


        if (password.length < 6) {
            setError('Password must contains at least 6 characters');
            return;
        }

        createUser(email, password)
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

    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);

                const currentUser = {
                    email: user.email
                };

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
                        navigate(from, { replace: true });
                    })
            })
            .catch(err => {
                console.error(err);
            })
    };

    const handleFbSignIn = () => {
        fbSignIn()
            .then(result => {
                const user = result.user;
                console.log(user);

                const currentUser = {
                    email: user.email
                };

                fetch('https://genius-car-server-lac.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.token);
                        localStorage.setItem('genius-token', data.token);
                        navigate(from, { replace: true });
                    })
            })
            .catch(err => {
                console.error(err);
            });
    }


    return (
        <div className="hero py-20">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-full h-full lg:w-[50%]">
                    <img className='w-full' src={img} alt="" />
                </div>
                <div className="card py-5 flex-shrink-0 shadow-2xl w-full h-full lg:w-[50%]">
                    <form onSubmit={handleSubmit} className="card-body">
                        <h1 className="text-5xl font-bold">Sign Up</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name='name' type="text" placeholder="Your Name" className="input input-bordered" required />
                        </div>
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
                            <input name='password' type="password" placeholder="password" required className="input input-bordered" />
                        </div>
                        <p className='text-red-600 font-bold'>{error}</p>
                        <div className="form-control mt-6">
                            <input className="btn btn-secondary" type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <p className='font-bold'>Or Sign In with</p>
                    <div className='flex justify-evenly items-center text-3xl font-bold p-5'>
                        <FaFacebook onClick={handleFbSignIn} />
                        <FaGoogle onClick={handleGoogleSignIn} />
                        <FaLinkedin />
                    </div>
                    <p className='font-bold'>Already have an account? <NavLink className={'text-secondary'} to={'/login'}>Log In</NavLink></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;