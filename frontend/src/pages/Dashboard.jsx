import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { token, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    if (!token) navigate("/login");
    fetchSweets();
  }, [token]);

  const fetchSweets = async (query = "") => {
    try {
      const endpoint = query ? `/sweets/search?name=${query}` : "/sweets";
      const res = await API.get(endpoint);
      setSweets(res.data);
    } catch (err) {
      toast.error("Failed to fetch sweets");
    }
  };

  const buySweet = async (id) => {
    try {
      await API.post(`/sweets/${id}/purchase`);
      toast.success("Yum! Purchased 🍬");
      fetchSweets();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-sweetLightBg flex justify-center p-6">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-sweetHotPink">
            Welcome {user?.email} 👋
          </h2>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow"
          >
            Logout
          </button>
        </div>

        {/* Admin Button */}
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="bg-sweetHotPink hover:bg-pink-600 text-white px-4 py-2 rounded-xl shadow mb-4"
          >
            🍰 Admin Panel
          </button>
        )}

        {/* Search */}
        <input
          type="text"
          placeholder="Search sweet treats... 🍭"
          onChange={(e) => fetchSweets(e.target.value)}
          className="p-4 w-full border border-pink-400 rounded-xl mb-8 shadow text-lg 
                     focus:border-sweetHotPink focus:outline-none bg-white"
        />

        {/* Sweet Grid */}
        <div className="space-y-6">
          {sweets.map((sweet) => (
            <div
              key={sweet._id}
              className="bg-white p-6 rounded-2xl border border-pink-200 shadow-sweet
                         hover:shadow-sweetHover transition flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold text-sweetHotPink mb-1">{sweet.name}</h3>
                <p className="text-gray-600">🍭 {sweet.category}</p>
                <p className="font-semibold mt-1">💰 ₹{sweet.price}</p>
                <p className="text-gray-700 mt-1">📦 Available: {sweet.quantity}</p>
              </div>

              <button
                disabled={sweet.quantity === 0}
                onClick={() => buySweet(sweet._id)}
                className={`px-6 py-3 rounded-xl font-semibold text-white
                ${
                  sweet.quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-sweetHotPink hover:bg-pink-600 shadow"
                }`}
              >
                {sweet.quantity === 0 ? "Out of Stock ❌" : "Buy Sweet 🍬"}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
