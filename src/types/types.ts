export interface Property {
  id: number;
  title: string;
  price: number;
  lat: number;
  lng: number;
  rating: number;
  type: string;
  image: string;
}

export interface MapBounds {
  north: number;
  east: number;
  south: number;
  west: number;
}
