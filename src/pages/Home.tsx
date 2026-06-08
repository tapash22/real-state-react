import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

import { About } from "../components/about/About";
import { Agents } from "../components/agent/Agents";
import { ClientsReview } from "../components/client/ClientsReview";
import { Demo } from "../components/Demo";
import { Banner } from "../components/house/Banner";
import { HomeList } from "../components/house/HomeList";
import RealEstateSearchModule from "../components/map-search/RealEstateSearchModule";
import { Partners } from "../components/partner/Partners";
import { PlaceList } from "../components/place/PlaceList";

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
          <HomeList />
        </div>

        <div data-scroll-fade>
          <About />
        </div>

        <div data-scroll-fade className="flex justify-center">
          <Demo />
        </div>

        <div data-scroll-fade>
          <PlaceList />
        </div>

        <div data-scroll-fade>
          <ClientsReview />
        </div>

        <div data-scroll-fade>
          <Partners />
        </div>

        <div data-scroll-fade>
          <Agents />
        </div>
        <div className=" w-full p-5 ">
          <RealEstateSearchModule />
        </div>
      </div>
    </div>
  );
}
