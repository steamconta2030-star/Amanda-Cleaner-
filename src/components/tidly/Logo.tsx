export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-0.5 font-semibold tracking-tight ${className}`}
    >
      <span>tidly</span>
      <span className="h-1.5 w-1.5 translate-y-[-0.15em] rounded-full bg-primary" aria-hidden />
    </span>
  );
}
