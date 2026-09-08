import { ReactNode } from "react";
import { CiGlobe } from "react-icons/ci";
import { FiUserCheck } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import assets from "./assets/assets";
/* -----------------------------
  Types
------------------------------ */

import { IconType } from "react-icons";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Property } from "./types/types";

export interface SocialMediaItem {
  id: number | null;
  title: string;
  link: string;
  icon: IconType;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export const demoUser: User = {
  id: 1,
  name: "Demo User",
  email: "demo@example.com",
};

export type SocialMediaItems = SocialMediaItem[];

export const bangladeshCenter: [number, number] = [23.685, 90.3563];

export const staticPriceTiers = [
  "All Prices",
  "100-300",
  "300-600",
  "600-900",
  "900-1500",
  "1500-3000",
  "3000+",
];

export interface RentStepData {
  id: number;
  title: string;
  description: string;
  rentStepImage?: string;
  imageAlt: string;
}

export interface SidebarLink {
  text: string;
  url: string; // Placeholder for navigation/routing
}

export interface StepSidebar {
  title?: string;
  subtitle?: string;
  description?: string;
  link?: SidebarLink;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string[]; // Array to handle multiple paragraphs cleanly
  footerLink?: SidebarLink;
  sidebar: StepSidebar;
}

export interface RentalStep {
  id: number;
  title: string;
  description: string;
  // This allows us to pass custom preview UI components directly into our data array
  previewComponent?: ReactNode;
}

export interface PremiumFeaturesListType {
  id: number;
  key: string;
  label: string;
  description: string;
}

export interface WorkingStepsDataType {
  id: number;
  badge: string;
  title: string;
  description: string;
  imageView?: string;
}

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

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  link?: string | null;
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

export const socialMediaLinkList: SocialMediaItems = [
  {
    id: 1,
    title: "Facebook",
    link: "https://web.facebook.com/tapas.paul.54738/",
    icon: FaFacebook,
  },
  {
    id: 2,
    title: "Twitter",
    link: "https://x.com/tapasp263",
    icon: FaTwitter,
  },
  {
    id: 3,
    title: "GitHub",
    link: "https://github.com/tapash22",
    icon: FaGithub,
  },
  {
    id: 4,
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/tapash-paul-267896151/",
    icon: FaLinkedin,
  },
];

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

export interface AboutItem {
  id: number;
  title: string;
  des: string;
}

// about details
export const aboutDetailList: AboutItem[] = [
  {
    id: 1,
    title: "Budget Friendly",
    des: "We offer a wide range of affordable rooms and apartments designed to fit every budget. Whether you're a student or working professional, you can easily find a comfortable place to live without overspending, while still enjoying essential facilities and a quality lifestyle.",
  },
  {
    id: 2,
    title: "Prime Location",
    des: "Our properties are located in highly convenient and prime areas close to universities, offices, transportation hubs, and daily essential services. This ensures you save time on travel and enjoy a smooth, stress-free living experience in the heart of the city.",
  },
  {
    id: 3,
    title: "Trusted By Thousands",
    des: "Thousands of students, professionals, and families trust our platform to find safe, verified, and reliable homes. We prioritize transparency, security, and quality so you can book your next home with complete confidence and peace of mind.",
  },
];

export const rentalSteps: RentalStep[] = [
  {
    id: 1,
    title: "List your place",
    description:
      "Publish once and reuse whenever you need. Set custom prices, adjust availability, and block-off time for maintenance. Enjoy complete control over your listings.",
    // previewComponent: <ListingPreview /> (Defined below)
  },
  {
    id: 2,
    title: "Set prices and availability",
    description:
      "Choose when and for how long your property is available, set custom monthly rents to match demand.",
    // previewComponent: <CalendarPreview />
  },
  {
    id: 3,
    title: "Get rental applications",
    description:
      "Chat directly with tenants, manage messages from your inbox, exchange documents, find your perfect renter.",
    // previewComponent: <ApplicationPreview />
  },
  {
    id: 4,
    title: "Get paid",
    description:
      "Receive rent, deposit, utilities, and more, conveniently through HousingAnywhere's secure payment system.",
    // previewComponent: <PaymentPreview />
  },
];

// property list
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
export const faqData: FaqItem[] = [
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

// price list
export const priceOptions = [
  "1000000-20000000",
  "3000000-40000000",
  "5000000-60000000",
];

// feature list
export const featuresData = [
  {
    id: 1,
    Icon: IoShieldCheckmarkOutline,
    title: "Protection from last-minute cancellations",
    description:
      "To reserve accommodation, the tenant pays one month's rent in advance. Has the tenant cancelled after confirmation? HousingAnywhere guarantees the first month's rent.",
  },
  {
    id: 2,
    Icon: FiUserCheck,
    title: "Find your perfect tenant with ease",
    description:
      "Save time by only talking to those that you're interested in. Set the preferences for your ideal tenant, and receive messages from verified users who meet your criteria.",
  },
  {
    id: 3,
    Icon: CiGlobe,
    title: "Access to local and international tenants",
    description:
      "70% of the tenants from HousingAnywhere come from abroad and stay for 4-12 months. No more worrying about squatters or getting stuck with long-term low rents.",
  },
  {
    id: 4,
    Icon: LuCalendarDays,
    title: "Get bookings months in advance",
    description:
      "Publish once and reuse whenever you need. Set custom prices, adjust availability, and block-off time for maintenance. Enjoy complete control over your listings.",
  },
];

// pricing details
export const premiumFeaturesList: PremiumFeaturesListType[] = [
  {
    id: 1,
    key: "multi_unit_listings",
    label: "Multi-unit listings",
    description:
      "Manage and group multiple properties or inventory units under a single parent listing hierarchy.",
  },
  {
    id: 2,
    key: "availability_overview",
    label: "Availability overview",
    description:
      "A centralized dashboard to track booking states, calendar blockouts, and live occupancy schedules.",
  },
  {
    id: 3,
    key: "unlimited_api_integrations",
    label: "Unlimited API integrations",
    description:
      "Connect seamlessly with external software platforms, CRMs, and internal custom endpoints without data caps.",
  },
  {
    id: 4,
    key: "multiple_ibans_payout_routing",
    label: "Multiple IBANs, Payout routing",
    description:
      "Direct revenue shares into separate regional bank accounts using dynamic financial routing matrix logic.",
  },
  {
    id: 5,
    key: "combined_invoices_per_month",
    label: "Combined invoices per month",
    description:
      "Consolidate all transactional billing events, fees, and line items into a single monthly billing statement.",
  },
  {
    id: 6,
    key: "dedicated_account_manager",
    label: "Dedicated Account Manager",
    description:
      "Direct priority access to a designated platform specialist for optimization, support, and scale engineering.",
  },
];

// working flow
export const workingStepsData: WorkingStepsDataType[] = [
  {
    id: 1,
    badge: "1",
    title: "List your place",
    description:
      "Publish once and reuse whenever you need. Set custom prices, adjust availability, and block-off time for maintenance. Enjoy complete control over your listings.",
  },
  {
    id: 2,
    badge: "2",
    title: "Set prices and availability",
    description:
      "Choose when and for how long your property is available, set custom monthly rents to match demand.",
  },
  {
    id: 3,
    badge: "3",
    title: "Get rental applications",
    description:
      "Chat directly with tenants, manage messages from your inbox, exchange documents, find your perfect renter.",
  },
  {
    id: 4,
    badge: "4",
    title: "Get paid",
    description:
      "Receive rent, deposit, utilities, and more, conveniently through HousingAnywhere's secure payment system.",
  },
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
// rent process
export const RENTAL_STEPS_DATA: RentStepData[] = [
  {
    id: 1,
    title: "List your place",
    description:
      "Create your listings within 5 minutes and make your properties visible to the world!",
    rentStepImage: assets.find_rent,
    imageAlt: "Illustration of a house with a magnifying glass",
  },
  {
    id: 2,
    title: "Rent it out",
    description:
      "Receive contact requests, select your favorite tenants and confirm the rental.",
    rentStepImage: assets.rent,
    imageAlt: "Illustration of chat bubbles and connection dots",
  },
  {
    id: 3,
    title: "Get paid",
    description: "Get paid out after your tenant has successfully moved-in.",
    rentStepImage: assets.rent_payment,
    imageAlt: "Illustration of people holding up a large payment card",
  },
];

// booking process
export const BOOKING_PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: "Search fast, search smart",
    description: [
      "Browse through hundreds of properties in 30+ countries. Save your favorites and create search alerts so you don't miss your dream place.",
    ],
    footerLink: { text: "Start your search now", url: "/search" },
    sidebar: {
      title: "Free",
      description: "Access to all our properties, completely free.",
      link: { text: "START YOUR SEARCH NOW >", url: "/search" },
    },
  },
  {
    id: 2,
    title: "Chat in real-time with verified landlords",
    description: [
      "For properties in The Netherlands: You can buy a subscription and enjoy unlimited messaging with landlords. We offer various subscription plans, all at a low price. Pick the one that suits you best.",
      "For properties in other countries: You can reach out to landlords for free. Ask all your burning questions, agree on the finer details, and if all goes well one of these verified landlords will become your new landlord.",
    ],
    footerLink: {
      text: "How do I get in touch with landlords?",
      url: "/faq/contact",
    },
    sidebar: {
      title: "The Netherlands – Buy a plan\nOther countries – Free",
      description: "Unlimited messaging with landlords",
      link: {
        text: "HOW DO I GET IN TOUCH WITH LANDLORDS? >",
        url: "/faq/contact",
      },
    },
  },
  {
    id: 3,
    title: "Book and pay securely online",
    description: [
      "For properties in The Netherlands: Pay the first month's rent, and the place is yours. There are no other fees.",
      "For properties in other countries: HousingAnywhere charges a one-time Tenant Protection fee of approximately 25%-40% of the first month's rent (minimum of €175).",
      "Wherever you book the place, we protect your rent and transfer it to the landlord only 48 hours after you've moved in.",
    ],
    footerLink: { text: "Learn more", url: "/tenant-protection" },
    sidebar: {
      title:
        "The Netherlands – No fees\nOther countries – Tenant Protection fee",
      description: "Only applied to the first month's rent",
      link: { text: "LEARN MORE >", url: "/tenant-protection" },
    },
  },
  {
    id: 4,
    title: "Pay your deposit, monthly rent and any extras",
    description: [
      "You can pay any post-booking costs (like admin, furnishing, or cleaning fees) using our secure payment system — for total peace of mind. Multiple payment methods accepted, including all major credit cards. Track your payments in real time and get invoices for all your official paperwork.",
    ],
    footerLink: { text: "More about payment requests", url: "/payments" },
    sidebar: {
      title: "UK and US – No fees\nOther countries – 2.5% service fee",
      description: "2.5% service fee applies",
      link: { text: "MORE ABOUT PAYMENT REQUESTS >", url: "/payments" },
    },
  },
];

// landlord Q/A
export const landlordFaqs: FaqItem[] = [
  {
    id: 1,
    question: "Why do you charge a commission fee?",
    answer:
      "Our fees allow us to operate our platform and services, including a dedicated customer support team, secure payment processing, API integrations, and fraud detection. We only charge this small commission fee when a tenant successfully books your place. You can list an unlimited number of properties and chat with potential tenants for free.",
  },
  {
    id: 2,
    question: "What happens if a tenant cancels their booking?",
    answer:
      "If your tenant cancels within 24 hours of booking your place, they are entitled to a full refund. After that period, you are covered by our landlord guarantee, meaning you will still receive the first month's rent even if the tenant cancels. The payout is made 48 hours after the tenant has moved in, provided that your property matches the listing description.",
  },
  {
    id: 3,
    question: "Do you offer a rent guarantee?",
    answer:
      "We currently do not offer a rent guarantee. However, we provide a secure online rent collection system that allows you to request rent, deposits, and any other payments directly from your tenants.",
  },
  {
    id: 4,
    question: "Do you provide insurance against property damage?",
    answer:
      "We currently do not offer property damage insurance. We strongly recommend charging your tenants a security deposit to cover any potential damages. You can easily request the security deposit through our secure online rent collection system.",
  },
];

// help page artical

export interface SubSection {
  id: string;
  title: string;
}

export interface Section {
  id: string;
  title: string;
  subsections?: SubSection[];
  content?: string[];
}

export interface ArticleData {
  title: string;
  subtitle: string;
  author: {
    name: string;
    avatar: string;
    date: string;
  };
  introParagraph: string;
  sections: Section[];
}

export const articleData: ArticleData = {
  title: "What is HousingAnywhere? (for tenants)",
  subtitle:
    "You're considering using HousingAnywhere but would like more information before trusting our platform.",
  author: {
    name: "Paweł",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Pawel",
    date: "August 20, 2025",
  },
  introParagraph:
    "HousingAnywhere is an online rental platform that connects home seekers (like you) with landlords. We help both sides achieve their renting goals — quick, online, and 100% safe.",
  sections: [
    {
      id: "overview",
      title: "Overview",
      subsections: [
        {
          id: "what-is-housinganywhere-exactly",
          title: "What is HousingAnywhere?",
        },
        {
          id: "how-it-works-in-a-nutshell",
          title: "How it works in a nutshell",
        },
      ],
    },
    {
      id: "what-is-housinganywhere-exactly",
      title: "What is HousingAnywhere, exactly?",
      content: [
        "We sometimes get asked, are you a real estate agency? The answer to that is no. We don't own any of the properties advertised on HousingAnywhere.  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci iusto ea recusandae temporibus. Ipsum debitis nam deserunt. Placeat a consequuntur voluptas natus, ut enim facere iusto et inventore, eaque quibusdam.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui modi ex distinctio quod cumque, repellat ad aliquam odio, corrupti sint provident blanditiis. Odit minima veritatis aliquam deleniti a? Illum, blanditiis.",
      ],
    },
    {
      id: "how-it-works-in-a-nutshell",
      title: "How it works in a nutshell",
      content: [
        "Search through thousands of verified rooms, apartments, and studios worldwide and book your new home direct with trusted landlords.  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci iusto ea recusandae temporibus. Ipsum debitis nam deserunt. Placeat a consequuntur voluptas natus, ut enim facere iusto et inventore, eaque quibusdam.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui modi ex distinctio quod cumque, repellat ad aliquam odio, corrupti sint provident blanditiis. Odit minima veritatis aliquam deleniti a? Illum, blanditiis.",
      ],
    },
    {
      id: "what-services-does-housinganywhere-provide",
      title: "What services does HousingAnywhere provide?",
      content: [
        "Secure payments, tenant protection guarantee, identity verification, and direct messaging with verified advertisers. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci iusto ea recusandae temporibus. Ipsum debitis nam deserunt. Placeat a consequuntur voluptas natus, ut enim facere iusto et inventore, eaque quibusdam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui modi ex distinctio quod cumque, repellat ad aliquam odio, corrupti sint provident blanditiis. Odit minima veritatis aliquam deleniti a? Illum, blanditiis.",
      ],
    },
    {
      id: "what-services-does-housinganywhere-not-provide",
      title: "What services does HousingAnywhere not provide?",
      content: [
        "In-person viewings, physical key handovers, or key holding services. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci iusto ea recusandae temporibus. Ipsum debitis nam deserunt. Placeat a consequuntur voluptas natus, ut enim facere iusto et inventore, eaque quibusdam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui modi ex distinctio quod cumque, repellat ad aliquam odio, corrupti sint provident blanditiis. Odit minima veritatis aliquam deleniti a? Illum, blanditiis.consequuntur voluptas natus, ut enim facere iusto et inventore, eaque quibusdam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui modi ex distinctio quod cumque, repellat ad aliquam odio, corrupti sint provident blanditiis. Odit minima veritatis aliquam deleniti a? Illum, blanditiis.",
      ],
    },
    {
      id: "is-housinganywhere-free",
      title: "Is HousingAnywhere free?",
      content: [
        "Creating an account and searching for listings is completely free for tenants. A small one-off service fee applies when a booking is confirmed.  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci iusto ea recusandae temporibus. Ipsum debitis nam deserunt. Placeat a consequuntur voluptas natus, ut enim facere iusto et inventore, eaque quibusdam. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui modi ex distinctio quod cumque, repellat ad aliquam odio, corrupti sint provident blanditiis. Odit minima veritatis aliquam deleniti a? Illum, blanditiis.",
      ],
    },
  ],
};

// map properties type declared and  the new format data with array of objects added

export interface MapBounds {
  north: number;
  east: number;
  south: number;
  west: number;
}

// Omit strict fields from MapItem/Property and make them optional/flexible

export type PropertyLike = Partial<Omit<MapItem & Property, "id">> & {
  id: number;
  id_str?: string;
  lat?: number;
  lng?: number;
  name?: string;
  title?: string;
  price?: number;
  image?: string;
  currency?: string;
  location?: string;
};

export type MapItem = {
  id: number;
  name: string;
  title: string;
  location?: string;

  lat?: number;
  lng?: number;

  price?: number;
  currency?: string;

  image: string;

  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  areaUnit?: string;

  propertyType: string;

  rating?: number;
  type?: string;
  country?: string;
};

export const cityExploreProperties: MapItem[] = [
  {
    id: 1,
    name: "Dhaka",
    title: "Modern Apartment in Gulshan",
    location: "Gulshan 2, Dhaka",
    lat: 23.8103,
    lng: 90.4125,

    price: 1550,
    currency: "$",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",

    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    areaUnit: "sq ft",

    propertyType: "Apartment",
  },

  {
    id: 2,
    name: "Chattogram",
    title: "Luxury Sea View Residence",
    location: "Panchlaish, Chattogram",
    lat: 22.3569,
    lng: 91.7832,

    price: 1250,
    currency: "$",

    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",

    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
    areaUnit: "sq ft",

    propertyType: "Condo",
  },

  {
    id: 3,
    name: "Sylhet",
    title: "Peaceful Family Home",
    location: "Zindabazar, Sylhet",
    lat: 24.8949,
    lng: 91.8687,

    price: 980,
    currency: "$",

    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",

    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    areaUnit: "sq ft",

    propertyType: "House",
  },

  {
    id: 4,
    name: "Khulna",
    title: "Contemporary City Apartment",
    location: "Sonadanga, Khulna",
    lat: 22.8456,
    lng: 89.5403,

    price: 850,
    currency: "$",

    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",

    bedrooms: 2,
    bathrooms: 2,
    area: 1050,
    areaUnit: "sq ft",

    propertyType: "Apartment",
  },

  {
    id: 5,
    name: "Rajshahi",
    title: "Spacious Garden Apartment",
    location: "Boalia, Rajshahi",
    lat: 24.3745,
    lng: 88.6042,

    price: 720,
    currency: "$",

    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80",

    bedrooms: 2,
    bathrooms: 1,
    area: 980,
    areaUnit: "sq ft",

    propertyType: "Apartment",
  },

  {
    id: 6,
    name: "Barishal",
    title: "Elegant Riverside Residence",
    location: "Nathullabad, Barishal",
    lat: 22.701,
    lng: 90.3535,

    price: 690,
    currency: "$",

    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",

    bedrooms: 3,
    bathrooms: 2,
    area: 1350,
    areaUnit: "sq ft",

    propertyType: "House",
  },

  {
    id: 7,
    name: "Rangpur",
    title: "Modern Minimalist Home",
    location: "Jahaj Company Mor, Rangpur",
    lat: 25.7439,
    lng: 89.2752,

    price: 620,
    currency: "$",

    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",

    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    areaUnit: "sq ft",

    propertyType: "Apartment",
  },
];

// propertyDetailsData

export interface Promotion {
  title: string;
  description?: string;
  bulletPoints: string[];
}

export interface Highlight {
  title: string;
  description: string;
  image: string;
}

export interface Services {
  general: string[];
}
export interface RoomUnit {
  id: string | number;
  title: string;
  pricePerMonth: number;
  images: string[];
  stayDuration?: string;
  sizeSqm: number;
  hasPrivateToilet?: boolean;
  hasPrivateBathroom?: boolean;
  hasPrivateKitchen?: boolean;
  hasPrivateBalcony?: boolean;
  maxCapacity: number;
  availableFrom: string;
  // Extended fields for the right-side detail drawer:
  descriptionHeader?: string;
  descriptionText?: string;
  totalPhotosCount?: number;
  whatsIncluded?: string[];
  paymentDetails?: {
    deposit?: number;
    utilities?: string;
  };
}

export interface ResidenceData {
  title: string;
  tenantCount: number;
  cleaningInfo: string;
  promotions: Promotion[];
  highlights: Highlight[];
  services: Services;
  roomUnits?: RoomUnit[];
}

export const SORT_OPTIONS = [
  "Recommended",
  "Lowest price",
  "Highest price",
  "Availability",
];

export const residenceData: ResidenceData = {
  title: "Micampus Wynwood Sancha",

  tenantCount: 36,

  cleaningInfo:
    "Cleaning room, change of sheets and towel included in the price. It is fortnightly",

  promotions: [
    {
      title: "PROMO FLASH SUMMER valid only for HousingAnywhere tenants",

      bulletPoints: [
        "NO ADMINISTRATION FEE and SPECIAL PRICE with maximum move out date August 2026.",
        "For longer stays, contact us!",
      ],
    },

    {
      title:
        "PROMO EARLY BOOKING COURSE 26/27 only for HousingAnywhere tenants",

      description:
        "50% DISCOUNT on the admin fee, applied to the second month of your rent.",

      bulletPoints: [
        "Example admin fee 250€:",
        "1- You will pay the full administration fee of 250€.",
        "2- When you pay the...",
      ],
    },
  ],

  highlights: [
    {
      title: "Entertainment room",

      description:
        "Relax and socialize in our communal lounge, featuring games and movie nights.",

      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&auto=format&fit=crop&q=60",
    },

    {
      title: "Gym",

      description:
        "Stay active with an on-site fitness center, equipped for all your workout needs.",

      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=60",
    },

    {
      title: "Dining area",

      description: "Share meals and stories in a spacious dining hall.",

      image:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&auto=format&fit=crop&q=60",
    },

    {
      title: "Laundry room",

      description:
        "Do laundry quickly and conveniently with modern washers and dryers.",

      image:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=60",
    },
  ],

  services: {
    general: [
      "24/7 On-site Security & Keycard Access",
      "High-speed Fiber Optic Internet",
      "Laundry Room with Washers & Dryers",
      "Co-working & Quiet Study Lounges",
      "Bicycle Storage Area",
    ],
  },
  // Data matching the exact values visible in your image
  roomUnits: [
    {
      id: "unit-601",
      title: "Studio Neon Gold with Balcony - Floor 6",
      pricePerMonth: 1559,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      ],
      stayDuration: "6–6 months",
      sizeSqm: 27,
      hasPrivateToilet: true,
      hasPrivateBathroom: true,
      hasPrivateKitchen: true,
      hasPrivateBalcony: true,
      maxCapacity: 2,
      availableFrom: "1 Oct 2026",
      descriptionHeader: "Life at Mitte-Wedding",
      descriptionText:
        "553 apartments, 553+ students... be one of us & meet extraordinary people. Mitte-Wedding is a unique meeting point of the iconic neighborhoods of Prenzlauer Berg, Mitte and Wedding. From the historical sites and clever co-working spaces near Bernauer Straße to the unique parks and eclectic cafes near Mauerpark, there is plenty to explore.",
      totalPhotosCount: 11,
      whatsIncluded: [
        "High-speed Fiber Optic WiFi",
        "All heating, water & electricity bills",
        "Private kitchenette & modern appliances",
        "Private balcony access with city view",
      ],
      paymentDetails: {
        deposit: 1559,
        utilities: "Included in base price",
      },
    },

    {
      id: "unit-402",
      title: "Standard Studio - Floor 4",
      pricePerMonth: 1250,
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      ],
      stayDuration: "3–12 months",
      sizeSqm: 21,
      hasPrivateToilet: true,
      hasPrivateBathroom: true,
      hasPrivateKitchen: true,
      hasPrivateBalcony: false,
      maxCapacity: 1,
      availableFrom: "15 Sep 2026",
      descriptionHeader: "Cozy & Efficient Living",
      descriptionText:
        "Designed for privacy and focus, this standard studio offers maximum efficiency with a built-in workspace, dedicated storage solutions, and access to all community amenities.",
      totalPhotosCount: 8,
      whatsIncluded: [
        "High-speed Fiber Optic WiFi",
        "All heating, water & electricity bills",
        "Private kitchenette",
      ],
      paymentDetails: {
        deposit: 1250,
        utilities: "Included in base price",
      },
    },

