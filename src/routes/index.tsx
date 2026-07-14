import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Nav } from "@/components/tidly/Nav";
import { Logo } from "@/components/tidly/Logo";

import { NewsletterForm } from "@/components/tidly/NewsletterForm";
import { listServices } from "@/lib/tidly.functions";

const SITE_URL = "https://amanda-cleaning.lovable.app";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Amaneat — Faxina em Ipatinga pelo chat" },
      {
        name: "description",
        content:
          "Faxina com IA em Ipatinga: casas, aluguéis e mudanças. Orçamento real e agendamento em 60 segundos, sem formulário.",
      },
      { property: "og:title", content: "Amaneat — Faxina em Ipatinga pelo chat" },
      {
        property: "og:description",
        content:
          "Casas, Airbnbs e mudanças em Ipatinga e Vale do Aço. Orçamento e agendamento em uma conversa.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HouseCleaningService",
          name: "Amaneat",
          url: SITE_URL,
          image: `${SITE_URL}/icon-512.png`,
          telephone: "+55-31-0000-0000",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ipatinga",
            addressRegion: "MG",
            addressCountry: "BR",
          },
          areaServed: [
            { "@type": "City", name: "Ipatinga" },
            { "@type": "AdministrativeArea", name: "Vale do Aço, MG" },
          ],
        }),
      },

      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Em quanto tempo consigo agendar uma faxina em Ipatinga?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A maioria dos orçamentos sai em uns 60 segundos pelo chat, e normalmente há horários abertos na mesma semana.",
              },
            },
            {
              "@type": "Question",
              name: "Vocês limpam Airbnb e aluguéis de temporada?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sim — turnover de Airbnb e temporada com checklist com fotos e sincronia de calendário.",
              },
            },
            {
              "@type": "Question",
              name: "Vocês fazem limpeza de mudança e pós-obra?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Sim, faxina pós-obra e limpeza de entrega das chaves em prazo curto.",
              },
            },
            {
              "@type": "Question",
              name: "Como o preço é calculado?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Você recebe um preço real e transparente com base no tamanho do imóvel, tipo de serviço e adicionais antes de confirmar.",
              },
            },
          ],
        }),
      },
    ],
  }),
});


const AUDIENCES = [
  {
    key: "home" as const,
    label: "Minha casa",
    tagline: "Semanal, quinzenal ou uma faxina pesada.",
    tag: "Famílias",
    emoji: "🏡",
  },
  {
    key: "rental" as const,
    label: "Meu aluguel",
    tagline: "Turnover de Airbnb com checklist e fotos.",
    tag: "Anfitriões",
    emoji: "🛎️",
  },
  {
    key: "move" as const,
    label: "Mudança / pós-obra",
    tagline: "Faxina pesada pra entrega ou pós-reforma.",
    tag: "Corretores",
    emoji: "📦",
  },
];


function Home() {
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: () => listServices(),
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <AudiencePicker />
      <HowItWorks />
      <ServicesGrid services={services} />
      
      <NewsletterSection />
      <Cta />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              <span className="text-muted-foreground">Atendendo Ipatinga e Vale do Aço</span>
            </div>
            <h1
              className="mt-6 text-balance font-semibold tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 0.95 }}
            >
              Agende sua faxina <span className="font-serif italic text-primary">conversando</span>.
              Sem formulário.
            </h1>
            <p className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-muted-foreground">
              Conte pra Amaneat como é sua casa — ou mande umas fotos. Você
              recebe preço real e horários em cerca de 60 segundos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/chat"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Começar orçamento
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-base text-foreground hover:bg-secondary"
              >
                Como funciona
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <span>Português · English · Español</span>
            </div>

          </div>

          <div className="md:col-span-5">
            <ChatMock />
          </div>
        </div>
      </div>
    </section>
  );
}


function ChatMock() {
  return (
    <div className="relative">
      <div className="rounded-[2rem] border border-border bg-card p-4 shadow-xl shadow-black/[0.04]">
        <div className="flex items-center gap-2 px-2 pb-3">
          <div className="h-2 w-2 rounded-full bg-primary/40" aria-hidden />
          <div className="h-2 w-2 rounded-full bg-muted-foreground/25" aria-hidden />
          <div className="h-2 w-2 rounded-full bg-muted-foreground/25" aria-hidden />
          <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">
            Chat Amaneat
          </span>
        </div>
        <div className="space-y-2.5 rounded-2xl bg-secondary/60 p-4">
          <Bubble side="left">Oi! O que a gente vai limpar?</Bubble>
          <Bubble side="right" tone="primary">
            3 quartos, 2 banheiros no Cariru. Quinzenal.
          </Bubble>
          <Bubble side="left">
            Beleza — <b>R$ 249</b> a cada 2 semanas, ~2h30.
            <br />
            Primeiro horário: <b>Ter 9h</b>. Confirma?
          </Bubble>
          <Bubble side="right" tone="primary">
            Sim 🙌
          </Bubble>
          <div className="flex items-center gap-2 rounded-full bg-background px-3 py-2">
            <input
              disabled
              placeholder="Fale com a Amaneat…"
              className="flex-1 bg-transparent text-sm text-muted-foreground outline-none"
            />
            <button
              type="button"
              disabled
              className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"
              aria-label="Enviar"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
      <div className="pointer-events-none absolute -right-6 -top-4 hidden rotate-6 rounded-2xl bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg md:block">
        ~60 segundos

      </div>
    </div>
  );
}

