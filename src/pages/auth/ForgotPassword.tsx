import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - in real app, this would send OTP to email
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to OTP verification with email parameter
      navigate(`/verify-forgot-otp?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setError("Failed to send reset code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="py-16 sm:py-20 bg-surface-secondary">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-text-primary text-center">
          Reset password
        </h1>
        <p className="mt-2 text-center text-text-secondary">
          Enter your email to receive a verification code.
        </p>

        <div className="mt-8 rounded-2xl bg-surface-card p-6 ring-1 ring-border-secondary shadow-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full rounded-md bg-surface-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted ring-1 ${
                  error
                    ? "ring-red-300 focus:ring-red-500"
                    : "ring-border-subtle focus:ring-brand/30"
                } focus:outline-none focus:ring-2`}
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-brand px-4 py-2 text-sm font-semibold text-text-inverted hover:bg-brand-hover shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Code...
                </span>
              ) : (
                "Send Verification Code"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-text-secondary border-t border-border-subtle pt-4">
          Remembered your password?{" "}
          <Link to="/login" className="text-brand hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
