import house1 from "../../assets/house1.jpg";
import { AboutPart } from "./AboutPart";

// 1. Define type for about item
type AboutItem = {
  id: number;
  title: string;
  des: string;
};

// 2. Define props type (you are not using props yet, so optional)
type AboutProps = {
  // add later if needed
};

export function About(_props: AboutProps) {
  const abouts: AboutItem[] = [
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

  return (
    <div className="my-10 w-full px-10">
      <div className="flex flex-col justify-start items-start  p-5 w-full ">
        <div className="w-full flex-flex-col justify-center items-center h-auto py-2">
          <h2 className=" text-center text-sm font-bold ">Why choose us</h2>

          <h3 className="text-2xl text-center font-semibold py-2 w-full">
            WE PROVIDE LATEST PROPERTY FOR OUR VALUABLE CLIENT
          </h3>

          <p className="text-sm font-medium text-center w-full">
            This is very beautiful house and it's south face view and use
            materials are imported from Italy. there have 4 room, 3 wash room
            and every room have 2 window with attach balcony
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 p-2 w-full h-full">
          <div className="w-1/2 min-h-[300px] overflow-hidden">
            <img
              src={house1}
              alt="house"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-center gap-3 p-5 flex-col w-1/2">
            {abouts.map((about) => (
              <AboutPart key={about.id} about={about} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
