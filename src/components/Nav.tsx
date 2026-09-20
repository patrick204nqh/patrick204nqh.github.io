const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
];

export default function Nav() {
  return (
    <nav
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex justify-between items-center px-5 py-2.5 max-w-[44rem] w-[calc(100%-1.5rem)] rounded-[20px] overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(12px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.2)',
        border: '1px solid rgba(10,46,74,0.08)',
      }}
    >
      <a href="/" className="font-mono text-xs font-semibold text-ink no-underline tracking-wide transition-opacity hover:opacity-70">
        PATRICK204NQH
      </a>
      <div className="flex gap-7 items-center">
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="text-ink-dim text-xs font-[450] no-underline relative transition-colors hover:text-ink nav-link"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}