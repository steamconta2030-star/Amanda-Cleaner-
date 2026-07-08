import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import heroImage from "../assets/hero.jpg.asset.json";
import aboutImage from "../assets/amanda.jpg.asset.json";
import before1 from "../assets/before-1.jpg";
import after1 from "../assets/after-1.jpg";
import before2 from "../assets/before-2.jpg";
import after2 from "../assets/after-2.jpg";
import before3 from "../assets/before-3.jpg";
import after3 from "../assets/after-3.jpg";
import { ChatWidget } from "@/components/ChatWidget";

export const Route = createFileRoute("/")({
  component: Index,
});

const PHONE_DISPLAY = "+1 (813) 364-9757";
const PHONE_TEL = "+18133649757";
const PHONE_E164 = "18133649757";
const EMAIL = "amandaanalaura19@gmail.com";
const INSTAGRAM_HANDLE = "@amandas_elite_services_";
const INSTAGRAM_URL = "https://www.instagram.com/amandas_elite_services_";

const waLink = (text: string) =>
  `/obrigado?msg=${encodeURIComponent(text)}`;

/* ---------------- i18n ---------------- */

type Lang = "en" | "pt";

const dict = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      pricing: "Pricing",
      process: "How it works",
      gallery: "Gallery",
      quote: "Get a quote",
      contact: "Contact",
    },
    hero: {
      tag: "Boutique home cleaning · Florida",
      title1: "The care your home",
      title2: "deserves.",
      sub: "Personalized cleaning services from Amanda — with the attention to detail and trust you're looking for.",
      book: "Book on WhatsApp",
      see: "See services",
    },
    concept: {
      tag: "My approach",
      title1: "It's not just cleaning. It's",
      title2: "caring",
      title3: ".",
      items: [
        {
          title: "Attention to detail",
          desc: "Every corner, every surface. The work is done slowly, with method and a critical eye.",
        },
        {
          title: "Carefully chosen products",
          desc: "Gentle, effective formulas with a beautiful scent. Respectful of your home, your family and your pets.",
        },
        {
          title: "Complete trust",
          desc: "One person taking care of your home. No rotating crews, no strangers — just someone you can rely on.",
        },
      ],
    },
    about: {
      tag: "Meet Amanda",
      title1: "A personal touch you can",
      title2: "feel",
      title3: ".",
      p1: "I'm Amanda — the person behind every cleaning, from the first message to the moment you walk back into your fresh, quiet home.",
      p2: "I built this small boutique service because I believe your home deserves more than a rushed checklist. It deserves attention, calm and honest care — the kind you'd give it yourself if you had the time.",
      p3: "Working with a small handful of families across Florida means I know your space, your preferences and your routines. No surprises, just a home that feels like home again.",
      stat1a: "5+",
      stat1b: "Years of care",
      stat2a: "40+",
      stat2b: "Homes trusted",
      stat3a: "1:1",
      stat3b: "Personal service",
      alt: "Amanda, founder of Amanda & Co.",
    },
    services: {
      tag: "Services",
      title: "Choose what your home needs.",
      sub: "Every service is tailored to you. We go over the details by message before the first visit.",
      request: "Request",
      items: [
        {
          name: "Residential Cleaning",
          desc: "Regular weekly or bi-weekly cleanings to keep your home effortlessly fresh and cared for.",
        },
        {
          name: "Deep Cleaning",
          desc: "A detailed, top-to-bottom clean — inside the oven, fridge and every corner routine doesn't reach.",
        },
        {
          name: "Move In / Move Out",
          desc: "Turnover cleaning for empty homes, ready for the next chapter — yours or your buyer's.",
        },
        {
          name: "Post-Construction",
          desc: "Dust, debris and film removed after renovation or new construction, safely and thoroughly.",
        },
        {
          name: "Commercial Cleaning",
          desc: "Offices, studios and small businesses in the Tampa area — kept spotless on your schedule.",
        },
      ],
    },
    pricing: {
      tag: "Pricing",
      title1: "Honest,",
      title2: "up-front",
      title3: "pricing.",
      sub: "Every home is different. I prefer to visit and give you an exact quote, but online estimates are welcome too.",
      startingAt: "starting at",
      request: "Request a quote",
      note: "Post-construction and commercial cleanings are quoted individually — message for details.",
      plans: [
        {
          name: "Regular Cleaning",
          price: "$150",
          desc: "2 bedrooms · 2 bathrooms · standard residential cleaning.",
        },
        {
          name: "Deep Cleaning",
          price: "$300",
          desc: "2 bedrooms · 2 bathrooms · includes inside oven and refrigerator.",
        },
        {
          name: "Move In / Move Out",
          price: "$250",
          desc: "2 bedrooms · 2 bathrooms · includes inside oven and refrigerator.",
        },
      ],
    },
    process: {
      tag: "How it works",
      title: "Simple, from start to finish.",
      steps: [
        { n: "1", title: "Pick a day", desc: "Send a message with the date that works best for you." },
        { n: "2", title: "We go over the details", desc: "Space, priorities and preferences — all tailored to you." },
        { n: "3", title: "Relax", desc: "While Amanda takes care of everything, quietly and with care." },
      ],
      cta: "Ready to come home to a fresh space?",
      book: "Book on WhatsApp",
    },
    quote: {
      tag: "Get a quote",
      title1: "Tell me about your",
      title2: "home",
      title3: ".",
      sub: "Fill out a few details and I'll get back to you on WhatsApp with a personalized quote.",
      fName: "Your name",
      fService: "Service",
      fBedrooms: "Bedrooms",
      fBathrooms: "Bathrooms",
      fAddress: "Address or neighborhood",
      fDate: "Preferred date",
      fNotes: "Anything else I should know?",
      fNotesPh: "Pets, priorities, access, etc.",
      submit: "Send on WhatsApp",
      required: "Please fill in the required fields.",
      services: ["Residential Cleaning", "Deep Cleaning", "Move In / Move Out", "Post-Construction", "Commercial"],
      msgTitle: "Hi Amanda! I'd like a quote.",
    },
    contact: {
      tag: "Contact",
      title1: "Let's",
      title2: "talk",
      title3: ".",
      sub: "Send a quick message and Amanda will get back to you personally to plan the details of your visit.",
      phone: "Phone",
      phoneNote: "Available Mon–Sat, 8am – 6pm.",
      email: "Email",
      emailNote: "For quotes, questions and custom requests.",
      wa: "WhatsApp",
      waLine: "The easiest way.",
      waBtn: "Message on WhatsApp",
      area: "Service area",
      areaLine: "Based in Tampa, Florida — serving Tampa and surrounding areas.",
    },
    gallery: {
      tag: "Before & After",
      title1: "The",
      title2: "difference",
      title3: "is in the details.",
      sub: "A glimpse of real work — from lived-in to lovingly cared for.",
      before: "Before",
      after: "After",
      captions: [
        "Bedroom · Deep Clean",
        "Toaster Oven · Deep Clean",
        "Bathtub · Deep Clean",
      ],
      open: "Open",
      close: "Close lightbox",
      prev: "Previous image",
      next: "Next image",
      of: "of",
      dialogHint: "Use left and right arrow keys to navigate. Press Escape to close.",
    },
    footer: {
      line: "Personalized home cleaning · Florida",
    },
    lang: { switchTo: "PT", label: "Português" },
  },
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      services: "Serviços",
      pricing: "Preços",
      process: "Como funciona",
      gallery: "Galeria",
      quote: "Pedir orçamento",
      contact: "Contato",
    },
    hero: {
      tag: "Limpeza residencial boutique · Flórida",
      title1: "O cuidado que a sua casa",
      title2: "merece.",
      sub: "Serviços de limpeza personalizados da Amanda — com a atenção ao detalhe e a confiança que você procura.",
      book: "Agendar pelo WhatsApp",
      see: "Ver serviços",
    },
    concept: {
      tag: "Minha abordagem",
      title1: "Não é só limpeza. É",
      title2: "cuidado",
      title3: ".",
      items: [
        {
          title: "Atenção aos detalhes",
          desc: "Cada canto, cada superfície. O trabalho é feito com calma, método e olhar crítico.",
        },
        {
          title: "Produtos escolhidos com cuidado",
          desc: "Fórmulas suaves e eficazes, com um aroma agradável. Respeitosas com a casa, a família e os pets.",
        },
        {
          title: "Confiança total",
          desc: "Uma só pessoa cuidando da sua casa. Sem equipes rotativas, sem estranhos — só alguém em quem você pode confiar.",
        },
      ],
    },
    about: {
      tag: "Conheça a Amanda",
      title1: "Um toque pessoal que se",
      title2: "sente",
      title3: ".",
      p1: "Eu sou a Amanda — a pessoa por trás de cada limpeza, da primeira mensagem até o momento em que você volta pra uma casa fresca e tranquila.",
      p2: "Criei esse pequeno serviço boutique porque acredito que a sua casa merece mais do que uma checklist apressada. Merece atenção, calma e cuidado honesto — o tipo de cuidado que você mesma daria se tivesse tempo.",
      p3: "Trabalhar com um pequeno grupo de famílias pela Flórida significa que eu conheço o seu espaço, as suas preferências e as suas rotinas. Sem surpresas — só uma casa que volta a parecer casa.",
      stat1a: "5+",
      stat1b: "Anos de cuidado",
      stat2a: "40+",
      stat2b: "Casas atendidas",
      stat3a: "1:1",
      stat3b: "Atendimento pessoal",
      alt: "Amanda, fundadora da Amanda & Co.",
    },
    services: {
      tag: "Serviços",
      title: "Escolha o que a sua casa precisa.",
      sub: "Cada serviço é adaptado a você. Combinamos os detalhes por mensagem antes da primeira visita.",
      request: "Pedir",
      items: [
        {
          name: "Limpeza Residencial",
          desc: "Limpezas regulares, semanais ou quinzenais, para manter a sua casa fresca e cuidada sem esforço.",
        },
        {
          name: "Limpeza Profunda",
          desc: "Limpeza detalhada de cima a baixo — dentro do forno, geladeira e cada canto que a rotina não alcança.",
        },
        {
          name: "Move In / Move Out",
          desc: "Limpeza de mudança para casas vazias — prontas pro próximo capítulo, seu ou de quem chega.",
        },
        {
          name: "Pós-obra",
          desc: "Pó, entulho e resíduos removidos com segurança e minúcia depois de reforma ou construção nova.",
        },
        {
          name: "Limpeza Comercial",
          desc: "Escritórios, estúdios e pequenos negócios na região de Tampa — impecáveis no seu horário.",
        },
      ],
    },
    pricing: {
      tag: "Preços",
      title1: "Preços",
      title2: "honestos",
      title3: "e transparentes.",
      sub: "Cada casa é diferente. Prefiro visitar e passar um orçamento exato, mas estimativas online também são bem-vindas.",
      startingAt: "a partir de",
      request: "Pedir orçamento",
      note: "Limpezas pós-obra e comerciais são orçadas individualmente — envie mensagem para detalhes.",
      plans: [
        {
          name: "Limpeza Regular",
          price: "$150",
          desc: "2 quartos · 2 banheiros · limpeza residencial padrão.",
        },
        {
          name: "Limpeza Profunda",
          price: "$300",
          desc: "2 quartos · 2 banheiros · inclui parte interna do forno e da geladeira.",
        },
        {
          name: "Move In / Move Out",
          price: "$250",
          desc: "2 quartos · 2 banheiros · inclui parte interna do forno e da geladeira.",
        },
      ],
    },
    process: {
      tag: "Como funciona",
      title: "Simples, do início ao fim.",
      steps: [
        { n: "1", title: "Escolha o dia", desc: "Envie uma mensagem com a data que funcionar melhor pra você." },
        { n: "2", title: "Combinamos os detalhes", desc: "Espaço, prioridades e preferências — tudo personalizado." },
        { n: "3", title: "Relaxe", desc: "Enquanto a Amanda cuida de tudo, com discrição e carinho." },
      ],
      cta: "Pronta pra voltar pra uma casa fresca?",
      book: "Agendar pelo WhatsApp",
    },
    quote: {
      tag: "Pedir orçamento",
      title1: "Me conte sobre a sua",
      title2: "casa",
      title3: ".",
      sub: "Preencha alguns detalhes e eu retorno pelo WhatsApp com um orçamento personalizado.",
      fName: "Seu nome",
      fService: "Serviço",
      fBedrooms: "Quartos",
      fBathrooms: "Banheiros",
      fAddress: "Endereço ou bairro",
      fDate: "Data preferida",
      fNotes: "Algo mais que eu deva saber?",
      fNotesPh: "Pets, prioridades, acesso, etc.",
      submit: "Enviar pelo WhatsApp",
      required: "Por favor, preencha os campos obrigatórios.",
      services: ["Limpeza Residencial", "Limpeza Profunda", "Move In / Move Out", "Pós-obra", "Comercial"],
      msgTitle: "Oi Amanda! Gostaria de um orçamento.",
    },
    contact: {
      tag: "Contato",
      title1: "Vamos",
      title2: "conversar",
      title3: ".",
      sub: "Envie uma mensagem rápida e a Amanda responde pessoalmente pra combinar os detalhes da visita.",
      phone: "Telefone",
      phoneNote: "Disponível de segunda a sábado, das 8h às 18h.",
      email: "E-mail",
      emailNote: "Para orçamentos, dúvidas e pedidos personalizados.",
      wa: "WhatsApp",
      waLine: "O jeito mais fácil.",
      waBtn: "Enviar mensagem no WhatsApp",
      area: "Área de atendimento",
      areaLine: "Baseada em Tampa, Flórida — atendemos Tampa e região.",
    },
    gallery: {
      tag: "Antes e Depois",
      title1: "A",
      title2: "diferença",
      title3: "está nos detalhes.",
      sub: "Um pouco do trabalho real — do dia a dia ao cuidado com carinho.",
      before: "Antes",
      after: "Depois",
      captions: [
        "Quarto · Limpeza Profunda",
        "Forno Elétrico · Limpeza Profunda",
        "Banheira · Limpeza Profunda",
      ],
      open: "Abrir",
      close: "Fechar visualização",
      prev: "Imagem anterior",
      next: "Próxima imagem",
      of: "de",
      dialogHint: "Use as setas esquerda e direita para navegar. Pressione Esc para fechar.",
    },
    footer: {
      line: "Limpeza residencial personalizada · Flórida",
    },
    lang: { switchTo: "EN", label: "English" },
  },
};

