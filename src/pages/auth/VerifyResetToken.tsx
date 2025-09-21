import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Shield, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function VerifyResetToken() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !email) {
        setError("Invalid or missing reset link parameters.");
        setIsValid(false);
        setIsVerifying(false);
        return;
      }

      try {
        // Simulate API call to verify the token
        // In real app, this would verify the token with your backend
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate token validation (in real app, check with backend)
        const isValidToken = token.length > 10; // Simple validation for demo

        if (isValidToken) {
          setIsValid(true);
          toast.success("Reset link verified successfully!");

          // Redirect to reset password page after a short delay
          setTimeout(() => {
            navigate(
              `/reset-password?token=${encodeURIComponent(
                token
              )}&email=${encodeURIComponent(email)}`
            );
          }, 1500);
        } else {
          setIsValid(false);
          setError("Invalid or expired reset link. Please request a new one.");
        }
      } catch (error) {
        setIsValid(false);
        setError("Failed to verify reset link. Please try again.");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token, email, navigate]);

  if (isVerifying) {
    return (
      <section className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-surface-card rounded-2xl p-8 border border-border-secondary shadow-2xl text-center">
            <div className="w-20 h-20 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-brand animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-3">
              Verifying Reset Link
            </h1>
            <p className="text-text-secondary">
              Please wait while we verify your password reset link...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isValid === false) {
    return (
      <section className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-surface-card rounded-2xl p-8 border border-border-secondary shadow-2xl text-center">
            <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-3">
              Invalid Reset Link
            </h1>
            <p className="text-text-secondary mb-6">
              {error || "This reset link is invalid or has expired."}
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/forgot")}
                className="w-full bg-brand text-text-inverted py-3 rounded-xl font-semibold hover:bg-brand-hover transition-colors"
              >
                Request New Reset Link
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-surface-secondary text-text-primary py-3 rounded-xl font-semibold hover:bg-border-subtle transition-colors border border-border-primary"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // This should not be reached as we redirect on success, but just in case
  return (
    <section className="min-h-screen bg-surface-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface-card rounded-2xl p-8 border border-border-secondary shadow-2xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-3">
            Link Verified
          </h1>
          <p className="text-text-secondary">
            Redirecting you to the password reset page...
          </p>
        </div>
      </div>
    </section>
  );
}
