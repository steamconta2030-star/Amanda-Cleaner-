import { Link } from "@tanstack/react-router";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-serif text-2xl italic text-foreground">Amaneat</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Faxina com carinho. Uma rede de profissionais — uma plataforma honesta.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Produto</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/services" className="hover:underline">Serviços</Link></li>
            <li><Link to="/pricing" className="hover:underline">Preços</Link></li>
            <li><Link to="/cleaners" className="hover:underline">Nossas faxineiras</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Empresa</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">Sobre</Link></li>
            <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            <li><Link to="/contact" className="hover:underline">Contato</Link></li>
            <li><Link to="/become-a-cleaner" className="hover:underline">Trabalhe com a gente</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:underline">Privacidade</Link></li>
            <li><Link to="/terms" className="hover:underline">Termos</Link></li>
            <li><Link to="/faq" className="hover:underline">Dúvidas</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-muted-foreground md:px-8">
          <p>© {year} Amaneat. Todos os direitos reservados.</p>
          <p>Feito com carinho em Ipatinga, MG</p>
        </div>
      </div>
    </footer>
  );
}
