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

// export interface House {
//   id: number;
//   type: string;
//   rating: number;
//   name: string;
//   description: string;
//   image: string;
//   imageLg: string;
//   country: string;
//   address: string;

//   bedroom: string;
//   bathroom: string;
//   surface: string;
//   year: string;
//   price: string;
//   agent: Agent;
// }

export interface House {
  id: number;
  type: string;
  name: string;
  rating: number;
  lat: number;
  lng: number;

  description: string;
  image: string;
  imageLg: string; // Same as above
  country: string;
  address: string;
  bedroom: string; // Typed as string because your data uses "4"
  bathroom: string; // Typed as string because your data uses "3"
  surface: string; // e.g., "2000 sq ft"
  year: string; // Typed as string because your data uses "2023"
  price: string; // Typed as string because your data uses "2000000"
  agent: Agent;
}

export const houseData: House[] = [
  {
    id: 5,
    type: "Social hub",
    name: " Residence in Dhanmondi",
    description:
      "Cozy student residence property located in a vibrant community space.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400",
    imageLg:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400",
    country: "Bangladesh",
    address: "Dhanmondi 27, Dhaka",
    bedroom: "1",
    bathroom: "1",
    surface: "N/A",
    year: "2024",
    price: "786",
    rating: 4.8,
    lat: 23.7465,
    lng: 90.376,
    agent: {
      image:
        "https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg",
      name: "Tapash Paul",
      phone: "01674345763",
    },
  },
  {
    id: 6,
    type: "3 housemates",
    name: "Private Room in Mohammadpur",
    description:
      "Shared apartment setup with a private room and a welcoming community.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400",
    imageLg:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400",
    country: "Bangladesh",
    address: "Mohammadpur, Dhaka",
    bedroom: "1",
    bathroom: "1",
    surface: "N/A",
    year: "2024",
    price: "420",
    rating: 4.3,
    lat: 23.7639,
    lng: 90.3589,
    agent: {
      image:
        "https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg",
      name: "Tapash Paul",
      phone: "01674345763",
    },
  },
  {
    id: 7,
    type: "3 housemates",
    name: "Private Room in Mirpur DOHS",
    description:
      "Affordable shared living experience with a private room setup.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400",
    imageLg:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400",
    country: "Bangladesh",
    address: "Mirpur DOHS, Dhaka",
    bedroom: "1",
    bathroom: "1",
    surface: "N/A",
    year: "2024",
    price: "390",
    rating: 4.7,
    lat: 23.8223,
    lng: 90.3654,
    agent: {
      image:
        "https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg",
      name: "Tapash Paul",
      phone: "01674345763",
    },
  },
  {
    id: 8,
    type: "Entire apartment",
    name: "Luxury Apartment in Gulshan",
    description:
      "Premium luxury apartment boasting scenic views in the heart of Gulshan.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    imageLg:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    country: "Bangladesh",
    address: "Gulshan 2, Dhaka",
    bedroom: "2",
    bathroom: "2",
    surface: "1200 sq ft",
    year: "2025",
    price: "1066",
    rating: 4.9,
    lat: 23.7925,
    lng: 90.4078,
    agent: {
      image:
        "https://media.istockphoto.com/id/1270067126/photo/smiling-indian-man-looking-at-camera.jpg",
      name: "Tapash Paul",
      phone: "01674345763",
    },
  },
];