function Bubble({
  side,
  tone = "muted",
  children,
}: {
  side: "left" | "right";
  tone?: "muted" | "primary";
  children: React.ReactNode;
}) {
  const isRight = side === "right";
  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
          tone === "primary"
            ? "bg-primary text-primary-foreground"
            : "bg-background text-foreground"
        } ${isRight ? "rounded-br-md" : "rounded-bl-md"}`}
      >
        {children}
      </div>
    </div>
  );
}

function AudiencePicker() {
  return (
    <section id="audience" className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              O que a gente limpa?
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Escolha o seu caso — o preço se adapta.
            </h2>

          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <Link
              key={a.key}
              to="/chat"
              search={{ audience: a.key }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition hover:border-primary/40 hover:shadow-lg hover:shadow-black/[0.03] md:p-7"
            >
              <div className="mb-6 flex items-start justify-between">
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-2xl"
                  aria-hidden
                >
                  {a.emoji}
                </span>
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {a.tag}
                </span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{a.label}</h3>
              <p className="mt-2 max-w-[22ch] text-sm text-muted-foreground">
                {a.tagline}
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-primary">
                Abrir chat

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Converse ou mande fotos",
      body: "Diga endereço, quartos e frequência — ou mande fotos dos cômodos.",
    },
    {
      n: "02",
      title: "Preço na hora",
      body: "Estimativa real e horários abertos sem esperar retorno.",
    },
    {
      n: "03",
      title: "Confirme em 1 toque",
      body: "Entre com Google, confirme o horário e a gente chega pronto.",
    },
  ];
  return (
    <section id="how-it-works" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Como funciona
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
          Sessenta segundos pra fechar a faxina.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl italic text-primary">{s.n}</span>
                <div className="h-px flex-1 bg-border" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid({
  services,
}: {
  services: { slug: string; name: string; audience: string; description: string; base_price_cents: number }[];
}) {
  if (!services.length) return null;
  return (
    <section id="services" className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Serviços
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Preços base, antes dos detalhes.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            O orçamento real sai pelo chat, com base no tamanho do imóvel e na frequência.
          </p>

        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-card p-7 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-18px_color-mix(in_oklab,var(--primary)_28%,transparent)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute right-6 top-6 font-serif text-[11px] italic tracking-[0.2em] text-muted-foreground/60"
              >
                {String(i + 1).padStart(2, "0")}/{String(services.length).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {s.audience === "home"
                    ? "Casa"
                    : s.audience === "rental"
                      ? "Aluguel"
                      : "Mudança"}
                </p>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-normal leading-tight tracking-tight text-foreground">
                {s.name}
              </h3>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <div className="mt-auto pt-7">
                <div className="h-px w-8 bg-border transition-all duration-500 group-hover:w-16 group-hover:bg-primary" />
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-sm italic text-muted-foreground">
                    a partir de
                  </span>
                  <span className="font-serif text-xs italic text-primary">R$</span>
                  <span className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                    {(s.base_price_cents / 100).toFixed(0)}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-14 text-background md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/40 blur-3xl"
            aria-hidden
          />
          <p className="text-xs uppercase tracking-[0.2em] text-background/60">
            Quando quiser
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Sua próxima faxina está a uma conversa.
          </h2>
          <p className="mt-4 max-w-md text-background/70">
            Atendendo Ipatinga, Cariru, Bethânia, Centro e todo o Vale do Aço.
          </p>
          <div className="mt-8">
            <Link
              to="/chat"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground hover:bg-primary/90"
            >
              Começar orçamento

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:px-8">
        <div className="flex items-center gap-3">
          <Logo className="text-lg" />
          <span>· Ipatinga, MG</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="#how-it-works" className="hover:text-foreground">
            Como funciona
          </a>
          <a href="#services" className="hover:text-foreground">
            Serviços
          </a>
          <Link to="/chat" className="hover:text-foreground">
            Fazer orçamento
          </Link>
          <Link to="/auth" className="hover:text-foreground">
            Entrar
          </Link>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} Amaneat</p>
      </div>
    </footer>
  );
}

function NewsletterSection() {
  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        <NewsletterForm
          source="home"
          title="Dicas de limpeza pra Ipatinga"
          subtitle="Um e-mail curto por mês — guia de frequência, dicas pra anfitriões e horários abertos. Cancele quando quiser."
        />
      </div>

    </section>
  );
}
