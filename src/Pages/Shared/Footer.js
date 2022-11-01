import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg'

const Footer = () => {
    return (
        <footer className="footer p-[130px] bg-[#151515] text-white">
            <div>
                <img src={logo} alt="" />
                <p className='text-start'>Edwin Diaz is a software and web <br /> technologies engineer, a life coach <br /> trainer who is also a serial .</p>
            </div>
            <div>
                <span className="footer-title">About</span>
                <NavLink className="link link-hover">Home</NavLink>
                <NavLink className="link link-hover">Service</NavLink>
                <NavLink className="link link-hover">Contact</NavLink>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <NavLink className="link link-hover">Why Car Doctor</NavLink>
                <NavLink className="link link-hover">About</NavLink>
            </div>
            <div>
                <span className="footer-title">Support</span>
                <NavLink className="link link-hover">Support Center</NavLink>
                <NavLink className="link link-hover">Feedback</NavLink>
                <NavLink className="link link-hover">Accesbility</NavLink>
            </div>
        </footer>
    );
};

export default Footer;