// Q & A

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  link: string | null;
}

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Is this platform a traditional real estate brokerage agency?",
    answer:
      "No, we are not a traditional real estate agency or media (dalal) service. We are an online rental marketplace connecting property owners directly with bachelors, families, and students looking for flats or sublets across Bangladesh.",
    link: null,
  },
  {
    id: 2,
    question:
      "How does the rental process work in Bangladesh through this portal?",
    answer:
      "You can browse verified listings by city, area (e.g., Gulshan, Mirpur, Dhanmondi), and budget. Once you find a flat or room, you can contact the landlord directly or view our guide for smoothly managing the deal.",
    link: "https://example.com.bd/rental-guide-bangladesh",
  },
  {
    id: 3,
    question:
      "My rental request was accepted. What are the next steps regarding the advance payment?",
    answer:
      "After acceptance, you will arrange to sign a standard tenancy agreement (Basha Bhara Chuktipatro). Following Bangladeshi rental norms, you will typically provide a 1 to 2-month security advance directly to the landlord to secure your booking.",
    link: null,
  },
  {
    id: 4,
    question: "What if I need to cancel my booking before moving in?",
    answer:
      "You can cancel your booking at any time before signing the rental contract. Refund policies regarding any token money or processing fees depend heavily on the landlord's specific policy and how early you cancel.",
    link: null,
  },
  {
    id: 5,
    question:
      "Can I physically visit the apartment before committing to the rent?",
    answer:
      "Yes! We highly encourage scheduling a physical visit to verify utility setups (WASA water supply, DESCO/DPDC prepaid electricity meters, and Titas Gas line status) and to check the neighborhood environment before finalizing your advance.",
    link: null,
  },
];

// export const faqData: FAQItem[] = [
//   {
//     id: 1,
//     question: "Are you a real estate agency?",
//     answer:
//       "No, we're not a real estate agency. HousingAnywhere is an online platform connecting people looking for their next home with landlords looking for tenants.",
//   },

//   {
//     id: 2,
//     question: "How does the renting process work?",
//     answer:
//       "You can find and rent your next home safely and entirely online. Listings include detailed descriptions, photos, videos, and floor plans. You can message landlords directly, exchange documents, and securely book your stay through the platform.",
//   },

//   {
//     id: 3,
//     question: "When do I pay for the booking?",
//     answer:
//       "You'll pay the first month's rent and, depending on the region, a Tenant Protection fee. Once the payment is received, your booking is confirmed and you'll receive the landlord's contact details. Remaining rental costs are paid directly to the landlord.",
//   },

//   {
//     id: 4,
//     question: "Can I cancel my booking?",
//     answer:
//       "Yes, you can cancel your stay at any time before moving in. Depending on the cancellation policy and timing, you may receive a full or partial refund. The Tenant Protection fee is non-refundable.",
//   },

//   {
//     id: 5,
//     question: "Do I need to visit the property before booking?",
//     answer:
//       "No, visiting is not required. Listings provide detailed descriptions, photos, videos, and floor plans to help you understand the property. You can also communicate with landlords directly before booking.",
//   },
// ];

// Q & A End

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

