import React from 'react';
import Abouts from '../Abouts/Abouts';
import Banner from '../Banner/Banner';
import Service from '../Service/Service';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Abouts></Abouts>
            <Service></Service>
        </div>
    );
};

export default Home;