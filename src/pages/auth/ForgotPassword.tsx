import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <section className="py-16 sm:py-20 bg-surface-secondary">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-text-primary text-center">
          Reset password
        </h1>
        <p className="mt-2 text-center text-text-secondary">
          Enter your email to receive a reset link.
        </p>

        <form className="mt-8 rounded-2xl bg-surface-card p-6 ring-1 ring-border-secondary shadow-md">
          <div className="grid gap-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ring-border-subtle focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-text-inverted hover:bg-brand-hover shadow-sm"
            >
              Send reset link
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-text-secondary border-t border-border-subtle pt-4">
            Remembered your password?{" "}
            <Link to="/login" className="text-brand hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
