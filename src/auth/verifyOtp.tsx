import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../src/Api/axios";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isSending, setIsSending] = useState(false);

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

    try {
      await api.post("/auth/verify-otp", {
        email,
        otp: code,
      });

      toast.success("OTP verified! You can now login.");
      navigate("/login");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Invalid OTP. Please try again.";
      toast.error(message);
    }
  };

  // 🔥 RESEND OTP HANDLER
  const handleResend = async () => {
    if (!email) {
      toast.error("Missing email.");
      return;
    }

    setIsSending(true);
    try {
      await api.post("/auth/send-otp", { email }); // <- call the same backend method
      toast.success("A new OTP has been sent to your email.");
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
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-brand text-2xl">📧</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600">
            Enter the 6-digit code sent to your email address
          </p>
          {email && (
            <p className="text-sm text-brand font-medium mt-2">{email}</p>
          )}
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors bg-white"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-brand text-white py-3 rounded-lg font-semibold hover:bg-brand-hover transition-colors shadow-sm hover:shadow-md"
          >
            Verify OTP
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={isSending}
            className="text-sm text-brand hover:text-brand-hover font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </span>
            ) : (
              "Resend OTP"
            )}
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 text-center">
            <strong>Tip:</strong> Check your spam folder if you don't see the
            email. The code expires in 10 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
