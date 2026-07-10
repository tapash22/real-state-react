import house1 from "../../assets/house1.jpg";
import { aboutDetailList } from "../../data";
import { SectionHeader } from "../header-section/SectionHeader";
import { AboutPart } from "./AboutPart";

export function About() {
  return (
    <section className="my-8 lg:my-16 w-full px-8 lg:px-16 transition-colors duration-300">
      <div className="flex flex-col justify-center items-center  w-full ">
        {/* TOP HEADER TYPOGRAPHY */}
        <SectionHeader
          tagTitle="Why choose us"
          headerTitle="WE PROVIDE LATEST PROPERTY FOR OUR VALUABLE CLIENT"
          subTitle="  This is a very beautiful house with a south-facing view. The
            structural materials used are imported directly from Italy. It
            features 4 spacious rooms, 3 washrooms, and every room includes 2
            windows with an attached balcony."
        />

        {/* from parent used */}

        {/* Body CONTENT GRID */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 w-full items-center">
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
          <div className="flex flex-col gap-2 lg:gap-4 w-full lg:w-1/2">
            {aboutDetailList.map((about) => (
              <AboutPart key={about.id} about={about} />
            ))}
          </div>
        </div>

        {/* Body CONTENT GRID END*/}
      </div>
    </section>
  );
}
