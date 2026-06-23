const Footer = () => {
  return (
    <footer className="w-full py-12 md:py-16 bg-background border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-6 md:gap-8">
        <div className="font-display text-lg font-semibold tracking-tight text-on-surface">
          Berkay Seckin
        </div>
        <div className="text-on-surface-variant text-[12px] text-center">
          © 2026 Berkay Seckin · Prozessautomatisierung für Handwerksbetriebe, Wien
        </div>
        <div className="flex gap-8 md:gap-10">
          <a
            className="label-caps text-on-surface-variant hover:text-on-surface transition-colors"
            href="/datenschutz"
          >
            Datenschutzerklärung
          </a>
          <a
            className="label-caps text-on-surface-variant hover:text-on-surface transition-colors"
            href="/impressum"
          >
            Impressum
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;