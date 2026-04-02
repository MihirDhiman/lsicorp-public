import { useState } from "react";
import { authService } from "../../../api/api";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!email) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);
      await authService.forgotPassword(email);
      toast.success("Reset link sent to your email 📧");
      setEmail("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-black text-white p-3 rounded-full">
              <Mail size={20} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Input */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mt-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-900"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Remember your password?{" "}
      <span
            onClick={() => navigate("/login")}
            className="text-black cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}