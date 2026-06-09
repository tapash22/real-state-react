import house1 from "../../assets/house1.jpg";
import { AboutPart } from "./AboutPart";

type AboutItem = {
  id: number;
  title: string;
  des: string;
};

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
    <section className="my-16 w-full px-16 transition-colors duration-300">
      <div className="flex flex-col gap-10 w-full">
        {/* TOP HEADER TYPOGRAPHY */}
        <div className="w-full flex flex-col justify-center items-center text-center space-y-5 max-w-6xl mx-auto">
          <h2
            style={{ color: "var(--button-bg)" }}
            className="text-sm font-extrabold uppercase tracking-widest"
          >
            Why choose us
          </h2>

          <h3
            style={{ color: "var(--text-heading)" }}
            className="text-2xl md:text-3xl font-extrabold tracking-wider whitespace-nowrap"
          >
            WE PROVIDE LATEST PROPERTY FOR OUR VALUABLE CLIENT
          </h3>

          <p
            style={{ color: "var(--text-paragraph)" }}
            className="text-sm font-medium tracking-wider leading-relaxed"
          >
            This is a very beautiful house with a south-facing view. The
            structural materials used are imported directly from Italy. It
            features 4 spacious rooms, 3 washrooms, and every room includes 2
            windows with an attached balcony.
          </p>
        </div>

        {/* BOTTOM CONTENT GRID */}
        <div className="flex flex-col lg:flex-row gap-8 w-full items-center">
          {/* IMAGE BLOCK */}
          <div
            style={{ borderColor: "var(--border)" }}
            className="w-full lg:w-1/2 h-[350px] md:h-[450px] overflow-hidden rounded-2xl shadow-md border"
          >
            <img
              src={house1}
              alt="Beautiful modern home exterior"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* DYNAMIC CARD ITEMS BLOCK */}
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            {abouts.map((about) => (
              <AboutPart key={about.id} about={about} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
