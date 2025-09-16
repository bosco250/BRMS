import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-16 sm:py-20 bg-brand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-brand px-6 py-12 ring-1 ring-brand/30 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-inverted">
            Hungry now or growing a team? We’ve got you.
          </h2>
          <p className="mt-3 text-text-inverted/80">
            Customers can order in minutes. Teams can start a free trial.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/businesses"
              aria-label="Browse restaurants and order now"
              className="rounded-md bg-text-inverted text-brand px-5 py-3 font-semibold hover:opacity-90 w-full sm:w-auto"
            >
              🍽️ Order Now
            </Link>
            <Link
              to="/register"
              aria-label="Start your free trial for restaurant teams"
              className="rounded-md bg-brand/10 text-text-inverted ring-1 ring-inset ring-text-inverted/20 px-5 py-3 font-semibold hover:bg-text-inverted/10 w-full sm:w-auto"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
