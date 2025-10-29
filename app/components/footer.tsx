const Footer = () => {
  return (
  <footer className="border-t border-subtle bg-surface-solid backdrop-blur-sm transition-colors duration-300">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-10 text-sm text-muted transition-colors duration-300 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2 text-muted">
          <p className="text-base font-semibold text-[color:var(--foreground)]">Narra</p>
          <p className="max-w-sm leading-relaxed">A calm home for oral histories, mapped memories, and the voices that shape our communities.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-xs uppercase tracking-[0.14em] text-muted">Connect</span>
          <a href="mailto:team@narra.app" className="accent-link">team@narra.app</a>
          <a href="https://supabase.com" target="_blank" rel="noreferrer" className="accent-link">Powered by Supabase</a>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-xs uppercase tracking-[0.14em] text-muted">Explore</span>
          <a href="/interviews" className="accent-link">Archive</a>
          <a href="/map" className="accent-link">Story map</a>
        </div>
      </div>
      <div className="border-t border-subtle bg-transparent py-4 text-center text-xs text-muted">© {new Date().getFullYear()} Narra. Preserving oral histories together.</div>
    </footer>
  );
};

export default Footer;
