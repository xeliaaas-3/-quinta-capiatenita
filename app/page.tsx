import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Facilities from "@/components/Facilities";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getPhotos } from "@/lib/store";

// Force dynamic rendering so photos are read from disk on every request
export const dynamic = "force-dynamic";

export default function Home() {
  const photos = getPhotos();
  return (
    <main>
      <Navbar />
      <Hero images={photos.hero} />
      <Stats />
      <Facilities />
      <Events />
      <Gallery items={photos.gallery} />
      <Pricing />
      <Booking />
      <Testimonials />
      <FAQ />
      <Location />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
