import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

// using component are import and use
import { About } from "../components/about/About";
// import { Agents } from "../components/agent/Agents";
import { ClientsReview } from "../components/client/ClientsReview";
import { Demo } from "../components/Demo";
import { Banner } from "../components/house/Banner";
import { Partners } from "../components/partner/Partners";
// import { PlaceList } from "../components/place/PlaceList";
import { FAQAccordion } from "../components/accordion/FAQAccordion";
import { MapPage } from "../components/map-search/MapPage";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  useEffect(() => {
    const fadeSections = document.querySelectorAll("[data-scroll-fade]");

    fadeSections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          y: 150,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            // 🌟 THE FIX: Point GSAP directly to your custom scrolling element
            scroller: ".scrollbar-thin",
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        },
      );
    });

    // Recalculate everything for your custom container layout
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Banner />

      <div className="w-full space-y-5">
        <div data-scroll-fade>
          <About />
        </div>

        <div data-scroll-fade className="flex justify-center">
          <Demo />
        </div>

        <div data-scroll-fade>
          {/* <PlaceList /> */}
          <MapPage />
        </div>

        <div data-scroll-fade>
          <ClientsReview />
        </div>

        <div data-scroll-fade>
          <Partners />
        </div>

        <div data-scroll-fade>
          {/* <Agents /> */}
          <FAQAccordion />
        </div>
      </div>
    </div>
  );
}
