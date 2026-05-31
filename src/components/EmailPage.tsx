import ep from "../assets/ep.jpg";

type EmailPageProps = {
  // add props later if needed
};

export function EmailPage(_props: EmailPageProps) {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 flex justify-center items-center bg-violet-600">
          <div>
            <h2 className="text-3xl text-start font-semibold py-2 text-white">
              Are You a Home Owner
            </h2>

            <p className="py-2 text-sm font-bold text-start text-gray-200">
              Put your email address and get listed?
            </p>

            <div className="my-2 border-2 border-white rounded-xl flex overflow-hidden">
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="pl-3 text-gray-300 text-sm font-semibold h-10 py-1 bg-violet-600 outline-none w-full"
              />

              <button className="bg-white px-4 text-sm font-semibold">
                Get Listed
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex">
          <img
            src={ep}
            alt="building"
            className="rounded-md w-full h-[300px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
