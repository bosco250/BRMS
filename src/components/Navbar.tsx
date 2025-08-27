import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-surface-primary/90 backdrop-blur border-b border-border-secondary shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-text-primary text-lg"
        >
          <span className="inline-block h-8 w-8 rounded bg-brand" />
          <span>BRMS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-base font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-brand"
                : "text-text-secondary hover:text-text-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/bars"
            className={({ isActive }) =>
              isActive
                ? "text-brand"
                : "text-text-secondary hover:text-text-primary"
            }
          >
            Bars
          </NavLink>
          <NavLink
            to="/resto"
            className={({ isActive }) =>
              isActive
                ? "text-brand"
                : "text-text-secondary hover:text-text-primary"
            }
          >
            Resto
          </NavLink>
          <a
            href="#features"
            className="text-text-secondary hover:text-text-primary"
          >
            Features
          </a>
          <a
            href="#subscriptions"
            className="text-text-secondary hover:text-text-primary"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-text-secondary hover:text-text-primary"
          >
            FAQ
          </a>
          <a
            href="#contact"
            className="text-text-secondary hover:text-text-primary"
          >
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-3 text-base font-semibold">
          <Link
            to="/login"
            className="text-text-secondary hover:text-text-primary"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-brand px-4 py-2 font-semibold text-text-inverted hover:bg-brand-hover shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
