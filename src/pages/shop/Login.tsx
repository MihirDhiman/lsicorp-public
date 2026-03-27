import { useState } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Logo from "../../pages/shop/Image/logo.png";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  setTimeout(() => {
    if (email === "s.admin@yopmail.com" && password === "123456") {
      // ✅ Save login state
      localStorage.setItem("isLoggedIn", "true");

      // ✅ redirect
      navigate("/shop");
    } else {
      alert("Invalid credentials");
    }

    setLoading(false);
  }, 800);
};

  return (
    <div className="relative  bg-gray-100 overflow-hidden font-sans">
  {/* 🌈 Shared Background Glow */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute w-72 h-72 md:w-[600px] md:h-[600px] bg-red-100/50 blur-[120px] -top-24 -left-24 rounded-full" />
    <div className="absolute w-72 h-72 md:w-[600px] md:h-[600px] bg-blue-100/50 blur-[120px] -bottom-24 -right-24 rounded-full" />
  </div>

  {/* 🔙 Back Button */}
  <div className="absolute left-6 top-6 z-20">
    <button
      type="button"
      onClick={() => navigate("/shop")}
      className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-black active:scale-95"
    >
      <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
      Back to Shop
    </button>
  </div>

  <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col lg:flex-row">
    
    {/* 🧾 LEFT SIDE (Login Form) */}
    <div className="flex w-full flex-col justify-center px-6 py-20 lg:w-1/2 lg:px-12 xl:px-24">
      <div className="mx-auto w-full max-w-[400px]">
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Welcome back
          </h2>
          <p className="mt-3 text-gray-500">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
            <input
              type="email"
              value={email}
  onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3.5 pl-12 pr-4 text-sm outline-none transition-all focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
  onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3.5 pl-12 pr-12 text-sm outline-none transition-all focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-black" />
              <span className="group-hover:text-black transition-colors">Remember me</span>
            </label>
            <button type="button" className="font-semibold text-gray-900 hover:underline underline-offset-4">
              Forgot password?
            </button>
          </div>

          <button
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Sign In"}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-grow bg-gray-100"></div>
          <span className="text-xs font-medium uppercase tracking-widest text-gray-400">or</span>
          <div className="h-px flex-grow bg-gray-100"></div>
        </div>

        <p className="text-center text-sm text-gray-500">
          New to LSI?{" "}
         <button
  onClick={() => navigate("/register")}
  className="font-bold text-gray-900 hover:underline underline-offset-4"
>
  Create an account
</button>
        </p>
      </div>
    </div>

    {/* 🎨 RIGHT SIDE (Marketing) */}
   <div className="hidden lg:flex w-1/2 flex-col justify-center border-l border-red-800 bg-red-700 px-12 xl:px-24 relative overflow-hidden mr-0">
  
  {/* 🎨 Subtle Background Pattern (Optional: adds depth to the solid red) */}
  <div className="absolute inset-0 opacity-10 pointer-events-none">
    <div className="absolute top-0 right-0 w-64 h-64 bg-white blur-[120px] rounded-full -mr-32 -mt-32" />
  </div>

  <div className="max-w-lg z-10">
    {/* Brand Logo */}
    <div className="mb-12 flex items-center gap-4">
      {/* Logo container stays white/light to let the logo pop */}
      <div className="h-12 w-12 overflow-hidden rounded-xl bg-white flex items-center justify-center shadow-2xl">
        <img 
          src={Logo} 
          alt="LSI Logo" 
          className="h-full w-full object-contain p-2" 
        />
      </div>

      {/* BRAND TEXT - Flipped to White */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
          LSI Industries
        </h1>
        <p className="text-[10px] font-bold tracking-[0.2em] text-red-200 uppercase">
          Smart Lighting
        </p>
      </div>
    </div>

    {/* Content - High Contrast White and Soft Red/Gray */}
    <h2 className="text-5xl font-extrabold leading-[1.1] text-white xl:text-6xl">
      Intelligent <span className="text-red-100 italic">Lighting</span>
      <br />
      Meets Modern <span className="text-red-300/60">Design.</span>
    </h2>

    <p className="mt-8 text-lg leading-relaxed text-red-50">
      Transform your spaces with high-performance LED lighting and smart digital display solutions engineered for the future of infrastructure.
    </p>
    
    {/* Stats Section - Colors Adjusted for Red Background */}
    <div className="mt-10 flex gap-8">
      <div>
        <p className="text-2xl font-bold text-white">40+</p>
        <p className="text-xs font-medium uppercase tracking-wider text-red-200">Years Exp</p>
      </div>
      
      {/* Vertical Divider - Low opacity white instead of gray */}
      <div className="h-10 w-px bg-white/20"></div>
      
      <div>
        <p className="text-2xl font-bold text-white">100%</p>
        <p className="text-xs font-medium uppercase tracking-wider text-red-200">Quality</p>
      </div>
    </div>
  </div>
</div>
</div>
</div>
  );
}