import React from "react";
import houseData from "../data";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";

function PropertyDetails(props) {
  const { id } = useParams();
  const houseView = houseData.find((house) => {
    return house.id === parseInt(id);
  });

  console.log(houseView);

  return (
    <section className="p-4">
      <div className="container mx-auto min-h-[800] mb-14 ">
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
                <div className="bg-violet-500 text-white px-3 py-1 rounded-full justify-end">
                   {houseView.country}
                </div>
            </div>
            <div className="text-3xl text-violet-600 font-semibold mb-4">
                Tk. {houseView.price}
            </div>
        </div>

        <div className="flex flex-col lg:flex lg:flex-row gap-x-8 gap-y-4 items-start">
          <div className="max-w-[768px] mb-4">
            <div className="mb-8">
              <img src={houseView.imageLg} alt="" />
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

          <div className="flex-1 bg-white w-full mb-8 border border-gray-300 rounded-lg px-6 py-8">
            <div className="flex items-center gap-x-4 mb-8">
              <div className="w-20 h-20 border border-gray-300 rounded-full">
                <img
                  src={houseView.agent.image}
                  alt=""
                  className="rounded-full w-20 h-20"
                />
              </div>
              <div>
                <div className="font-bold text-lg">{houseView.agent.name}</div>
                <Link to="" className="text-violet-700 text-sm">
                  View Listing
                </Link>
              </div>
            </div>
            <div>
              <form className="flex flex-col gap-y-2">
                <input
                  type="text"
                  placeholder="name"
                  className="border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-12 text-sm"
                />
                <input
                  type="text"
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
                  className="border border-gray-300 focus:border-violet-700 outline-none resize-none rounded w-full p-4 h-32 text-sm text-gray-400"
                ></textarea>
                <div className="flex gap-x-2">
                  <button className="bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition">
                    Send Message
                  </button>
                  <button className="border border-violet-700 hover:border-violet-500  hover:text-violet-500 rounded p-4 text-sm w-full transition">
                    Call
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetails;
