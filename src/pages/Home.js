import React from 'react';
import About from '../components/about/About';
import Agents from '../components/agent/Agents';
import Banner from '../components/house/Banner';
import ClientsReview from '../components/client/ClientsReview';
import Demo from '../components/Demo';
import EmailPage from '../components/EmailPage';
import HomeList from '../components/house/HomeList';
import Partners from '../components/partner/Partners';
import PlaceList from '../components/place/PlaceList';

function Home(props) {
    return (
        <div>
            <Banner/>
            <HomeList />
            <About />
            <Demo />
            <PlaceList />
            <ClientsReview />
            <Partners />
            <Agents />
            <EmailPage />
        </div>
    );
}

export default Home;