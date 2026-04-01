import { useEffect, useState } from "react";
import { authService } from "../../../api/api";
import ShopNav from "./ShopNav";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  Edit3,
  Save,
  X,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await authService.getProfile();
      const userData = res.data.user;

      setUser(userData);
      setFormData(userData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (!formData.first_name || !formData.last_name) {
      return toast.error("Name cannot be empty ❌");
    }

    try {
      setSaving(true);

      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
      };

      const res = await authService.updateProfile(payload);

      setUser(res.data.user);
      setIsEditing(false);

      toast.success("Profile updated successfully ✅");
    } catch (err: any) {
      console.error(err);
      const message = err?.response?.data?.message || "Update failed ❌";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  // 🔥 PREMIUM LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse space-y-4 w-full max-w-md">
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-40 bg-gray-300 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ShopNav totalItems={0} onCartClick={() => {}} />

      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 p-6 mt-[80px]">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* PROFILE CARD */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8 transition hover:shadow-3xl">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-black via-gray-800 to-gray-600 text-white flex items-center justify-center text-xl font-bold shadow-lg ring-4 ring-gray-200">
                  {user.first_name?.[0]}{user.last_name?.[0]}
                </div>

                <div>
                  <p className="font-bold text-xl text-gray-900">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Mail size={14} /> {user.email}
                  </p>
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-900 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
                >
                  <Edit3 size={16} /> Edit Profile
                </button>
              )}
            </div>

            {/* FIELDS */}
            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <User size={14} /> First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-2 w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <User size={14} /> Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-2 w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black focus:border-black outline-none transition disabled:bg-gray-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <Mail size={14} /> Email
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  disabled
                  className="mt-2 w-full border border-gray-300 px-4 py-3 rounded-xl bg-gray-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-500 flex items-center gap-2">
                  <Phone size={14} /> Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className="mt-2 w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                ) : (
                  <p className="mt-2 text-gray-800">{user.phone}</p>
                )}
              </div>
            </div>

            {/* ACTIONS */}
            {isEditing && (
              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  <X size={16} /> Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-900 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
                >
                  <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          {/* PASSWORD */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
              <Lock size={18} /> Change Password
            </h3>

            <div className="space-y-4">

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  value={formData.currentPassword || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black outline-none pr-10"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={formData.newPassword || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-black outline-none pr-10"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <button
                onClick={async () => {
                  try {
                    await authService.changePassword(
                      formData.currentPassword,
                      formData.newPassword
                    );

                    toast.success("Password changed successfully 🔐");

                    setFormData({
                      ...formData,
                      currentPassword: "",
                      newPassword: "",
                    });
                  } catch (err: any) {
                    toast.error(
                      err?.response?.data?.message ||
                        "Failed to change password ❌"
                    );
                  }
                }}
                className="w-full bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}