import { About } from "../components/about/About";
import { Agents } from "../components/agent/Agents";
import { ClientsReview } from "../components/client/ClientsReview";
import { Demo } from "../components/Demo";
import { Banner } from "../components/house/Banner";
import { HomeList } from "../components/house/HomeList";
import { Partners } from "../components/partner/Partners";
import { PlaceList } from "../components/place/PlaceList";

export function Home() {
  return (
    <div className="w-full h-full">
      <Banner />
      <HomeList />
      <About />
      <Demo />
      <PlaceList />
      <ClientsReview />
      <Partners />
      <Agents />
    </div>
  );
}
