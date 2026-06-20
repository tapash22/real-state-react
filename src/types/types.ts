export interface Property {
  id: number;
  title: string;
  price: number;
  lat: number;
  lng: number;
  rating: number;
  type: string;
  image: string;
  country?: string;
}

// export interface LocationType {
//   id: number;
//   name: string;
//   lat: number;
//   lng: number;
// }

export type MapItem = {
  id: number;
  name: string;
  lat: number;
  lng: number;

  // optional (for property-like data)
  title?: string;
  price?: number;
  image?: string;
  rating?: number;
  type?: string;
  country?: string;
};

export interface MapBounds {
  north: number;
  east: number;
  south: number;
  west: number;
}

// new home use interface declear

export interface Address {
  street: string;
  houseNumber: string;
  neighborhood: string;
  city: string;
  country: string;
}

export interface RegistrationPossible {
  required: boolean;
  localTerm: string;
}

export interface BookingDates {
  checkIn: string;
  checkOut: string;
}

export interface Pricing {
  monthlyRent: number;
  currency: string;
  includesBills: boolean;
  depositRequired: boolean;
  tenantProtectionFee: number;
  initialTotalToConfirm: number;
  calculationBasis: string;
}

export interface PropertyDetails {
  type: string;
  roomSizeSqm: number;
  totalPropertySizeSqm: number;
  isFurnished: boolean;
  totalCapacity: number;
  currentHousematesCount: number;
  housematesGender: "male" | "female" | "mixed";
}

export interface FacilitiesAndAmenities {
  unisexBathroom: boolean;
  sharedToilet: boolean;
  sharedKitchen: boolean;
  sharedKitchenware: boolean;
  hasLivingRoom: boolean;
  wifi: boolean;
  bed: boolean;
  tv: boolean;
}

export interface AgeRange {
  min: number;
  max: number;
}

export interface HouseRulesAndPreferences {
  allowedAgeRange: AgeRange;
  genderPreference: string;
  preferredTenantTypes: string[];
  suitableForCouples: boolean;
  playingMusicalInstruments: string;
  petsAllowed: boolean;
  smokingAllowed: boolean;
}

export interface CancellationRule {
  timeframe: string;
  refund: string;
}

export interface CancellationPolicy {
  type: string;
  rules: CancellationRule[];
  notes: string;
}

export interface Landlord {
  id: string;
  name: string;
  type: string;
  isVerified: boolean;
  isExcellentLandlord: boolean;
  rating: number;
  totalReviews: number;
  confirmedRentals: number;
  responseTime: string;
  responseRatePercent: number;
  joinedDate: string;
  languagesSpoken: string[];
  totalListings: number;
  descriptionSnippet: string;
}

export interface House {
  id: string;
  title: string;
  address: Address;
  status: string;
  registrationPossible: RegistrationPossible;
  bookingDates: BookingDates;
  pricing: Pricing;
  propertyDetails: PropertyDetails;
  facilitiesAndAmenities: FacilitiesAndAmenities;
  houseRulesAndPreferences: HouseRulesAndPreferences;
  cancellationPolicy: CancellationPolicy;
  landlord: Landlord;
}

// new home use interface declear end
