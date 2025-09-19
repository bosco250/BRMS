import { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, ArrowLeft, Clock, RefreshCw } from "lucide-react";
import api from "../../src/Api/axios";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
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
      toast.error("Please enter the 6-digit code.");
      return;
    }

    if (!email) {
      toast.error("Missing email.");
      return;
    }

    setIsVerifying(true);
    try {
      await api.post("/auth/verify-otp", {
        email,
        otp: code,
      });

      toast.success("Email verified successfully! You can now login.");
      navigate("/login");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Invalid OTP. Please try again.";
      toast.error(message);
      // Clear OTP on error
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Missing email.");
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
      await api.post("/auth/send-otp", { email });
      toast.success("A new verification code has been sent to your email.");

      // Reset timer and OTP
      setTimeLeft(600);
      setCanResend(false);
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        "Failed to resend OTP. Try again later.";
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-app-brand transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to registration</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-app-brand" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Verify Your Email
            </h1>
            <p className="text-gray-600 mb-4">
              Enter the 6-digit code sent to your email address
            </p>
            {email && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md">
                <Mail className="w-4 h-4 text-app-brand" />
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
                    className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-app-brand focus:border-app-brand transition-all bg-white text-gray-900"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying || otp.join("").length !== 6}
              className="w-full bg-app-brand text-white py-3 rounded-md font-medium hover:bg-app-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : (
                "Verify Email"
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
                  className="inline-flex items-center gap-2 text-app-brand hover:text-app-brand-dark font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Need help?</p>
                <ul className="space-y-1 text-gray-500">
                  <li>• Check your spam/junk folder</li>
                  <li>• Make sure you entered the correct email</li>
                  <li>• The code expires in 10 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
