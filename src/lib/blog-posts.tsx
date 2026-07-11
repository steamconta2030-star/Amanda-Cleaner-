import type { ReactNode } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingTime: string;
  keywords: string[];
  content: () => ReactNode;
};

const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-6 leading-relaxed text-foreground/90">{children}</p>
);
const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-14 font-serif text-2xl italic tracking-tight md:text-3xl">{children}</h2>
);
const UL = ({ children }: { children: ReactNode }) => (
  <ul className="mt-4 space-y-2 pl-5 text-foreground/90 [&>li]:list-disc [&>li]:marker:text-primary">
    {children}
  </ul>
);

export const POSTS: BlogPost[] = [
  {
    slug: "move-out-cleaning-checklist-tampa",
    title: "Move-out cleaning checklist for Tampa renters",
    excerpt:
      "Exactly what a landlord in Hillsborough County looks for before returning your deposit — room by room.",
    date: "2026-06-14",
    readingTime: "6 min",
    keywords: [
      "move out cleaning tampa",
      "move out cleaning checklist",
      "end of lease cleaning tampa",
    ],
    content: () => (
      <>
        <P>
          A move-out clean isn't a regular clean with the volume turned up. It's a specific job: the
          landlord walks in with a checklist, and you want every line on that checklist to be a
          quiet <em>yes</em>. Below is what we clean, in order, when a Tampa renter hands us the
          keys on the last day.
        </P>
        <H2>Before we start</H2>
        <UL>
          <li>The unit is empty. Furniture and boxes are already out.</li>
          <li>Power and water are still on until the walkthrough.</li>
          <li>All personal items (medicine cabinet, closet shelves, under sinks) are removed.</li>
        </UL>
        <H2>Kitchen</H2>
        <UL>
          <li>Inside oven, racks, drip pans and broiler drawer — degreased.</li>
          <li>Inside microwave, top and vents.</li>
          <li>Fridge and freezer emptied, defrosted, wiped inside and behind.</li>
          <li>Cabinets and drawers — inside and out, including tops.</li>
          <li>Countertops, backsplash and sink descaled.</li>
          <li>Dishwasher filter cleaned; a hot rinse cycle run.</li>
        </UL>
        <H2>Bathrooms</H2>
        <UL>
          <li>Tub, tile and grout scrubbed; hard-water stains removed.</li>
          <li>Toilet — bowl, base, behind and the bolt caps.</li>
          <li>Mirror, vanity, faucets polished.</li>
          <li>Exhaust fan cover dusted and washed.</li>
        </UL>
        <H2>Every room</H2>
        <UL>
          <li>Baseboards, door frames and doors wiped by hand.</li>
          <li>Light switches, outlet covers and thermostat.</li>
          <li>Ceiling fans and light fixtures.</li>
          <li>Windows inside, tracks and sills.</li>
          <li>Blinds dusted slat by slat.</li>
          <li>Closets — shelves, rods and floor.</li>
          <li>Floors vacuumed and mopped last, on the way out.</li>
        </UL>
        <H2>The small things landlords actually check</H2>
        <P>
          After doing this in Tampa since 2020, a few items come up on almost every walkthrough:
          the top of the fridge, the range hood filter, the sliding door track, the washer/dryer
          gasket and the patio slider. If you only have an hour, spend it there.
        </P>
        <H2>How long it takes</H2>
        <P>
          A 1-bed apartment in South Tampa is usually 4–5 hours for one person doing it right. A
          3-bed house in Westchase is closer to a full day. If you're doing it yourself, block the
          day — a rushed move-out clean is the most common reason deposits get held.
        </P>
        <P>
          If you'd rather hand the keys over and be done,{" "}
          <a
            href="https://wa.me/18133649757?text=Hi%20Amanda!%20I%27d%20like%20a%20move-out%20clean."
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-primary/50 underline-offset-4 hover:decoration-primary"
          >
            send a WhatsApp
          </a>{" "}
          with the address and move-out date — I'll come by for a quick look and quote it flat.
        </P>
      </>
    ),
  },
  {
    slug: "deep-vs-regular-cleaning",
    title: "Deep cleaning vs. regular cleaning: which one do you need?",
    excerpt:
      "A plain-English guide to knowing when a regular tidy is enough and when your home is asking for the deeper reset.",
    date: "2026-06-28",
    readingTime: "5 min",
    keywords: [
      "deep cleaning vs regular cleaning",
      "deep cleaning tampa",
      "how often deep clean",
    ],
    content: () => (
      <>
        <P>
          Every week I get the same question on WhatsApp: <em>do I need a deep clean, or is the
          regular one fine?</em> The short answer — most homes need a deep clean once, then regular
          cleans keep it there. Here's how to tell where yours is.
        </P>
        <H2>What "regular" actually covers</H2>
        <P>
          A regular clean is maintenance. It's the visible surfaces you touch and see every day:
          kitchen counters, bathrooms top to bottom, dust on furniture, floors, taking the trash
          out. It assumes the home is already in a good baseline — nothing has been building up for
          months.
        </P>
        <H2>What "deep" adds</H2>
        <UL>
          <li>Baseboards, door frames and doors — wiped by hand, not swiped past.</li>
          <li>Inside the oven, inside the microwave, behind the fridge if it moves.</li>
          <li>Shower grout scrubbed instead of sprayed and rinsed.</li>
          <li>Cabinet fronts, handles and the tops of everything you can't see from standing.</li>
          <li>Vents, fan blades, light fixtures, blinds slat by slat.</li>
          <li>Windows inside and their tracks.</li>
        </UL>
        <P>
          A deep clean takes roughly twice as long as a regular clean of the same home. That's not
          a markup — it's the extra hours.
        </P>
        <H2>Quick self-check</H2>
        <P>You probably need a deep clean if any of these are true:</P>
        <UL>
          <li>It's been more than six months since anyone cleaned properly.</li>
          <li>You just moved in, or a tenant just moved out.</li>
          <li>You can see dust on the baseboards or the tops of door frames.</li>
          <li>The shower grout is turning brown.</li>
          <li>Someone in the house has allergies acting up.</li>
          <li>You're hosting family and want the home to feel new.</li>
        </UL>
        <H2>The rhythm I recommend</H2>
        <P>
          One deep clean to reset the home, then a regular clean every two weeks to hold it. In
          Tampa's humidity, homes that go longer than a month between cleans start showing it in
          the bathrooms first — that's the real reason to keep a rhythm, not the dust.
        </P>
        <P>
          Not sure which one your home needs? Text me a couple of photos on{" "}
          <a
            href="https://wa.me/18133649757?text=Hi%20Amanda!%20Deep%20or%20regular%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-primary/50 underline-offset-4 hover:decoration-primary"
          >
            WhatsApp
          </a>{" "}
          and I'll tell you honestly.
        </P>
      </>
    ),
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
