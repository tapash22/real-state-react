import { AiFillStar } from "react-icons/ai";

// 1. Type for image/review object
type SwiperItem = {
  image: string;
  title: string;
  tag: string;
  des: string;
  name: string;
};

// 2. Props type
type SwiperContentProps = {
  image: SwiperItem;
};

export function SwiperContent({ image }: SwiperContentProps) {
  return (
    <div className="flex flex-col lg:flex-row w-full rounded-lg justify-center items-stretch ">
      {/* LEFT IMAGE */}
      {/* <div className="w-full lg:w-1/2 h-[350px] p-4 flex justify-center items-center">
        <img
          src={image.image}
          alt={image.name}
          className="w-full h-full object-cover rounded-xl border-4 border-violet-500"
        />
      </div> */}

      {/* RIGHT CONTENT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center ">
        <div className="border-2 rounded-lg w-full  bg-violet-600 p-10">
          <p className="text-sm font-normal text-white">{image.title}</p>

          <h2 className="text-2xl font-bold py-2 text-white">{image.tag}</h2>

          <p className="text-sm font-normal text-white/90 mb-4 text-justify">
            {image.des}
          </p>

          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-white">{image.name}</h2>

            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} className="text-sm text-white" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
