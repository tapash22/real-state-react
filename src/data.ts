import assets from "./assets/assets";

/* -----------------------------
  Types
------------------------------ */

export interface Agent {
  image: string;
  name: string;
  phone: string;
}

export interface Project {
  id: number;
  name: string;
}

export interface Agency {
  id: number;
  name: string;
  details: string;
  place: string[];
  image: string;
  address: string;
  project: Project[];
  fuImage?: string;
}

export interface Place {
  id: number;
  title: string;
  image: string;
  fuImage?: string;
  sq: string;
  lists?: string[];
  agencies: Agency[];
}

export interface House {
  id: number;
  type: string;
  name: string;
  description: string;
  image: string;
  imageLg: string;
  country: string;
  address: string;
  bedroom: string;
  bathroom: string;
  surface: string;
  year: string;
  price: string;
  agent: Agent;
}

/* -----------------------------
  Houses Data
------------------------------ */

export const houseData: House[] = [
  {
    id: 1,
    type: "House",
    name: "House 1",
    description:
      "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone",
    image: assets.house1,
    imageLg: assets.house1lg,
    country: "Bangladesh",
    address: "Bonosree, rampura,dhaka",
    bedroom: "4",
    bathroom: "3",
    surface: "2000 sq ft",
    year: "2023",
    price: "1000000",
    agent: {
      image:
        "https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg",
      name: "tapash paul",
      phone: "01674345763",
    },
  },
  {
    id: 2,
    type: "House",
    name: "House 2",
    description:
      "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone",
    image: assets.house2,
    imageLg: assets.house2lg,
    country: "India",
    address: "Bonosree, rampura,dhaka",
    bedroom: "4",
    bathroom: "3",
    surface: "2000 sq ft",
    year: "2023",
    price: "2000000",
    agent: {
      image:
        "https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg",
      name: "tapash paul",
      phone: "01674345763",
    },
  },
  {
    id: 3,
    type: "House",
    name: "House 3",
    description:
      "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone",
    image: assets.house3,
    imageLg: assets.house3lg,
    country: "Canada",
    address: "Bonosree, rampura,dhaka",
    bedroom: "4",
    bathroom: "3",
    surface: "2000 sq ft",
    year: "2023",
    price: "4000000",
    agent: {
      image:
        "https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg",
      name: "tapash paul",
      phone: "01674345763",
    },
  },
  {
    id: 4,
    type: "House",
    name: "House 4",
    description:
      "this is very beautiful house and it's south face view and use metarials are imported from italie. there have 4 room, 3 wash room and every room have 2 window with attach balcone",
    image: assets.house1,
    imageLg: assets.house1lg,
    country: "America",
    address: "Bonosree, rampura,dhaka",
    bedroom: "4",
    bathroom: "3",
    surface: "2000 sq ft",
    year: "2023",
    price: "5000000",
    agent: {
      image:
        "https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg",
      name: "tapash paul",
      phone: "01674345763",
    },
  },
];

// home data need to implement future
// {
//   "id": "maldonado-54-madrid",
//   "title": "Room for Rent – Maldonado 54, Madrid",
//   "address": {
//     "street": "Calle de Maldonado",
//     "houseNumber": "54",
//     "neighborhood": "Salamanca",
//     "city": "Madrid",
//     "country": "Spain"
//   },
//   "status": "New",
//   "registrationPossible": {
//     "required": true,
//     "localTerm": "empadronamiento"
//   },
//   "bookingDates": {
//     "checkIn": "2026-06-13",
//     "checkOut": "2026-07-21"
//   },
//   "pricing": {
//     "monthlyRent": 430,
//     "currency": "EUR",
//     "includesBills": true,
//     "depositRequired": true,
//     "tenantProtectionFee": 175,
//     "initialTotalToConfirm": 605,
//     "calculationBasis": "Monthly basis"
//   },
//   "propertyDetails": {
//     "type": "Private room in apartment",
//     "roomSizeSqm": 10,
//     "totalPropertySizeSqm": 135,
//     "isFurnished": true,
//     "totalCapacity": 7,
//     "currentHousematesCount": 7,
//     "housematesGender": "mixed"
//   },
//   "facilitiesAndAmenities": {
//     "unisexBathroom": true,
//     "sharedToilet": true,
//     "sharedKitchen": true,
//     "sharedKitchenware": true,
//     "hasLivingRoom": false,
//     "wifi": true,
//     "bed": true,
//     "tv": true
//   },
//   "houseRulesAndPreferences": {
//     "allowedAgeRange": {
//       "min": 18,
//       "max": 35
//     },
//     "genderPreference": "No preference",
//     "preferredTenantTypes": ["Students", "working professionals"],
//     "suitableForCouples": false,
//     "playingMusicalInstruments": "Negotiable",
//     "petsAllowed": false,
//     "smokingAllowed": false
//   },
//   "cancellationPolicy": {
//     "type": "Strict cancellation",
//     "rules": [
//       {
//         "timeframe": "Within 24 hours of confirmation",
//         "refund": "Full refund of first month's rent"
//       },
//       {
//         "timeframe": "After 24 hours of confirmation",
//         "refund": "No refund"
//       }
//     ],
//     "notes": "The Tenant Protection fee is non-refundable."
//   },
//   "landlord": {
//     "id": "sergio-01",
//     "name": "Sergio",
//     "type": "Rental company",
//     "isVerified": true,
//     "isExcellentLandlord": true,
//     "rating": 4.6,
//     "totalReviews": 144,
//     "confirmedRentals": 208,
//     "responseTime": "Responds within a day",
//     "responseRatePercent": 88,
//     "joinedDate": "2024-05-09",
//     "languagesSpoken": ["English", "Spanish"],
//     "totalListings": 579,
//     "descriptionSnippet": "Somos una empresa que contamos con más de 500 habitaciones de alquiler en España. Nos encargamos de garantizar a nuestro inquilino la mayor confianza..."
//   }
// }

/* -----------------------------
  Place List
------------------------------ */

export const placeList: Place[] = [
  {
    id: 1,
    title: "Gulshan",
    image: assets.house1,
    fuImage: assets.house1lg,
    sq: "1800",
    lists: ["one", "two", "three"],
    agencies: [
      {
        id: 1,
        name: "Group of Company",
        details: "some thing have some new demo",
        place: ["one", "two", "three", "four", "five"],
        image: "https://thumbs.dreamstime.com/b/building-logo-icon-vector.jpg",
        address: "bonosree,rampura, Dhaka",
        project: [
          { id: 1, name: "tttt" },
          { id: 2, name: "tttt" },
          { id: 3, name: "tttt" },
          { id: 4, name: "tttt" },
        ],
      },
    ],
  },

  {
    id: 2,
    title: "Bonani",
    image: assets.house1,
    fuImage: assets.house1lg,
    sq: "1800",
    agencies: [],
  },
  {
    id: 3,
    title: "Bonani1",
    image: assets.house1,
    fuImage: assets.house1lg,
    sq: "1800",
    agencies: [],
  },
  {
    id: 4,
    title: "Gulshan2",
    image: assets.house1,
    fuImage: assets.house1lg,
    sq: "1800",
    agencies: [],
  },
];

export const priceOptions = [
  "1000000-20000000",
  "3000000-40000000",
  "5000000-60000000",
];
