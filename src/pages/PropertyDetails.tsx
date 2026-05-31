import { BiArea, BiBath, BiBed } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { houseData } from "../data";

type AgentType = {
  image: string;
  name: string;
  phone: string;
};

type HouseType = {
  id: number;
  type: string;
  name: string;
  address: string;
  country: string;
  price: string;
  imageLg: string;
  bedroom: string;
  bathroom: string;
  surface: string;
  description: string;
  agent: AgentType;
};

export default function PropertyDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const houseView = (houseData as HouseType[]).find(
    (house) => house.id === Number(id),
  );

  // ✅ safety check (important)
  if (!houseView) {
    return <div className="p-5">Property not found</div>;
  }

  return (
    <section className="p-4">
      <div className="container mx-auto min-h-[800px] mb-14">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-start">
              {houseView.name}
            </h2>
            <h3 className="text-lg mb-4">{houseView.address}</h3>
          </div>

          <div className="mb-4 flex gap-x-2 text-sm">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full">
              {houseView.type}
            </div>
            <div className="bg-violet-500 text-white px-3 py-1 rounded-full">
              {houseView.country}
            </div>
          </div>

          <div className="text-3xl text-violet-600 font-semibold mb-4">
            Tk. {houseView.price}
          </div>
        </div>

        {/* BODY */}
        <div className="flex flex-col lg:flex-row gap-x-8 gap-y-4 items-start">
          {/* LEFT SIDE */}
          <div className="max-w-[768px] mb-4">
            <div className="mb-8">
              <img src={houseView.imageLg} alt={houseView.name} />
            </div>

            <div className="flex gap-x-6 text-violet-700 mb-6">
              <div className="flex gap-x-2 items-center">
                <BiBed className="text-2xl" />
                <div>{houseView.bedroom}</div>
              </div>

              <div className="flex gap-x-2 items-center">
                <BiBath className="text-2xl" />
                <div>{houseView.bathroom}</div>
              </div>

              <div className="flex gap-x-2 items-center">
                <BiArea className="text-2xl" />
                <div>{houseView.surface}</div>
              </div>
            </div>

            <div className="text-justify">{houseView.description}</div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 bg-white w-full mb-8 border border-gray-300 rounded-lg px-6 py-8">
            <div className="flex items-center gap-x-4 mb-8">
              <div className="w-20 h-20 border border-gray-300 rounded-full">
                <img
                  src={houseView.agent.image}
                  alt={houseView.agent.name}
                  className="rounded-full w-20 h-20"
                />
              </div>

              <div>
                <div className="font-bold text-lg">{houseView.agent.name}</div>
                <Link to="/" className="text-violet-700 text-sm">
                  View Listing
                </Link>
              </div>
            </div>

            {/* FORM */}
            <form className="flex flex-col gap-y-2">
              <input
                type="text"
                placeholder="name"
                className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-12 text-sm"
              />
              <input
                type="email"
                placeholder="email"
                className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-12 text-sm"
              />
              <input
                type="text"
                placeholder="phone"
                className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-12 text-sm"
              />
              <textarea
                placeholder="Write something"
                className="border border-gray-300 focus:border-violet-700 outline-none resize-none rounded w-full p-4 h-32 text-sm"
              />

              <div className="flex gap-x-2">
                <button className="bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition">
                  Send Message
                </button>

                <button className="border border-violet-700 hover:border-violet-500 hover:text-violet-500 rounded p-4 text-sm w-full transition">
                  Call
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
