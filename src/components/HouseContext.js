import React, { createContext, useEffect, useState } from 'react';
// import { houseData } from '../data'; 
import house1 from "../assets/house1.jpg";
import house2 from "../assets/house2.jpg";
import house3 from "../assets/house3.jpg";


export const HouseContext = createContext();
const houseDate = [
    {
      id: 1,
      type: "House",
      name: "House 1",
      description:
        "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone ",
      image: house1,
      imageLg: house1,
      country: "Bangladesh",
      address: "Bonosree, rampura,dhaka",
      bedroom: "4",
      bathroom: "3",
      surface: "2000 sq ft",
      year: "2023",
      price: "40000000",
      agent: {
        image: "",
        name: "tapash paul",
        phone: "01674345763",
      },
    },
    {
      id: 2,
      type: "Flat",
      name: "House 2",
      description:
        "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone ",
      image: house2,
      imageLg: house2,
      country: "Bangladesh",
      address: "Bonosree, rampura,dhaka",
      bedroom: "4",
      bathroom: "3",
      surface: "2000 sq ft",
      year: "2023",
      price: "40000000",
      agent: {
        image: "",
        name: "tapash paul",
        phone: "01674345763",
      },
    },
    {
      id: 3,
      type: "House",
      name: "House 3",
      description:
        "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone ",
      image: house3,
      imageLg: house3,
      country: "Bangladesh",
      address: "Bonosree, rampura,dhaka",
      bedroom: "4",
      bathroom: "3",
      surface: "2000 sq ft",
      year: "2023",
      price: "40000000",
      agent: {
        image: "",
        name: "tapash paul",
        phone: "01674345763",
      },
    },
    {
      id: 4,
      type: "House",
      name: "House 4",
      description:
        "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone ",
      image: house1,
      imageLg: house1,
      country: "Bangladesh",
      address: "Bonosree, rampura,dhaka",
      bedroom: "4",
      bathroom: "3",
      surface: "2000 sq ft",
      year: "2023",
      price: "40000000",
      agent: {
        image: "",
        name: "tapash paul",
        phone: "01674345763",
      },
    },
    {
      id: 5,
      type: "House",
      name: "House 5",
      description:
        "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone ",
      image: house2,
      imageLg: house2,
      country: "Bangladesh",
      address: "Bonosree, rampura,dhaka",
      bedroom: "4",
      bathroom: "3",
      surface: "2000 sq ft",
      year: "2023",
      price: "40000000",
      agent: {
        image: "",
        name: "tapash paul",
        phone: "01674345763",
      },
    },
    {
      id: 6,
      type: "House",
      name: "House 6",
      description:
        "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone ",
      image: house3,
      imageLg: house3,
      country: "Bangladesh",
      address: "Bonosree, rampura,dhaka",
      bedroom: "4",
      bathroom: "3",
      surface: "2000 sq ft",
      year: "2023",
      price: "40000000",
      agent: {
        image: "",
        name: "tapash paul",
        phone: "01674345763",
      },
    },
    {
      id: 7,
      type: "House",
      name: "House 7",
      description:
        "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone ",
      image: house1,
      imageLg: house1,
      country: "Bangladesh",
      address: "Bonosree, rampura,dhaka",
      bedroom: "4",
      bathroom: "3",
      surface: "2000 sq ft",
      year: "2023",
      price: "40000000",
      agent: {
        image: "",
        name: "tapash paul",
        phone: "01674345763",
      },
    },
    {
      id: 8,
      type: "House",
      name: "House 8",
      description:
        "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone ",
      image: house2,
      imageLg: house2,
      country: "Bangladesh",
      address: "Bonosree, rampura,dhaka",
      bedroom: "4",
      bathroom: "3",
      surface: "2000 sq ft",
      year: "2023",
      price: "40000000",
      agent: {
        image: "",
        name: "tapash paul",
        phone: "01674345763",
      },
    },
  ];

function HouseContextProvider({children}) {

    const [houses,setHouses] = useState(houseDate);
    const [country,setcountry] = useState('location any');
    const [countries,setCountries] = useState([]);
    const [property,setProperty] = useState(' property any');
    const [properties,setProperties] = useState([]);
    const [price,setPrice] = useState(' price');
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        const allCountry = houseDate.map((house)=>{
            return house.country;
        });
        const uniqueCountrys =['location any country', ...new Set(allCountry)]
        setCountries(uniqueCountrys);
    },[]);

    useEffect(()=>{
        const allProperties = houseDate.map((house)=>{
            return house.type;
        });
        console.log(allProperties)
        const uniqueProperties =['location any country', ...new Set(allProperties)]
        setProperties(uniqueProperties);
    },[]);

    const handelClick = ()=>{
      console.log('click');
    }

    return (
        <HouseContext.Provider value={{houses,country,setcountry,countries,property,setProperty,price,isLoading,properties, setPrice , handelClick}}>
            {children}    
        </HouseContext.Provider>
    );
}

export default HouseContextProvider;