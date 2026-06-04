import { RiDoubleQuotesL } from "react-icons/ri";

type ClientReview = {
  id: number;
  image: string;
  title: string;
  des: string;
  tag: string;
  name: string;
};

type SwiperContentProps = {
  image: ClientReview; // maps to your custom 'item' object
};

export function SwiperContent({ image }: SwiperContentProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full">
      {/* LEFT PORTRAIT MEDIA CONTAINER */}
      <div
        style={{ borderColor: "var(--border)" }}
        className="w-full lg:w-2/5 aspect-[4/3] sm:aspect-[16/10] lg:aspect-square overflow-hidden rounded-2xl border bg-black/5 shrink-0 shadow-md"
      >
        <img
          src={image.image}
          alt={image.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT TESTIMONIAL INFORMATION CONTENT */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center space-y-4 relative">
        <RiDoubleQuotesL
          style={{ color: "var(--button-bg)" }}
          className="text-5xl md:text-6xl opacity-20 absolute -top-6 -left-2 pointer-events-none"
        />

        <div className="space-y-1 relative z-10">
          <span
            style={{ color: "var(--button-bg)" }}
            className="text-xs font-extrabold uppercase tracking-widest block"
          >
            {image.tag}
          </span>
          <h3
            style={{ color: "var(--text-heading)" }}
            className="text-xl font-bold tracking-tight"
          >
            {image.title}
          </h3>
        </div>

        <p
          style={{ color: "var(--text-paragraph)" }}
          className="text-sm md:text-base font-medium leading-relaxed italic"
        >
          "{image.des}"
        </p>

        <div className="pt-2">
          <h4
            style={{ color: "var(--text-heading)" }}
            className="text-base font-extrabold tracking-wide"
          >
            {image.name}
          </h4>
          <p
            style={{ color: "var(--text-paragraph)" }}
            className="text-xs font-semibold opacity-70"
          >
            Verified Resident
          </p>
        </div>
      </div>
    </div>
  );
}
