import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "pt";

export const FAQ_ITEMS_EN = [
  { q: "How do I get an exact price?", a: "Send a quick message on WhatsApp with your address, number of bedrooms and bathrooms and the type of cleaning. Amanda replies personally with a quote." },
  { q: "Are the cleaning products safe for pets and children?", a: "Yes. We use gentle, effective products that smell nice and are safe for family and pets. If you have specific preferences, let Amanda know on WhatsApp." },
];

export const FAQ_ITEMS_PT = [
  { q: "Como consigo um preço exato?", a: "Envie uma mensagem rápida pelo WhatsApp com endereço, quantidade de quartos e banheiros e o tipo de limpeza. A Amanda responde pessoalmente com o orçamento." },
  { q: "Os produtos são seguros para pets e crianças?", a: "Sim. Usamos produtos suaves, eficazes, com aroma agradável e seguros pra família e pets. Se você tem preferência específica, é só falar com a Amanda pelo WhatsApp." },
];

export const dict = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      pricing: "Pricing",
      gallery: "Gallery",
      quote: "Get a quote",
      contact: "Contact",
    },
    hero: {
      tag: "Brazilian-owned boutique cleaning · Tampa, FL",
      title1: "The care your home",
      title2: "deserves.",
      sub: "A Brazilian standard of care, brought home to Florida — cleaned slowly, with method, and treated like my own.",
      book: "Book on WhatsApp",
      see: "See services",
      provenanceLabel: "Provenance",
      provenance: "Tampa, Florida",
    },
    about: {
      tag: "Meet Amanda",
      title1: "Brazilian care, right here in",
      title2: "Tampa",
      title3: ".",
      p1: "I'm Amanda — Brazilian, and the person behind every cleaning. From the first message on WhatsApp to the moment you walk back into a quiet, fresh home, it's just me taking care of your space.",
      p2: "I grew up with a simple idea: a home is cared for like family. In Brazil we call it capricho — doing things slowly, with method and honest care. It's the standard I bring to every home I work with in Florida.",
      p3: "Working closely with a small handful of families means I know your space, your preferences and your routines. No rotating crews, no strangers — just one trusted person who treats your home like her own.",
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
        { name: "Residential Cleaning", desc: "Regular weekly or bi-weekly cleanings to keep your home effortlessly fresh and cared for." },
        { name: "Deep Cleaning", desc: "A detailed, top-to-bottom clean — inside the oven, fridge and every corner routine doesn't reach." },
        { name: "Move In / Move Out", desc: "Turnover cleaning for empty homes, ready for the next chapter — yours or your buyer's." },
        { name: "Post-Construction", desc: "Dust, debris and film removed after renovation or new construction, safely and thoroughly." },
        { name: "Commercial Cleaning", desc: "Offices, studios and small businesses in the Tampa area — kept spotless on your schedule." },
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
        { name: "Regular Cleaning", price: "$150", desc: "2 bedrooms · 2 bathrooms · standard residential cleaning." },
        { name: "Deep Cleaning", price: "$300", desc: "2 bedrooms · 2 bathrooms · includes inside oven and refrigerator." },
        { name: "Move In / Move Out", price: "$250", desc: "2 bedrooms · 2 bathrooms · includes inside oven and refrigerator." },
      ],
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
      areaLine: "Based in Tampa, FL — serving Westchase, Carrollwood, Citrus Park, Town 'N' Country, Odessa, Lutz, Brandon and surrounding areas. Not happy with something? I come back within 48 hours to make it right.",
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
        "Pantry · Deep Clean",
        "Cooktop · Deep Clean",
        "Kitchen Sink · Deep Clean",
        "Master Bedroom · Residential",
        "Kids Bedroom · Residential",
      ],
      open: "Open",
      close: "Close lightbox",
      prev: "Previous image",
      next: "Next image",
      of: "of",
      dialogHint: "Use left and right arrow keys to navigate. Press Escape to close.",
    },
    faq: {
      tag: "FAQ",
      title1: "Good to",
      title2: "know",
      title3: ".",
      items: FAQ_ITEMS_EN,
    },
    stickyCta: { quote: "Quote", wa: "WhatsApp" },
    footer: { line: "Personalized home cleaning · Florida" },
    lang: { switchTo: "PT", label: "Português" },
    common: {
      exploreServices: "Explore services",
      seeAllServices: "See all services",
      seeAllQuestions: "See all questions",
      readMore: "Read more",
    },
  },
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      services: "Serviços",
      pricing: "Preços",
      gallery: "Galeria",
      quote: "Pedir orçamento",
      contact: "Contato",
    },
    hero: {
      tag: "Limpeza boutique feita por brasileira · Tampa, FL",
      title1: "O cuidado que a sua casa",
      title2: "merece.",
      sub: "O capricho brasileiro trazido pra sua casa na Flórida — com calma, método e o carinho de quem trata a sua casa como a própria.",
      book: "Agendar pelo WhatsApp",
      see: "Ver serviços",
      provenanceLabel: "Origem",
      provenance: "Tampa, Flórida",
    },
    about: {
      tag: "Conheça a Amanda",
      title1: "Cuidado brasileiro, aqui em",
      title2: "Tampa",
      title3: ".",
      p1: "Sou a Amanda — brasileira, e a pessoa por trás de cada limpeza. Da primeira mensagem no WhatsApp até o momento em que você volta pra uma casa fresca e tranquila, sou eu cuidando do seu espaço.",
      p2: "Cresci com uma ideia simples: casa é cuidada como família. No Brasil a gente chama isso de capricho — fazer as coisas com calma, com método e com carinho honesto. É esse padrão que eu trago pra cada casa aqui na Flórida.",
      p3: "Trabalhar de perto com um pequeno grupo de famílias significa que eu conheço o seu espaço, as suas preferências e a sua rotina. Sem equipe rotativa, sem estranhos — só uma pessoa de confiança que cuida da sua casa como se fosse a dela.",
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
        { name: "Limpeza Residencial", desc: "Limpezas regulares, semanais ou quinzenais, para manter a sua casa fresca e cuidada sem esforço." },
        { name: "Limpeza Profunda", desc: "Limpeza detalhada de cima a baixo — dentro do forno, geladeira e cada canto que a rotina não alcança." },
        { name: "Move In / Move Out", desc: "Limpeza de mudança para casas vazias — prontas pro próximo capítulo, seu ou de quem chega." },
        { name: "Pós-obra", desc: "Pó, entulho e resíduos removidos com segurança e minúcia depois de reforma ou construção nova." },
        { name: "Limpeza Comercial", desc: "Escritórios, estúdios e pequenos negócios na região de Tampa — impecáveis no seu horário." },
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
        { name: "Limpeza Regular", price: "$150", desc: "2 quartos · 2 banheiros · limpeza residencial padrão." },
        { name: "Limpeza Profunda", price: "$300", desc: "2 quartos · 2 banheiros · inclui parte interna do forno e da geladeira." },
        { name: "Move In / Move Out", price: "$250", desc: "2 quartos · 2 banheiros · inclui parte interna do forno e da geladeira." },
      ],
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
      areaLine: "Baseada em Tampa, FL — atendendo Westchase, Carrollwood, Citrus Park, Town 'N' Country, Odessa, Lutz, Brandon e regiões próximas. Não gostou de algo? Eu volto em até 48h pra ajustar.",
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
        "Despensa · Limpeza Profunda",
        "Cooktop · Limpeza Profunda",
        "Pia da Cozinha · Limpeza Profunda",
        "Quarto Principal · Residencial",
        "Quarto Infantil · Residencial",
      ],
      open: "Abrir",
      close: "Fechar visualização",
      prev: "Imagem anterior",
      next: "Próxima imagem",
      of: "de",
      dialogHint: "Use as setas esquerda e direita para navegar. Pressione Esc para fechar.",
    },
    faq: {
      tag: "Perguntas frequentes",
      title1: "Bom",
      title2: "saber",
      title3: ".",
      items: FAQ_ITEMS_PT,
    },
    stickyCta: { quote: "Orçamento", wa: "WhatsApp" },
    footer: { line: "Limpeza residencial personalizada · Flórida" },
    lang: { switchTo: "EN", label: "English" },
  },
};

export type Dict = typeof dict.en;

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: dict.en,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.removeItem("lang");
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

export const useT = () => useContext(LangContext);

export function LangToggle({ className = "" }: { className?: string }) {
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
