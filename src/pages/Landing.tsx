import Hero from "../sections/Hero.tsx";
import HowItWorks from "../sections/HowItWorks.tsx";
import Features from "../sections/Features.tsx";
import Partners from "../sections/Partners.tsx";
import Testimonials from "../sections/Testimonials.tsx";
import Subscriptions from "../sections/Subscriptions.tsx";
import FAQ from "../sections/FAQ.tsx";
import CTA from "../sections/CTA.tsx";

export default function Landing() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Partners />
      <Testimonials />
      <Subscriptions />
      <FAQ />
      <CTA />
    </>
  );
}
