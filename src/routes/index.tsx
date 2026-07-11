import { createFileRoute } from "@tanstack/react-router";
import { LangProvider, FAQ_ITEMS_EN } from "@/components/home/lang";
import { ChatWidget } from "@/components/ChatWidget";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { Pricing } from "@/components/home/Pricing";
import { Gallery } from "@/components/home/Gallery";
import { QuoteForm } from "@/components/home/QuoteForm";
import { Contact } from "@/components/home/Contact";
import { FAQ } from "@/components/home/FAQ";
import { Footer } from "@/components/home/Footer";
import { MobileCta } from "@/components/home/MobileCta";

const SITE_URL = "https://amanda-cleaning.lovable.app";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-cover.jpg` },
      { name: "twitter:image", content: `${SITE_URL}/og-cover.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HouseCleaningService",
          name: "Amanda & Co. Boutique Home Cleaning",
          image: `${SITE_URL}/og-cover.jpg`,
          url: SITE_URL,
          telephone: "+1-813-364-9757",
          email: "amandaanalaura19@gmail.com",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "6429 Wilshire Dr",
            addressLocality: "Tampa",
            addressRegion: "FL",
            postalCode: "33615",
            addressCountry: "US",
          },
          geo: { "@type": "GeoCoordinates", latitude: 27.9931, longitude: -82.5731 },
          areaServed: [
            { "@type": "City", name: "Tampa" },
            { "@type": "AdministrativeArea", name: "Hillsborough County, FL" },
          ],
          openingHoursSpecification: [{
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            opens: "08:00",
            closes: "18:00",
          }],
          sameAs: ["https://www.instagram.com/amandas_elite_services_"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Cleaning services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential Cleaning" }, price: "150", priceCurrency: "USD" },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deep Cleaning" }, price: "300", priceCurrency: "USD" },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move In / Move Out Cleaning" }, price: "250", priceCurrency: "USD" },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Post-Construction Cleaning" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Cleaning" } },
            ],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS_EN.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Gallery />
        <QuoteForm />
        <FAQ />
        <Contact />
        <Footer />
        <MobileCta />
        <ChatWidget />
      </div>
    </LangProvider>
  );
}
