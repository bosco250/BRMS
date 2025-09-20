import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
  });

  // Password strength checker
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength({ score: 0, feedback: "" });
      return;
    }

    let score = 0;
    let feedback = "";

    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) feedback = "Weak";
    else if (score <= 3) feedback = "Fair";
    else if (score <= 4) feedback = "Good";
    else feedback = "Strong";

    setPasswordStrength({ score, feedback });
  }, [password]);

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid:
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers,
      errors: [
        password.length < minLength && "At least 8 characters",
        !hasUpperCase && "One uppercase letter",
        !hasLowerCase && "One lowercase letter",
        !hasNumbers && "One number",
      ].filter(Boolean),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !token) {
      toast.error("Invalid reset link. Please try again.");
      navigate("/forgot");
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      toast.error("Password does not meet requirements.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call - in real app, this would reset the password
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Password reset successfully! You can now sign in.");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStrengthColor = (score: number) => {
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-yellow-500";
    if (score <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthTextColor = (score: number) => {
    if (score <= 2) return "text-red-600";
    if (score <= 3) return "text-yellow-600";
    if (score <= 4) return "text-blue-600";
    return "text-green-600";
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/forgot"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-brand transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to forgot password</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Set New Password
            </h1>
            <p className="text-gray-600 mb-6">
              Create a strong password for your account
            </p>
            {email && (
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">Resetting for:</span>
                <span className="text-sm font-medium text-gray-900">
                  {email}
                </span>
              </div>
            )}
          </div>

          {/* Reset Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all bg-white text-gray-900"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full ${
                          level <= passwordStrength.score
                            ? getStrengthColor(passwordStrength.score)
                            : "bg-gray-200"
                        } transition-all duration-300`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-sm font-medium ${getStrengthTextColor(
                      passwordStrength.score
                    )}`}
                  >
                    Password strength: {passwordStrength.feedback}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all bg-white text-gray-900"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="mt-2 flex items-center gap-2">
                  {password === confirmPassword ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">
                        Passwords match
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-red-300" />
                      <span className="text-sm text-red-600">
                        Passwords do not match
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                !password ||
                !confirmPassword ||
                password !== confirmPassword
              }
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Resetting Password...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Password Requirements */}
          <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Password Requirements:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                At least 8 characters long
              </li>
              <li className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    /[A-Z]/.test(password) ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                One uppercase letter (A-Z)
              </li>
              <li className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    /[a-z]/.test(password) ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                One lowercase letter (a-z)
              </li>
              <li className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    /\d/.test(password) ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
                One number (0-9)
              </li>
            </ul>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Security Note</p>
                <p>
                  Your new password will be encrypted and stored securely. Make
                  sure to use a unique password that you haven't used elsewhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