/* -----------------------------
  Houses Data
  houseData new format update to use
export const houseData: any[] = [
  {
    id: "maldonado-54-madrid",
    title: "Room for Rent – Maldonado 54, Madrid",
    address: {
      street: "Calle de Maldonado",
      houseNumber: "54",
      neighborhood: "Salamanca",
      city: "Madrid",
      country: "Spain"
    },
    status: "New",
    registrationPossible: {
      required: true,
      localTerm: "empadronamiento"
    },
    bookingDates: {
      checkIn: "2026-06-13",
      checkOut: "2026-07-21"
    },
    pricing: {
      monthlyRent: 430,
      currency: "EUR",
      includesBills: true,
      depositRequired: true,
      tenantProtectionFee: 175,
      initialTotalToConfirm: 605,
      calculationBasis: "Monthly basis"
    },
    propertyDetails: {
      type: "Private room in apartment",
      roomSizeSqm: 10,
      totalPropertySizeSqm: 135,
      isFurnished: true,
      totalCapacity: 7,
      currentHousematesCount: 7,
      housematesGender: "mixed"
    },
    facilitiesAndAmenities: {
      unisexBathroom: true,
      sharedToilet: true,
      sharedKitchen: true,
      sharedKitchenware: true,
      hasLivingRoom: false,
      wifi: true,
      bed: true,
      tv: true
    },
    houseRulesAndPreferences: {
      allowedAgeRange: {
        min: 18,
        max: 35
      },
      genderPreference: "No preference",
      preferredTenantTypes: ["Students", "working professionals"],
      suitableForCouples: false,
      playingMusicalInstruments: "Negotiable",
      petsAllowed: false,
      smokingAllowed: false
    },
    cancellationPolicy: {
      type: "Strict cancellation",
      rules: [
        {
          timeframe: "Within 24 hours of confirmation",
          refund: "Full refund of first month's rent"
        },
        {
          timeframe: "After 24 hours of confirmation",
          refund: "No refund"
        }
      ],
      notes: "The Tenant Protection fee is non-refundable."
    },
    landlord: {
      id: "sergio-01",
      name: "Sergio",
      type: "Rental company",
      isVerified: true,
      isExcellentLandlord: true,
      rating: 4.6,
      totalReviews: 144,
      confirmedRentals: 208,
      responseTime: "Responds within a day",
      responseRatePercent: 88,
      joinedDate: "2024-05-09",
      languagesSpoken: ["English", "Spanish"],
      totalListings: 579,
      descriptionSnippet: "Somos una empresa que contamos con más de 500 habitaciones de alquiler en España..."
    }
  },
  {
    id: "gran-via-12-madrid",
    title: "Premium Room next to Metro – Gran Vía 12, Madrid",
    address: {
      street: "Gran Vía",
      houseNumber: "12",
      neighborhood: "Centro",
      city: "Madrid",
      country: "Spain"
    },
    status: "Trending",
    registrationPossible: {
      required: true,
      localTerm: "empadronamiento"
    },
    bookingDates: {
      checkIn: "2026-07-01",
      checkOut: "2026-12-31"
    },
    pricing: {
      monthlyRent: 550,
      currency: "EUR",
      includesBills: false,
      depositRequired: true,
      tenantProtectionFee: 150,
      initialTotalToConfirm: 700,
      calculationBasis: "Monthly basis"
    },
    propertyDetails: {
      type: "Private room in apartment",
      roomSizeSqm: 15,
      totalPropertySizeSqm: 160,
      isFurnished: true,
      totalCapacity: 5,
      currentHousematesCount: 4,
      housematesGender: "mixed"
    },
    facilitiesAndAmenities: {
      unisexBathroom: false,
      sharedToilet: false,
      sharedKitchen: true,
      sharedKitchenware: true,
      hasLivingRoom: true,
      wifi: true,
      bed: true,
      tv: true
    },
    houseRulesAndPreferences: {
      allowedAgeRange: {
        min: 20,
        max: 30
      },
      genderPreference: "No preference",
      preferredTenantTypes: ["Students"],
      suitableForCouples: false,
      playingMusicalInstruments: "No",
      petsAllowed: false,
      smokingAllowed: true
    },
    cancellationPolicy: {
      type: "Flexible cancellation",
      rules: [
        {
          timeframe: "Up to 15 days before check-in",
          refund: "Full refund"
        }
      ],
      notes: "The Tenant Protection fee is non-refundable."
    },
    landlord: {
      id: "marta-02",
      name: "Marta",
      type: "Private landlord",
      isVerified: true,
      isExcellentLandlord: false,
      rating: 4.2,
      totalReviews: 18,
      confirmedRentals: 22,
      responseTime: "Responds within a few hours",
      responseRatePercent: 95,
      joinedDate: "2025-01-15",
      languagesSpoken: ["English", "Spanish", "French"],
      totalListings: 3,
      descriptionSnippet: "Hola! Soy Marta, gestiono algunos pisos compartidos en el centro de Madrid para estudiantes internacionales..."
    }
  },
  {
    id: "diagonal-230-barcelona",
    title: "Bright Room with Balcony – Avinguda Diagonal, Barcelona",
    address: {
      street: "Avinguda Diagonal",
      houseNumber: "230",
      neighborhood: "Poblenou",
      city: "Barcelona",
      country: "Spain"
    },
    status: "New",
    registrationPossible: {
      required: true,
      localTerm: "empadronamiento"
    },
    bookingDates: {
      checkIn: "2026-09-01",
      checkOut: "2027-02-28"
    },
    pricing: {
      monthlyRent: 490,
      currency: "EUR",
      includesBills: true,
      depositRequired: true,
      tenantProtectionFee: 180,
      initialTotalToConfirm: 670,
      calculationBasis: "Monthly basis"
    },
    propertyDetails: {
      type: "Private room in apartment",
      roomSizeSqm: 12,
      totalPropertySizeSqm: 110,
      isFurnished: true,
      totalCapacity: 4,
      currentHousematesCount: 3,
      housematesGender: "female"
    },
    facilitiesAndAmenities: {
      unisexBathroom: true,
      sharedToilet: true,
      sharedKitchen: true,
      sharedKitchenware: true,
      hasLivingRoom: true,
      wifi: true,
      bed: true,
      tv: false
    },
    houseRulesAndPreferences: {
      allowedAgeRange: {
        min: 18,
        max: 32
      },
      genderPreference: "Females only",
      preferredTenantTypes: ["Students", "working professionals"],
      suitableForCouples: false,
      playingMusicalInstruments: "No",
      petsAllowed: false,
      smokingAllowed: false
    },
    cancellationPolicy: {
      type: "Strict cancellation",
      rules: [
        {
          timeframe: "Within 24 hours of confirmation",
          refund: "Full refund"
        }
      ],
      notes: "The Tenant Protection fee is non-refundable."
    },
    landlord: {
      id: "lucia-bcn",
      name: "Lucia",
      type: "Rental company",
      isVerified: true,
      isExcellentLandlord: true,
      rating: 4.8,
      totalReviews: 89,
      confirmedRentals: 140,
      responseTime: "Responds within an hour",
      responseRatePercent: 100,
      joinedDate: "2023-11-02",
      languagesSpoken: ["English", "Spanish", "Catalan"],
      totalListings: 42,
      descriptionSnippet: "We offer cozy and well-located flatshares across Barcelona. Our mission is to make your stay hassle-free..."
    }
  },
  {
    id: "arago-415-barcelona",
    title: "Cosy Room near Sagrada Família – Carrer d'Aragó, Barcelona",
    address: {
      street: "Carrer d'Aragó",
      houseNumber: "415",
      neighborhood: "Eixample",
      city: "Barcelona",
      country: "Spain"
    },
    status: "Popular",
    registrationPossible: {
      required: false,
      localTerm: "Not allowed"
    },
    bookingDates: {
      checkIn: "2026-06-20",
      checkOut: "2026-08-31"
    },
    pricing: {
      monthlyRent: 390,
      currency: "EUR",
      includesBills: true,
      depositRequired: false,
      tenantProtectionFee: 120,
      initialTotalToConfirm: 510,
      calculationBasis: "Monthly basis"
    },
    propertyDetails: {
      type: "Private room in apartment",
      roomSizeSqm: 9,
      totalPropertySizeSqm: 95,
      isFurnished: true,
      totalCapacity: 3,
      currentHousematesCount: 2,
      housematesGender: "mixed"
    },
    facilitiesAndAmenities: {
      unisexBathroom: true,
      sharedToilet: true,
      sharedKitchen: true,
      sharedKitchenware: true,
      hasLivingRoom: false,
      wifi: true,
      bed: true,
      tv: false
    },
    houseRulesAndPreferences: {
      allowedAgeRange: {
        min: 18,
        max: 35
      },
      genderPreference: "No preference",
      preferredTenantTypes: ["working professionals"],
      suitableForCouples: false,
      playingMusicalInstruments: "No",
      petsAllowed: true,
      smokingAllowed: false
    },
    cancellationPolicy: {
      type: "Moderate",
      rules: [
        {
          timeframe: "30 days before check-in",
          refund: "50% refund"
        }
      ],
      notes: "The Tenant Protection fee is non-refundable."
    },
    landlord: {
      id: "javier-04",
      name: "Javier",
      type: "Private landlord",
      isVerified: true,
      isExcellentLandlord: false,
      rating: 4.5,
      totalReviews: 32,
      confirmedRentals: 31,
      responseTime: "Responds within a day",
      responseRatePercent: 90,
      joinedDate: "2024-02-20",
      languagesSpoken: ["English", "Spanish"],
      totalListings: 2,
      descriptionSnippet: "Hi, I am Javier. I have a room available in my flat in Eixample. Quiet environment, looking for clean flatmates..."
    }
  }
];

// houseData new format update to use

------------------------------ */
