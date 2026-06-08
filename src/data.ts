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
  {
    id: 5,
    type: "House",
    name: "House 5",
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
    id: 6,
    type: "House",
    name: "House 6",
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