type Dict = typeof dict.en;

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: dict.en,
});

function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    if (stored === "pt" || stored === "en") setLangState(stored);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang: (l: Lang) => {
        setLangState(l);
        if (typeof window !== "undefined") window.localStorage.setItem("lang", l);
      },
      t: dict[lang],
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

const useT = () => useContext(LangContext);

/* ---------------- Page ---------------- */

function Index() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        <Hero />
        <Concept />
        <About />
        <Services />
        <Pricing />
        <Process />
        <Gallery />
        <QuoteForm />
        <Contact />
        <Footer />
        <ChatWidget />
      </div>
    </LangProvider>
  );
}

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useT();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "pt" : "en")}
      aria-label={t.lang.label}
      className={`text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground ${className}`}
    >
      {lang === "en" ? "EN" : "PT"} <span className="opacity-40">·</span> {t.lang.switchTo}
    </button>
  );
}

function Nav() {
  const { t } = useT();
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <a href="#top" className="font-serif text-xl tracking-tight">
          Amanda <span className="italic text-primary">&amp;</span> Co.
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#top" className="hover:text-foreground transition-colors">{t.nav.home}</a>
          <a href="#about" className="hover:text-foreground transition-colors">{t.nav.about}</a>
          <a href="#servicos" className="hover:text-foreground transition-colors">{t.nav.services}</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">{t.nav.pricing}</a>
          <a href="#gallery" className="hover:text-foreground transition-colors">{t.nav.gallery}</a>
          <a href="#quote" className="hover:text-foreground transition-colors">{t.nav.quote}</a>
          <a href="#contact" className="hover:text-foreground transition-colors">{t.nav.contact}</a>
        </nav>
        <div className="flex items-center gap-4">
          <LangToggle />
          <a
            href={waLink("Hi Amanda!")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-foreground/20 px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background sm:inline-block"
          >
            {t.nav.contact}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useT();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-32 pb-20 md:grid-cols-2 md:gap-16 md:px-10 md:pt-40 md:pb-32">
        <div className="flex flex-col justify-center">
          <span className="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {t.hero.tag}
          </span>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
            {t.hero.title1} <em className="italic text-primary">{t.hero.title2}</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            {t.hero.sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={waLink(t.quote.msgTitle)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              {t.hero.book}
              <span aria-hidden>→</span>
            </a>
            <a href="#servicos" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
              {t.hero.see}
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={heroImage.url}
              alt="Calm, sunlit interior"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Concept() {
  const { t } = useT();
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.concept.tag}</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            {t.concept.title1} <em className="italic text-primary">{t.concept.title2}</em>{t.concept.title3}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
          {t.concept.items.map((item, i) => (
            <div key={item.title} className="border-t border-foreground/20 pt-6">
              <span className="font-serif text-sm italic text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-4 font-serif text-2xl leading-snug">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { t } = useT();
  return (
    <section id="about" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:gap-16 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={aboutImage.url}
              alt={t.about.alt}
              width={1200}
              height={1500}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center md:col-span-7">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.about.tag}</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            {t.about.title1} <em className="italic text-primary">{t.about.title2}</em>{t.about.title3}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-foreground/15 pt-8 text-sm">
            <div>
              <div className="font-serif text-3xl">{t.about.stat1a}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{t.about.stat1b}</div>
            </div>
            <div>
              <div className="font-serif text-3xl">{t.about.stat2a}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{t.about.stat2b}</div>
            </div>
            <div>
              <div className="font-serif text-3xl">{t.about.stat3a}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{t.about.stat3b}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useT();
  return (
    <section id="servicos">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.services.tag}</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
              {t.services.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t.services.sub}
          </p>
        </div>
        <ul className="divide-y divide-border border-t border-b border-border">
          {t.services.items.map((s, i) => (
            <li key={s.name} className="group grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <div className="text-xs uppercase tracking-widest text-muted-foreground md:col-span-1">
                0{i + 1}
              </div>
              <h3 className="font-serif text-2xl md:col-span-4 md:text-3xl">{s.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6">{s.desc}</p>
              <div className="md:col-span-1 md:text-right">
                <a
                  href="#quote"
                  className="text-sm text-foreground underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
                >
                  {t.services.request}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Pricing() {
  const { t } = useT();
  return (
    <section id="pricing" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.pricing.tag}</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
              {t.pricing.title1} <em className="italic text-primary">{t.pricing.title2}</em> {t.pricing.title3}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t.pricing.sub}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {t.pricing.plans.map((p, i) => (
            <div
              key={p.name}
              className={`flex flex-col justify-between rounded-sm border p-8 transition-colors ${
                i === 1 ? "border-primary/40 bg-primary/5" : "border-border bg-background"
              }`}
            >
              <div>
                <h3 className="font-serif text-2xl">{p.name}</h3>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-serif text-5xl">{p.price}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {t.pricing.startingAt}
                  </span>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
              <a
                href="#quote"
                className="mt-10 inline-flex items-center gap-2 text-sm text-foreground underline underline-offset-4 opacity-80 hover:opacity-100"
              >
                {t.pricing.request} <span aria-hidden>→</span>
              </a>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useT();
  return (
    <section id="processo" className="border-t border-border bg-accent/30">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.process.tag}</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            {t.process.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {t.process.steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="font-serif text-6xl italic text-primary/70 md:text-7xl">{s.n}</div>
              <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col items-start gap-6 border-t border-foreground/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-2xl italic md:text-3xl">
            {t.process.cta}
          </p>
          <a
            href={waLink(t.quote.msgTitle)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            {t.process.book}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { t } = useT();
  const pairs = [
    { before: before1, after: after1, caption: t.gallery.captions[0] },
    { before: before2, after: after2, caption: t.gallery.captions[1] },
    { before: before3, after: after3, caption: t.gallery.captions[2] },
  ];
  // Flatten to a single sequence: [before1, after1, before2, after2, ...]
  const slides = pairs.flatMap((p, i) => [
    { src: p.before, label: t.gallery.before, caption: p.caption, pair: i },
    { src: p.after, label: t.gallery.after, caption: p.caption, pair: i },
  ]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const titleId = useId();
  const descId = useId();
  const liveMsg = useMemo(() => {
    if (openIndex === null) return "";
    const s = slides[openIndex];
    return `${s.label}. ${s.caption}. ${openIndex + 1} ${t.gallery.of ?? "of"} ${slides.length}.`;
  }, [openIndex, slides, t.gallery]);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openAt = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    openerRef.current = e.currentTarget;
    setOpenIndex(index);
  };
  const close = () => setOpenIndex(null);
  const next = () => setOpenIndex((i) => (i === null ? i : (i + 1) % slides.length));
  const prev = () => setOpenIndex((i) => (i === null ? i : (i - 1 + slides.length) % slides.length));

  // Global keyboard shortcuts + body scroll lock while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Focus management: move focus into the dialog on open, restore on close.
  useEffect(() => {
    if (!isOpen) {
      openerRef.current?.focus?.();
      return;
    }
    // Defer so the dialog is in the DOM.
    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [isOpen]);

  // Focus trap: keep Tab / Shift+Tab inside the dialog.
  const onDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey) {
      if (active === first || !dialogRef.current.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const current = openIndex !== null ? slides[openIndex] : null;
  const closeLabel = t.gallery.close ?? "Close";
  const prevLabel = t.gallery.prev ?? "Previous image";
  const nextLabel = t.gallery.next ?? "Next image";

  return (
    <section id="gallery" className="border-t border-border" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.gallery.tag}</span>
          <h2 id="gallery-heading" className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            {t.gallery.title1} <em className="italic text-primary">{t.gallery.title2}</em> {t.gallery.title3}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t.gallery.sub}
          </p>
        </div>

        <ul className="space-y-16 md:space-y-24" role="list">
          {pairs.map((p, i) => (
            <li key={i}>
              <figure className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <button
                  type="button"
                  onClick={(e) => openAt(i * 2, e)}
                  className="group relative overflow-hidden rounded-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`${t.gallery.open ?? "Open"}: ${t.gallery.before} — ${p.caption}`}
                  aria-haspopup="dialog"
                >
                  <img
                    src={p.before}
                    alt={`${t.gallery.before} — ${p.caption}`}
                    width={1200}
                    height={1200}
                    loading="lazy"
                    className="h-full w-full object-cover aspect-square transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs uppercase tracking-widest text-foreground shadow-sm">
                    {t.gallery.before}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={(e) => openAt(i * 2 + 1, e)}
                  className="group relative overflow-hidden rounded-sm text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label={`${t.gallery.open ?? "Open"}: ${t.gallery.after} — ${p.caption}`}
                  aria-haspopup="dialog"
                >
                  <img
                    src={p.after}
                    alt={`${t.gallery.after} — ${p.caption}`}
                    width={1200}
                    height={1200}
                    loading="lazy"
                    className="h-full w-full object-cover aspect-square transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-xs uppercase tracking-widest text-background shadow-sm">
                    {t.gallery.after}
                  </span>
                </button>
                <figcaption className="md:col-span-2 border-t border-foreground/15 pt-4 text-xs uppercase tracking-widest text-muted-foreground">
                  0{i + 1} · {p.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && current && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm focus:outline-none"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          tabIndex={-1}
          onClick={close}
          onKeyDown={onDialogKeyDown}
        >
          {/* Live region announces the current slide for screen readers. */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {liveMsg}
          </div>

          <h2 id={titleId} className="sr-only">
            {current.label} — {current.caption}
          </h2>
          <p id={descId} className="sr-only">
            {t.gallery.dialogHint ??
              "Use left and right arrow keys to navigate. Press Escape to close."}
          </p>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={closeLabel}
          >
            <span aria-hidden="true" className="text-xl leading-none">×</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-8"
            aria-label={prevLabel}
            aria-controls={titleId}
          >
            <span aria-hidden="true" className="text-2xl leading-none">‹</span>
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-8"
            aria-label={nextLabel}
            aria-controls={titleId}
          >
            <span aria-hidden="true" className="text-2xl leading-none">›</span>
          </button>

          <div
            className="relative mx-6 flex max-h-[90vh] w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={`${current.label} — ${current.caption}`}
              className="max-h-[75vh] w-auto max-w-full rounded-sm object-contain"
            />
            <div className="mt-4 flex w-full items-center justify-between gap-4 text-white">
              <span
                className={`rounded-full px-3 py-1 text-xs uppercase tracking-widest ${
                  current.label === t.gallery.after
                    ? "bg-white text-black"
                    : "bg-white/15 text-white"
                }`}
              >
                {current.label}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/70">
                {current.caption}
              </span>
              <span className="text-xs uppercase tracking-widest text-white/50" aria-hidden="true">
                {String(openIndex! + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function QuoteForm() {
  const { t, lang } = useT();
  const [name, setName] = useState("");
  const [service, setService] = useState(t.quote.services[0]);
  const [bedrooms, setBedrooms] = useState("2");
  const [bathrooms, setBathrooms] = useState("2");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  // Keep the selected service label in sync with language switches (best-effort).
  useEffect(() => {
    setService(t.quote.services[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim()) {
      setError(t.quote.required);
      return;
    }
    setError("");
    const lines = [
      t.quote.msgTitle,
      "",
      `${t.quote.fName}: ${name.trim()}`,
      `${t.quote.fService}: ${service}`,
      `${t.quote.fBedrooms}: ${bedrooms}`,
      `${t.quote.fBathrooms}: ${bathrooms}`,
      `${t.quote.fAddress}: ${address.trim()}`,
    ];
    if (date) lines.push(`${t.quote.fDate}: ${date}`);
    if (notes.trim()) lines.push(`${t.quote.fNotes} ${notes.trim()}`);
    const url = waLink(lines.join("\n"));
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputCls =
    "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none";
  const labelCls = "block text-xs uppercase tracking-widest text-muted-foreground mb-2";

  return (
    <section id="quote" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.quote.tag}</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            {t.quote.title1} <em className="italic text-primary">{t.quote.title2}</em>{t.quote.title3}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t.quote.sub}
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-name">{t.quote.fName} *</label>
            <input
              id="q-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              required
              className={inputCls}
            />
          </div>

          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-service">{t.quote.fService}</label>
            <select
              id="q-service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={inputCls}
            >
              {t.quote.services.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-bed">{t.quote.fBedrooms}</label>
            <select
              id="q-bed"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className={inputCls}
            >
              {["1", "2", "3", "4", "5+"].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-bath">{t.quote.fBathrooms}</label>
            <select
              id="q-bath"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className={inputCls}
            >
              {["1", "2", "3", "4", "5+"].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-addr">{t.quote.fAddress} *</label>
            <input
              id="q-addr"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              maxLength={120}
              required
              className={inputCls}
            />
          </div>

          <div className="md:col-span-1">
            <label className={labelCls} htmlFor="q-date">{t.quote.fDate}</label>
            <input
              id="q-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelCls} htmlFor="q-notes">{t.quote.fNotes}</label>
            <textarea
              id="q-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={500}
              rows={4}
              placeholder={t.quote.fNotesPh}
              className={inputCls}
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="ml-auto inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              {t.quote.submit}
              <span aria-hidden>→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useT();
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.contact.tag}</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            {t.contact.title1} <em className="italic text-primary">{t.contact.title2}</em>{t.contact.title3}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t.contact.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-16">
          <div className="border-t border-foreground/20 pt-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{t.contact.phone}</span>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-4 block font-serif text-2xl leading-snug transition-colors hover:text-primary"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.contact.phoneNote}
            </p>
          </div>

          <div className="border-t border-foreground/20 pt-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{t.contact.email}</span>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 block font-serif text-2xl leading-snug transition-colors hover:text-primary break-all"
            >
              {EMAIL}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.contact.emailNote}
            </p>
          </div>

          <div className="border-t border-foreground/20 pt-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{t.contact.wa}</span>
            <p className="mt-4 font-serif text-2xl leading-snug">
              {t.contact.waLine}
            </p>
            <a
              href={waLink(t.quote.msgTitle)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              {t.contact.waBtn}
              <span aria-hidden>→</span>
            </a>
          </div>

          <div className="border-t border-foreground/20 pt-6">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Instagram</span>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block font-serif text-2xl leading-snug transition-colors hover:text-primary break-all"
            >
              {INSTAGRAM_HANDLE}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-foreground/30 px-5 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Follow
            </a>
          </div>
        </div>


        <div className="mt-16 border-t border-foreground/15 pt-8 md:mt-20">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">{t.contact.area}</span>
          <p className="mt-4 max-w-xl font-serif text-xl leading-snug md:text-2xl">
            {t.contact.areaLine}
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-10">
        <p className="font-serif text-lg">
          Amanda <span className="italic text-primary">&amp;</span> Co.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          {INSTAGRAM_HANDLE}
        </a>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} — {t.footer.line}
          {" · "}
          <a href="/auth" className="opacity-40 transition-opacity hover:opacity-100">
            Staff
          </a>
        </p>
      </div>
    </footer>
  );
}
