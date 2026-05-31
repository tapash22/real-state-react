import image from "../../assets/house1.jpg";
import { Search } from "./Search";

type BannerProps = {
  // add props later if needed
};

export function Banner(_props: BannerProps) {
  return (
    <section>
      <div className="bg-white flex flex-col lg:flex-row h-full items-center">
        {/* LEFT CONTENT */}
        <div className="bg-white p-10 block mx-auto">
          <div className="flex justify-start mb-4">
            <span className="text-3xl font-bold uppercase mx-4 text-start">
              Your Home Anywhere. Stay for Days, Months, or Longer.
            </span>
          </div>

          <div className="flex">
            <p className="text-justify text-sm mx-4 font-semibold">
              Connect directly with local homeowners across the globe. Secure
              your space, negotiate your terms, and live like a local.
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:block lg:w-full">
          <img
            src={image}
            alt="banner house"
            className="w-full h-full p-1 rounded-xl shadow-md object-cover"
          />
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div>
        <Search />
      </div>
    </section>
  );
}
