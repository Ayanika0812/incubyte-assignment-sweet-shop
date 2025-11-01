import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const fetchSweets = async () => {
    try {
      const res = await API.get("/sweets");
      setSweets(res.data);
    } catch {
      toast.error("Failed to fetch sweets");
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const addSweet = async () => {
    try {
      await API.post("/sweets", {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
      toast.success("Sweet added ✅");
      setForm({ name: "", category: "", price: "", quantity: "" });
      fetchSweets();
    } catch (e) {
      toast.error(e.response?.data?.message || "Error adding sweet");
    }
  };

  const deleteSweet = async (id) => {
    try {
      await API.delete(`/sweets/${id}`);
      toast.success("Deleted ✅");
      fetchSweets();
    } catch (e) {
      toast.error(e.response?.data?.message || "Delete failed");
    }
  };

  const restockSweet = async (id) => {
    try {
      await API.post(`/sweets/${id}/restock`, { qty: 1 });
      toast.success("Restocked ✅");
      fetchSweets();
    } catch (e) {
      toast.error(e.response?.data?.message || "Restock failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7FA] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-pink-600">Admin Panel 👑</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-pink-200 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {["name", "category", "price", "quantity"].map((field) => (
          <input
            key={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border border-pink-300 rounded-lg p-2 focus:border-pink-500 outline-none"
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}

        <button
          onClick={addSweet}
          className="md:col-span-4 mt-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl py-2 font-semibold shadow"
        >
          ➕ Add Sweet
        </button>
      </div>

      {/* Sweet List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sweets.map((s) => (
          <div
            key={s._id}
            className="bg-white p-5 rounded-xl shadow border border-pink-200 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg text-pink-600">{s.name}</h3>
              <p className="text-gray-600">🍭 {s.category}</p>
              <p className="text-gray-800 font-semibold">₹{s.price}</p>
              <p className="text-gray-600">📦 Qty: {s.quantity}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-3 py-1 rounded-lg"
                onClick={() => restockSweet(s._id)}
              >
                📦 Restock
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                onClick={() => deleteSweet(s._id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
