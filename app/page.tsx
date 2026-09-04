import Collection from "@/components/Collection";
import Difference from "@/components/Difference";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Steps from "@/components/Steps";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <Steps />
      <Collection />
      <Difference />
      <Testimonials />
    </>
  );
}
