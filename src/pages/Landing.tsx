import Hero from "../sections/Hero.tsx";
import Features from "../sections/Features.tsx";
import Subscriptions from "../sections/Subscriptions.tsx";
import Partners from "../sections/Partners.tsx";
import Benefits from "../sections/Benefits.tsx";
import HowItWorks from "../sections/HowItWorks.tsx";
import Testimonials from "../sections/Testimonials.tsx";
import FAQ from "../sections/FAQ.tsx";
import CTA from "../sections/CTA.tsx";

export default function Landing() {
  return (
    <>
      <Hero />
      <Partners />
      <Benefits />
      <Features />
      <Subscriptions />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
