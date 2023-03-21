import React from 'react';
import About from '../components/About';
import Agents from '../components/Agents';
import Banner from '../components/Banner';
import ClientsReview from '../components/ClientsReview';
import Demo from '../components/Demo';
import EmailPage from '../components/EmailPage';
import HomeList from '../components/HomeList';
import Partners from '../components/Partners';
import PlaceList from '../components/PlaceList';

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