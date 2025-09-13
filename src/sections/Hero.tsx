import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-brand/10 text-brand px-3 py-1 text-xs font-semibold ring-1 ring-brand/20">
              Multi-tenant SaaS for Bars & Restaurants
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight">
              Run your bar and restaurant on one powerful platform
            </h1>
            <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-xl">
              Inventory, orders, payments, CRM, and analytics—designed for
              managers, servers, and accountants. Secure, fast, and ready to
              scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/businesses"
                className="rounded-md bg-accent px-6 py-4 text-text-inverted font-semibold hover:bg-accent-hover active:bg-accent-active focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 text-lg"
              >
                🍽️ Order Food Now
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-brand px-5 py-3 text-text-inverted font-medium hover:bg-brand-hover active:bg-brand-active focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/20"
              >
                Start free trial
              </Link>
              <a
                href="#features"
                className="rounded-md px-5 py-3 font-medium text-brand ring-1 ring-inset ring-brand/30 hover:bg-brand/5"
              >
                See features
              </a>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4 text-sm text-gray-600 max-w-md">
              <div>
                <dt className="font-semibold text-gray-900">99.9% uptime</dt>
                <dd>reliable</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">Role-based</dt>
                <dd>RBAC & MFA</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">Multi-language</dt>
                <dd>EN/FR/RW</dd>
              </div>
            </dl>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-inset ring-brand/20">
              <img
                src="https://media.istockphoto.com/id/1094919124/photo/male-manager-and-female-chef-using-digital-tablet-in-kitchen.jpg?s=1024x1024&w=is&k=20&c=jSuzsBYNqFWpBBfFoJz9gSH2_U1JgBxoYh8WO4hG0jA="
                alt="Manager and chef using a tablet in a kitchen"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
