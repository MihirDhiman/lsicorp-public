import { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Home,
  Globe,
  ArrowLeft,
  Lock,
  Map,
  Users,
  Hash
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../../pages/shop/Image/logo.png";

export default function RegisterPage() {
  const navigate = useNavigate();

 const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  password: "",
});

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  try {
    const payload = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      password: form.password,
      phone: form.mobile,
    };

    console.log("Sending:", payload);

   const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.post("/auth/register", payload);

    

    // ✅ Success action
    alert("Registration successful!");
    navigate("/login");

  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);

    alert(
      error.response?.data?.message || "Registration failed"
    );
  }
};

  return (
    <div className="relative bg-gray-100 overflow-hidden font-sans">

      {/* 🌈 Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-red-100/50 blur-[120px] -top-32 -left-32 rounded-full" />
        <div className="absolute w-[500px] h-[500px] bg-blue-100/50 blur-[120px] -bottom-32 -right-32 rounded-full" />
      </div>

      {/* 🔙 Back */}
      <div className="absolute left-6 top-6 z-20">
        <button
          onClick={() => navigate("/login")}
          className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 shadow-sm backdrop-blur-md hover:bg-white hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">

        {/* 🧾 LEFT SIDE */}
        <div className="flex w-full flex-col justify-center px-6 py-16 lg:w-1/2 xl:px-24">

          <div className="mx-auto w-full max-w-[600px]">

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
                Register
              </h2>
              <p className="mt-2 text-gray-500">
                Fill your details to start shopping
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

  {/* INPUT FIELDS */}
  {[
  { name: "firstName", placeholder: "First Name", icon: User },
  { name: "lastName", placeholder: "Last Name", icon: User },
  { name: "email", placeholder: "Email", icon: Mail, type: "email" },
  { name: "mobile", placeholder: "Mobile", icon: Phone },
].map((field, i) => (
  <div key={i} className="relative group">
    <field.icon
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition"
      size={18}
    />

  <input
  type={field.name === "mobile" ? "tel" : field.type || "text"}
  name={field.name}
  placeholder={field.placeholder}
  maxLength={field.name === "mobile" ? 10 : undefined}
  inputMode={field.name === "mobile" ? "numeric" : undefined}

  onKeyDown={(e) => {
    if (field.name === "mobile") {
      // allow control keys
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];

      if (
        !/[0-9]/.test(e.key) &&
        !allowedKeys.includes(e.key)
      ) {
        e.preventDefault(); // 🚫 BLOCK non-digits instantly
      }
    }
  }}

  onPaste={(e) => {
    if (field.name === "mobile") {
      const paste = e.clipboardData.getData("text");
      if (!/^\d+$/.test(paste)) {
        e.preventDefault(); // 🚫 block paste if not numbers
      }
    }
  }}

  onChange={(e) => {
    if (field.name === "mobile") {
      handleChange({
        target: {
          name: "mobile",
          value: e.target.value.slice(0, 10),
        },
      });
    } else {
      handleChange(e);
    }
  }}

  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5 transition"
/>
  </div>
))}

  {/* GENDER */}
  {/* <div className="relative group">
    <Users
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black"
      size={18}
    />
    <select
      name="gender"
      onChange={handleChange}
      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm focus:border-black focus:bg-white outline-none"
    >
      <option value="">Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </div> */}

  {/* PASSWORD */}
  <div className="relative group col-span-2">
    <Lock
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black"
      size={18}
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5 outline-none"
    />
  </div>

  {/* ADDRESS 1 */}
  {/* <div className="relative col-span-2 group">
    <MapPin
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black"
      size={18}
    />
    <input
      name="address1"
      placeholder="Address Line 1"
      onChange={handleChange}
      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
    />
  </div> */}

  {/* ADDRESS 2 */}
  {/* <input
    name="address2"
    placeholder="Address Line 2"
    onChange={handleChange}
    className="col-span-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-black focus:bg-white"
  /> */}

  {/* CITY */}
  {/* <div className="relative group">
    <Home
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black"
      size={18}
    />
    <input
      name="city"
      placeholder="City"
      onChange={handleChange}
      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm focus:border-black focus:bg-white"
    />
  </div> */}

  {/* STATE */}
  {/* <div className="relative group">
    <Map
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black"
      size={18}
    />
    <input
      name="state"
      placeholder="State"
      onChange={handleChange}
      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm focus:border-black focus:bg-white"
    />
  </div> */}

  {/* PINCODE */}
  {/* <div className="relative group">
    <Hash
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black"
      size={18}
    />
    <input
      name="pincode"
      placeholder="Pincode"
      onChange={handleChange}
      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm focus:border-black focus:bg-white"
    />
  </div> */}

  {/* COUNTRY */}
  {/* <div className="relative group">
    <Globe
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black"
      size={18}
    />
    <input
      name="country"
      defaultValue="India"
      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm focus:border-black focus:bg-white"
    />
  </div> */}

  {/* BUTTON */}
  <button className="col-span-2 mt-4 flex items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-bold text-white shadow-xl hover:bg-gray-800 active:scale-[0.98] transition">
    Register
  </button>

</form>
          </div>
        </div>

        {/* 🎨 RIGHT SIDE (unchanged premium) */}
        <div className="hidden lg:flex w-1/2 flex-col justify-center bg-red-700 px-12 xl:px-20 relative">
          <div className="max-w-lg text-white">
            <div className="mb-10 flex items-center gap-4">
              <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center">
                <img src={Logo} className="p-2" />
              </div>
              <h1 className="text-xl font-bold">LSI Industries</h1>
            </div>

            <h2 className="text-5xl font-extrabold">
              Intelligent Lighting Meets Modern Design
            </h2>

            <p className="mt-6 text-red-100">
              High-performance LED lighting & smart solutions for modern infrastructure.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}