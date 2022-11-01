import React from 'react';

const BannderSlider = ({ slider }) => {
    const { image, prev, id, next } = slider;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='carousel-img'>
                <img alt='' src={image} className="w-full rounded-lg" />
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-[5%] top-[25%]">
                <h1 className='text-6xl text-white text-start font-bold'>
                    Affordable
                    <br />
                    Price For Car
                    <br />
                    Servicing
                </h1>
            </div>
            <div className="absolute flex justify-start transform -translate-y-1/2 left-[5%] top-[50%]">
                <p className='text-xl font-bold text-white w-[40%] text-start'>
                    There are many variations of passages of  available, but the majority have suffered alteration in some form
                </p>
            </div>
            <div className="absolute flex justify-start transform -translate-y-1/2 left-[5%] top-[75%]">
                <button className="btn btn-active btn-secondary mr-[20px]">Discover More</button>
                <button className="btn btn-outline btn-secondary">Latest Project</button>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle w-[60px] h-[60px] mr-[20px]">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle w-[60px] h-[60px]">❯</a>
            </div>
        </div>
    );
};

export default BannderSlider;