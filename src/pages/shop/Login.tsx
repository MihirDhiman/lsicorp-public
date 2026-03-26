import { useState } from "react";
import { User, Lock, Eye, EyeOff, ArrowRight, ShoppingCart } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement login logic here
    console.log("Login attempt:", { email, password, rememberMe });
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // TODO: Handle login success/error
    }, 1000);
  };

  return (
  <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row relative">

  {/* BACK BUTTON */}
  <div className="absolute top-4 left-4 z-10">
    <button className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm font-medium px-3 py-2">
      ← Back to Shop
    </button>
  </div>

  {/* RIGHT SIDE */}
  <div className="w-full lg:w-1/2 bg-gray-100 flex items-center justify-center px-6 sm:px-8 py-10 sm:py-16">

    <div className="w-full max-w-md">

      {/* HEADER */}
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
          Welcome
        </h3>
        <p className="text-gray-600 text-sm">
          Sign in to your account
        </p>
      </div>

      {/* FORM */}
      <form className="space-y-4 sm:space-y-6">

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 sm:py-4 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-red-500"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 sm:py-4 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-red-500"
        />

        {/* OPTIONS */}
        <div className="flex justify-between text-xs sm:text-sm">
          <div></div>

          <button className="text-red-600">
            Forgot Password?
          </button>
        </div>

        {/* BUTTON */}
        <button className="w-full bg-red-600 text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold">
          login In
        </button>
      </form>
      
      <div className="flex items-center my-6 sm:my-8">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-4 text-xs sm:text-sm text-gray-500">
          New here?
        </span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* SIGNUP */}
      <p className="text-center text-xs sm:text-sm mt-6">
        Don’t have an account?{" "}
        <span className="text-red-600 font-semibold cursor-pointer">
          Sign up
        </span>
      </p>
    </div>
  </div>

   {/* LEFT SIDE */}
  <div className="w-full lg:w-1/2 px-6 sm:px-10 lg:px-16 py-6 sm:py-8 flex flex-col justify-between bg-white">

    {/* TOP NAV */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="LSI Corp" className="w-8 h-8 sm:w-10 sm:h-10" />
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
          LSI Industries
        </h1>
      </div>

      <div className="text-[10px] sm:text-xs text-gray-500 tracking-wide text-left sm:text-right">
        COMMERCIAL LIGHTING & DISPLAY SOLUTIONS
      </div>
    </div>

    {/* HERO CONTENT */}
    <div className="max-w-xl mt-6 lg:mt-0">
      <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4 sm:mb-6">
        Smart <span className="text-red-600">Lighting</span>
        <br />
        & Digital <span className="text-red-600">Display</span>
      </h2>

      <p className="text-gray-600 text-sm sm:text-lg mb-6 sm:mb-8">
        High-performance LED lighting and digital signage solutions for modern infrastructure.
      </p>

      {/* FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4">
          <h3 className="text-gray-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
            Energy Efficient
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm">
            Up to 70% energy savings
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4">
          <h3 className="text-gray-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
            Smart Controls
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm">
            Automation & remote management
          </p>
        </div>
      </div>
    </div>

    {/* FOOTER */}
    <div className="text-center text-gray-500 text-xs sm:text-sm mt-6">
      © 2024 LSI Industries
    </div>
  </div>
</div>
  );
}