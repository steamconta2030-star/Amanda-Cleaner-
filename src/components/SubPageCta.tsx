import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type LinkAction = { label: string; to: string; external?: false };
type ExternalAction = { label: string; href: string; external: true };
type Action = LinkAction | ExternalAction;

type SubPageCtaProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primary: Action;
  secondary?: Action;
};

function ActionButton({ action, variant }: { action: Action; variant: "primary" | "outline" }) {
  const classes =
    variant === "primary"
      ? "inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
      : "inline-flex items-center rounded-full border border-border px-6 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-muted";

  if ("external" in action && action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {action.label}
      </a>
    );
  }
  return (
    <Link to={action.to} className={classes}>
      {action.label}
    </Link>
  );
}

export function SubPageCta({ eyebrow, title, description, primary, secondary }: SubPageCtaProps) {
  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-24">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
        <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">{title}</h2>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ActionButton action={primary} variant="primary" />
          {secondary ? <ActionButton action={secondary} variant="outline" /> : null}
        </div>
      </div>
    </section>
  );
}
