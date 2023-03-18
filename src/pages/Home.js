import React from 'react';
import Banner from '../components/Banner';
import HomeList from '../components/HomeList';

function Home(props) {
    return (
        <div>
            <Banner/>
            <HomeList />
        </div>
    );
}

export default Home;