import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { AuthContext } from '../../Contexts/AuthProvider';

const Header = () => {

    const { user, LogOut } = useContext(AuthContext);


    const handleLogOut = () => {
        LogOut()
            .then(() => { })
            .catch(err => console.error(err));
    }

    const menu = <div className='lg:flex'>
        <li className='mx-5'>
            <NavLink className={'btn btn-ghost'} to={'/'}>Home</NavLink>
        </li>
        {
            user?.email ?
                <>
                    <li className='mx-5'>
                        <NavLink className={'btn btn-ghost'} to={'/orders'}>Order Review</NavLink>
                    </li>
                    <li className='mx-5'>
                        <button onClick={handleLogOut} className={'btn btn-dark text-white'}>Log Out</button>
                    </li>
                </>
                :
                <>
                    <li className='mx-5'>
                        <NavLink className={'btn btn-ghost'} to={'/login'}>Log In</NavLink>
                    </li>
                </>
        }
    </div>
    return (
        <div className="navbar bg-base-100 px-[150px] py-[50px]">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <NavLink className="btn btn-ghost normal-case text-xl">
                    <img src={logo} alt="" />
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menu}
                </ul>
            </div>
            <div className="navbar-end">
                <NavLink className="btn btn-outline btn-secondary">Appointment</NavLink>
            </div>
        </div>
    );
};

export default Header;