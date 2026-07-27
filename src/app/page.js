import WhyStarthub from "@/components/WhyStarthub";
import Hero from "../components/Hero";
import ShitCards from "../components/ShitCards";
import Ready from "@/components/Ready";
import FeaturedSt from "@/components/FeaturedSt";
import LatestOpp from "@/components/LatestOpp";

export default function Home() {
  return (
    <>
      <Hero />
      <ShitCards />
      <FeaturedSt></FeaturedSt>
      <LatestOpp></LatestOpp>
      <WhyStarthub />
      <Ready />
    </>
  );
}
