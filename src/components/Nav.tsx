import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(0);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem('pt-theme');
    const isDark = saved !== 'light';
    setDark(isDark);
    if (!isDark) document.documentElement.setAttribute('data-theme', 'light');

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const hero = document.getElementById('hero');
          const h = hero ? hero.offsetHeight : window.innerHeight;
          setScrolled(Math.min((window.scrollY || 0) / (h * 0.4), 1));
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'light' ? null : 'light';
    if (next) root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    sessionStorage.setItem('pt-theme', next || '');
    setDark(!next);
  }

  const blurVal = 8 + scrolled * 16;
  const opacityVal = 0.15 + scrolled * 0.55;
  const borderAlpha = scrolled * 0.12;

  return (
    <nav
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex justify-between items-center px-5 py-2.5 max-w-[44rem] w-[calc(100%-1.5rem)] rounded-[20px] overflow-hidden"
      style={{
        background: `rgba(255,255,255,${opacityVal})`,
        backdropFilter: `blur(${blurVal}px) saturate(1.165) contrast(1.12)`,
        WebkitBackdropFilter: `blur(${blurVal}px) saturate(1.165) contrast(1.12)`,
        borderColor: `rgba(255,255,255,${borderAlpha + 0.06})`,
        boxShadow: `0 8px 32px rgba(0,0,0,${borderAlpha * 0.8}), inset 0 1px 0 rgba(255,255,255,${borderAlpha * 2 + 0.15})`,
      }}
    >
      <a href="/" className="font-mono text-xs font-semibold text-ink/70 no-underline tracking-wide relative z-10 hover:opacity-100 transition-opacity">
        PATRICK204NQH
      </a>
      <div className="flex gap-7 items-center relative z-10">
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="text-ink-dim text-xs font-[450] no-underline relative transition-colors hover:text-ink nav-link"
          >
            {link.label}
          </a>
        ))}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-ink-dim hover:text-ink h-8 w-8"
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </Button>
      </div>
    </nav>
  );
}