    {
      id: "unit-305",
      title: "Premium Studio with City View - Floor 3",
      pricePerMonth: 1395,
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      ],
      stayDuration: "6–12 months",
      sizeSqm: 24,
      hasPrivateToilet: true,
      hasPrivateBathroom: true,
      hasPrivateKitchen: true,
      hasPrivateBalcony: false,
      maxCapacity: 2,
      availableFrom: "20 Sep 2026",
      descriptionHeader: "Modern City Living",
      descriptionText:
        "A bright premium studio designed for comfortable long-term living. The apartment combines modern furniture, smart storage, and a functional private kitchen in a compact layout.",
      totalPhotosCount: 10,
      whatsIncluded: [
        "High-speed Fiber Optic WiFi",
        "Heating, water & electricity",
        "Fully equipped private kitchen",
        "Modern workspace",
        "Access to shared community areas",
      ],
      paymentDetails: {
        deposit: 1395,
        utilities: "Included in base price",
      },
    },

    {
      id: "unit-208",
      title: "Compact Studio - Floor 2",
      pricePerMonth: 1099,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
      ],
      stayDuration: "3–6 months",
      sizeSqm: 18,
      hasPrivateToilet: true,
      hasPrivateBathroom: true,
      hasPrivateKitchen: true,
      hasPrivateBalcony: false,
      maxCapacity: 1,
      availableFrom: "5 Oct 2026",
      descriptionHeader: "Smart Compact Living",
      descriptionText:
        "An affordable and efficient studio for students and young professionals. The space includes everything needed for comfortable everyday living while keeping monthly costs low.",
      totalPhotosCount: 7,
      whatsIncluded: [
        "High-speed Fiber Optic WiFi",
        "Heating and water",
        "Private kitchenette",
        "Furnished living and sleeping area",
      ],
      paymentDetails: {
        deposit: 1099,
        utilities: "Included in base price",
      },
    },

    {
      id: "unit-715",
      title: "Deluxe Studio with Balcony - Floor 7",
      pricePerMonth: 1699,
      images: [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      ],
      stayDuration: "6–12 months",
      sizeSqm: 31,
      hasPrivateToilet: true,
      hasPrivateBathroom: true,
      hasPrivateKitchen: true,
      hasPrivateBalcony: true,
      maxCapacity: 2,
      availableFrom: "1 Nov 2026",
      descriptionHeader: "Premium Comfort & City Views",
      descriptionText:
        "Our deluxe studio provides additional living space, premium furnishings, and a private balcony overlooking the city. Perfect for residents looking for extra comfort and a more spacious home.",
      totalPhotosCount: 14,
      whatsIncluded: [
        "High-speed Fiber Optic WiFi",
        "All heating, water & electricity bills",
        "Fully equipped private kitchen",
        "Private balcony",
        "Premium furniture",
        "Dedicated workspace",
        "Access to community amenities",
      ],
      paymentDetails: {
        deposit: 1699,
        utilities: "Included in base price",
      },
    },
  ],
};

export const premiumPropertyImages: string[] = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",

  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",

  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",

  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",

  "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=1200&q=80",

  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",

  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",

  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
];
