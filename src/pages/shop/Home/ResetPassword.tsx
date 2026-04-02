import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authService } from "../../../api/api";
import toast from "react-hot-toast";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!token) return toast.error("Invalid link ❌");

    if (!password) {
      return toast.error("Password is required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      await authService.resetPassword(token, password);
      toast.success("Password reset successful ✅");
      navigate("/login");
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
              <Lock size={20} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your new password below
          </p>
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="text-sm text-gray-600">New Password</label>
          <input
            type={show ? "text" : "password"}
            placeholder="Enter new password"
            className="w-full mt-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Show/Hide Icon */}
          <span
            onClick={() => setShow(!show)}
            className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleReset}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-900"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Back to{" "}
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