import { CloudSun, Info } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface NavLinkItem {
  to: string;
  label: string;
  Icon: LucideIcon;
}

const links: NavLinkItem[] = [
  { to: '/', label: 'Погода', Icon: CloudSun },
  { to: '/about', label: 'О приложении', Icon: Info },
];

export function Layout() {
  return (
    <main className="min-h-screen bg-linear-to-b from-night-700 via-night-900 to-night-950 px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-2xl font-semibold tracking-tight">Погода</h1>
        <nav
          aria-label="Основная навигация"
          className="mt-5 flex gap-1 rounded-2xl bg-white/5 p-1 ring-1 ring-white/10"
        >
          {links.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sun-400 ${
                  isActive
                    ? 'bg-sun-400 font-semibold text-night-950 shadow-lg shadow-sun-400/20'
                    : 'text-mist-400 ring-1 ring-transparent hover:bg-white/5 hover:text-mist-100 hover:ring-white/10'
                }`
              }
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
