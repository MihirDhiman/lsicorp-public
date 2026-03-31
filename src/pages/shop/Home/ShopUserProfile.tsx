import { useEffect, useState } from "react";
import { authService } from "../../../api/api";
import ShopNav from "./ShopNav"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
  try {
    const res = await authService.getProfile();

    console.log("PROFILE:", res.data);

    setUser(res.data.user); // ✅ FIXED

  } catch (err: any) {
    console.error(err);
    alert("Failed to load profile");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <>
  <ShopNav totalItems={0} onCartClick={() => {}} />
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {user ? (
        <div className="space-y-2 bg-white p-4 rounded-xl shadow">
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
      ) : (
        <p>No user data</p>
      )}
    </div>
    </>
  );
}