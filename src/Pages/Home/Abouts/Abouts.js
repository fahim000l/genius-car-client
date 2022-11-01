import React from 'react';
import person from '../../../assets/images/about_us/person.jpg'
import parts from '../../../assets/images/about_us/parts.jpg'

const Abouts = () => {
    return (
        <div className="hero py-[20px]">
            <div className="hero-content flex-col lg:flex-row">
                <div className='lg:w-[50%] relative'>
                    <img src={person} alt='' className="w-[80%] h-full  rounded-lg shadow-2xl" />
                    <img src={parts} alt='' className="w-[60%] absolute right-0 top-[50%] rounded-lg shadow-2xl" />
                </div>
                <div className='lg:w-[50%] text-start p-5'>
                    <p className='text-xl font-bold text-secondary'>About Us</p>
                    <h1 className="text-5xl font-bold">
                        We are qualified <br />
                        & of experience <br />
                        in this field
                    </h1>
                    <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <p className="py-6">the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.  </p>
                    <button className="btn btn-active btn-secondary">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default Abouts;