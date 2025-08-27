import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-16 sm:py-20 bg-brand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-brand px-6 py-12 ring-1 ring-brand/30 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-inverted">
            Ready to streamline your operations?
          </h2>
          <p className="mt-3 text-text-inverted/80">
            Start your free trial and explore BRMS today.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/register"
              className="rounded-md bg-text-inverted text-brand px-5 py-3 font-semibold hover:opacity-90"
            >
              Start free trial
            </Link>
            <a
              href="#subscriptions"
              className="rounded-md bg-brand/10 text-text-inverted ring-1 ring-inset ring-text-inverted/20 px-5 py-3 font-semibold hover:bg-text-inverted/10"
            >
              See pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
