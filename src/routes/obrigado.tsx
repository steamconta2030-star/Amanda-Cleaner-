import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const PHONE_E164 = "18133649757";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Thank you — Amanda & Co." },
      { name: "description", content: "Thanks for reaching out. We're opening WhatsApp to complete your booking." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ObrigadoPage,
});

function ObrigadoPage() {
  const [waUrl, setWaUrl] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("msg") ?? "Hi Amanda!";
    const url = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(msg)}`;
    setWaUrl(url);
    // Small delay so the pageview registers (Google Ads / Analytics conversion)
    const t = setTimeout(() => {
      window.location.href = url;
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold text-foreground">Thank you!</h1>
        <p className="mt-3 text-muted-foreground">
          We're opening WhatsApp so you can finish your booking with Amanda.
        </p>
        {waUrl && (
          <a
            href={waUrl}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open WhatsApp
          </a>
        )}
        <p className="mt-4 text-xs text-muted-foreground">
          If nothing happens, tap the button above.
        </p>
      </div>
    </main>
  );
}
