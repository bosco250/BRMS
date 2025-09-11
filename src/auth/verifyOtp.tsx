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
        err?.response?.data?.message || "Failed to resend OTP. Try again later.";
      toast.error(message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-surface-secondary px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-2 text-center">Verify your email</h2>
        <p className="text-center text-text-secondary mb-6">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex gap-3 justify-center mb-6">
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
                className="w-12 h-12 text-center text-lg font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
              />
            ))}
          </div>

          <button
            type="submit"
            className="rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-hover transition"
          >
            Verify OTP
          </button>
        </form>

        {/* 🔥 RESEND OTP BUTTON */}
        <div className="mt-4 text-center">
          <button
            onClick={handleResend}
            disabled={isSending}
            className="text-sm text-brand hover:underline disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </section>
  );
}
