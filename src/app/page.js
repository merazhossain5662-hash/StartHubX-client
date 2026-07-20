import WhyStarthub from "@/components/WhyStarthub";
import Hero from "../components/Hero";
import ShitCards from "../components/ShitCards";
import Ready from "@/components/Ready";
import FeaturedSt from "@/components/FeaturedSt";

export default function Home() {
  return (
    <>
      <Hero />
      <ShitCards />
      <FeaturedSt></FeaturedSt>
      <WhyStarthub />
      <Ready />
    </>
  );
}
