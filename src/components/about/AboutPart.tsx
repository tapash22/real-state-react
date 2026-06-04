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
    <div className="p-5 w-full h-full shadow-1 flex justify-start items-center my-1 gap-3 rounded-lg">
      <div className="flex justify-center w-auto">
        <FaRegHandshake className="text-7xl font-bold text-violet-500" />
      </div>

      <div className="space-y-2">
        <h6 className="text-start text-xl font-bold">{about.title}</h6>

        <p className="text-sm text-justify">{about.des}</p>
      </div>
    </div>
  );
}
