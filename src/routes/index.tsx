import { createFileRoute } from "@tanstack/react-router";
import heroImage from "../assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20limpeza.";

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Concept />
      <Services />
      <Process />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <a href="#top" className="font-serif text-xl tracking-tight">
          Casa <span className="italic text-primary">&amp;</span> Cuidado
        </a>
        <nav className="hidden items-center gap-10 text-sm text-muted-foreground md:flex">
          <a href="#top" className="hover:text-foreground transition-colors">Início</a>
          <a href="#servicos" className="hover:text-foreground transition-colors">Serviços</a>
          <a href="#processo" className="hover:text-foreground transition-colors">Como funciona</a>
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-foreground/20 px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
        >
          Contactar
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pt-32 pb-20 md:grid-cols-2 md:gap-16 md:px-10 md:pt-40 md:pb-32">
        <div className="flex flex-col justify-center">
          <span className="mb-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Serviços de limpeza · Boutique
          </span>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
            O cuidado que a sua casa <em className="italic text-primary">merece.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Serviços de limpeza personalizados com o capricho e a confiança que procura.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              Agendar pelo WhatsApp
              <span aria-hidden>→</span>
            </a>
            <a href="#servicos" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
              Ver serviços
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={heroImage}
              alt="Interior calmo e luminoso"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden max-w-[16rem] rounded-sm bg-background p-5 shadow-sm ring-1 ring-border md:block">
            <p className="font-serif text-lg italic leading-snug">
              "Sinto a casa a respirar quando ela sai."
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">— Cliente há 2 anos</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Concept() {
  const items = [
    {
      title: "Atenção aos detalhes",
      desc: "Cada canto, cada superfície. O trabalho é feito devagar, com método e olho crítico.",
    },
    {
      title: "Produtos cuidadosamente escolhidos",
      desc: "Fórmulas suaves, eficazes e com bom aroma. Respeito pela sua casa, pela sua família e pelos animais.",
    },
    {
      title: "Confiança total",
      desc: "Uma única pessoa a cuidar da sua casa. Sem rotatividade, sem estranhos — apenas alguém em quem pode confiar.",
    },
  ];
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">A minha abordagem</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            Não é apenas limpar. É <em className="italic text-primary">cuidar</em>.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
          {items.map((item, i) => (
            <div key={item.title} className="border-t border-foreground/20 pt-6">
              <span className="font-serif text-sm italic text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-serif text-2xl leading-snug">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      name: "Manutenção Residencial",
      desc: "Limpezas regulares — semanais ou quinzenais — para manter a sua casa impecável ao longo do tempo.",
    },
    {
      name: "Limpeza Profunda",
      desc: "Uma limpeza detalhada que chega onde a rotina não alcança. Ideal para mudanças, pós-obras ou reset sazonal.",
    },
    {
      name: "Organização de Espaços",
      desc: "Roupeiros, despensas, gavetas. Um sistema simples e bonito, pensado para durar.",
    },
  ];
  return (
    <section id="servicos">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Serviços</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
              Escolha o que a sua casa precisa.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Cada serviço é adaptado a si. Combinamos os detalhes por mensagem antes da primeira visita.
          </p>
        </div>
        <ul className="divide-y divide-border border-t border-b border-border">
          {services.map((s, i) => (
            <li key={s.name} className="group grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <div className="text-xs uppercase tracking-widest text-muted-foreground md:col-span-1">
                0{i + 1}
              </div>
              <h3 className="font-serif text-2xl md:col-span-4 md:text-3xl">{s.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6">{s.desc}</p>
              <div className="md:col-span-1 md:text-right">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground underline underline-offset-4 opacity-70 transition-opacity hover:opacity-100"
                >
                  Pedir
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "1", title: "Escolha o dia", desc: "Envie uma mensagem com a data que lhe convém." },
    { n: "2", title: "Combinamos os detalhes", desc: "Espaço, prioridades e preferências — tudo à sua medida." },
    { n: "3", title: "Relaxe", desc: "Enquanto cuidamos de tudo, com discrição e capricho." },
  ];
  return (
    <section id="processo" className="border-t border-border bg-accent/30">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-32">
        <div className="mb-16 max-w-xl">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Como funciona</span>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            Simples, do início ao fim.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="font-serif text-6xl italic text-primary/70 md:text-7xl">{s.n}</div>
              <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col items-start gap-6 border-t border-foreground/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-2xl italic md:text-3xl">
            Pronta para receber a sua casa como nova?
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Agendar pelo WhatsApp
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:px-10">
        <p className="font-serif text-lg">
          Casa <span className="italic text-primary">&amp;</span> Cuidado
        </p>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} — Serviços de limpeza personalizados
        </p>
      </div>
    </footer>
  );
}
