import { FaRegHandshake } from "react-icons/fa";

// 1. Define type for about object
type AboutItem = {
  id: number;
  title: string;
  des: string;
};

// 2. Define props type
type AboutPartProps = {
  about: AboutItem;
};

export function AboutPart({ about }: AboutPartProps) {
  return (
    <div>
      <div className="p-2 w-full h-32 shadow-1 flex justify-start my-1">
        <div className="flex justify-center w-44">
          <FaRegHandshake className="text-7xl font-bold text-violet-500" />
        </div>

        <div>
          <h6 className="text-start text-xl font-bold p-1">{about.title}</h6>

          <p className="text-sm p-1 text-justify">{about.des}</p>
        </div>
      </div>
    </div>
  );
}
