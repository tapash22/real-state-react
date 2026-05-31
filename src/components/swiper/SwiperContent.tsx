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
    <div className="flex flex-row rounded-lg items-center">
      {/* LEFT IMAGE */}
      <div className="w-1/2 h-[300px] p-4 flex justify-center items-center">
        <img
          src={image.image}
          alt={image.name}
          className="w-2/4 h-[280px] rounded-xl border-4 border-violet-500"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-1/2 flex justify-center">
        <div className="border-2 p-4 rounded-lg w-[500px] bg-violet-600">
          <p className="text-sm font-normal text-start text-white">
            {image.title}
          </p>

          <h2 className="text-start text-2xl font-bold py-2 text-black mb-2 w-[250px]">
            {image.tag}
          </h2>

          <p className="text-sm font-normal text-justify mb-4 text-white">
            {image.des}
          </p>

          <div className="flex flex-row justify-between">
            <h2 className="text-sm font-semibold p-2 text-white">
              {image.name}
            </h2>

            {/* Stars */}
            <div className="flex flex-row gap-1 p-2">
              {[...Array(4)].map((_, i) => (
                <AiFillStar key={i} className="text-sm text-white" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
