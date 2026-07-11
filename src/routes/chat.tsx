import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Nav } from "@/components/tidly/Nav";

const chatSearchSchema = z.object({
  audience: z.enum(["home", "rental", "move"]).optional(),
});

export const Route = createFileRoute("/chat")({
  validateSearch: chatSearchSchema,
  component: ChatPage,
  head: () => ({
    meta: [
      { title: "Chat with Tidly — Book your cleaning" },
      {
        name: "description",
        content: "Get a real cleaning quote and book in Tampa by chatting with Tidly.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function ChatPage() {
  const { audience } = Route.useSearch();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="mx-auto flex max-w-3xl flex-col px-5 py-10 md:px-8 md:py-16">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {audience === "rental"
              ? "Rental turnover"
              : audience === "move"
                ? "Move in / out"
                : audience === "home"
                  ? "My home"
                  : "New quote"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Chat with Tidly
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            The AI chat is coming online next. In the meantime, tell us about
            your place and we'll follow up personally.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
          <p className="text-sm text-muted-foreground">
            We're wiring up the conversational booking flow — cotação
            instantânea + agendamento por chat. It ships next.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Sign in to get notified
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm text-foreground hover:bg-secondary"
            >
              Back home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
