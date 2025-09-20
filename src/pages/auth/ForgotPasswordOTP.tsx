import { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, ArrowLeft, Clock, RefreshCw, Shield } from "lucide-react";

export default function ForgotPasswordOTP() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasted)) return;
    const newOtp = pasted.split("");
    setOtp(newOtp);
    inputRefs.current[5]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");
    if (code.length !== 6) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }

    if (!email) {
      toast.error("Missing email information.");
      return;
    }

    setIsVerifying(true);
    try {
      // Simulate API call - in real app, this would verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to reset password with email and token
      navigate(
        `/reset-password?email=${encodeURIComponent(email)}&token=${code}`
      );
    } catch (err: any) {
      toast.error("Invalid verification code. Please try again.");
      // Clear OTP on error
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Missing email information.");
      return;
    }

    if (!canResend) {
      toast.info(
        `Please wait ${formatTime(timeLeft)} before requesting a new code.`
      );
      return;
    }

    setIsSending(true);
    try {
      // Simulate API call - in real app, this would resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("A new verification code has been sent to your email.");

      // Reset timer and OTP
      setTimeLeft(300);
      setCanResend(false);
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      toast.error("Failed to resend code. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-brand to-brand-hover rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Verify Your Identity
            </h1>
            <p className="text-gray-600 mb-6">
              Enter the 6-digit verification code sent to your email address
            </p>
            {email && (
              <div className="inline-flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                <Mail className="w-5 h-5 text-brand" />
                <span className="text-sm font-medium text-gray-900">
                  {email}
                </span>
              </div>
            )}
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-900 text-center">
                Enter verification code
              </label>
              <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all bg-white text-gray-900 hover:border-gray-300"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying || otp.join("").length !== 6}
              className="w-full bg-gradient-to-r from-brand to-brand-hover text-white py-4 rounded-xl font-semibold hover:from-brand-hover hover:to-brand transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying Code...
                </span>
              ) : (
                "Verify & Continue"
              )}
            </button>
          </form>

          {/* Timer and Resend */}
          <div className="mt-6 space-y-4">
            {!canResend ? (
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  Code expires in {formatTime(timeLeft)}
                </span>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Didn't receive the code?
                </p>
                <button
                  onClick={handleResend}
                  disabled={isSending}
                  className="inline-flex items-center gap-2 text-brand hover:text-brand-hover font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isSending ? "animate-spin" : ""}`}
                  />
                  {isSending ? "Sending..." : "Resend Code"}
                </button>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-2">Need help?</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• Check your spam/junk folder</li>
                  <li>• Make sure you entered the correct email</li>
                  <li>• The code expires in 5 minutes</li>
                  <li>• Contact support if you continue having issues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
