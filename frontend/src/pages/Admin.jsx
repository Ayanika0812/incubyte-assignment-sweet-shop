import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import AddSweetForm from "../components/admin/AddSweetForm";
import AdminSweetCard from "../components/admin/AdminSweetCard";

export default function Admin() {
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await API.get("/sweets");
      setSweets(res.data);
    } catch {
      toast.error("Failed to fetch sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const addSweet = async (sweetData) => {
    try {
      await API.post("/sweets", sweetData);
      toast.success("Sweet added successfully! 🍬");
      fetchSweets();
    } catch (e) {
      toast.error(e.response?.data?.message || "Error adding sweet");
      throw e; // Re-throw to handle in form
    }
  };

  const deleteSweet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    
    try {
      await API.delete(`/sweets/${id}`);
      toast.success("Sweet deleted successfully! 🗑️");
      fetchSweets();
    } catch (e) {
      toast.error(e.response?.data?.message || "Delete failed");
    }
  };

  const restockSweet = async (id) => {
    try {
      await API.post(`/sweets/${id}/restock`, { qty: 10 });
      toast.success("Sweet restocked! 📦");
      fetchSweets();
    } catch (e) {
      toast.error(e.response?.data?.message || "Restock failed");
    }
  };

  // Calculate stats
  const totalSweets = sweets.length;
  const totalStock = sweets.reduce((acc, sweet) => acc + sweet.quantity, 0);
  const lowStockItems = sweets.filter(sweet => sweet.quantity < 5).length;
  const outOfStockItems = sweets.filter(sweet => sweet.quantity === 0).length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Admin Dashboard 👑
            </h1>
            <p className="text-gray-600 mt-1">Manage your sweet inventory</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
          >
            ← Back to Shop
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-pink-200">
            <div className="text-3xl mb-2">🍬</div>
            <div className="text-2xl font-bold text-pink-600">{totalSweets}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-green-200">
            <div className="text-3xl mb-2">📦</div>
            <div className="text-2xl font-bold text-green-600">{totalStock}</div>
            <div className="text-sm text-gray-600">Items in Stock</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-yellow-200">
            <div className="text-3xl mb-2">⚠️</div>
            <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
            <div className="text-sm text-gray-600">Low Stock</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-red-200">
            <div className="text-3xl mb-2">❌</div>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <div className="text-sm text-gray-600">Out of Stock</div>
          </div>
        </div>

        {/* Add Sweet Form */}
        <div className="mb-8">
          <AddSweetForm onAddSweet={addSweet} />
        </div>

        {/* Sweet Inventory */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sweet Inventory</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white rounded-2xl border border-pink-100 shadow-lg overflow-hidden">
                    <div className="h-32 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-8 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : sweets.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No sweets in inventory</h3>
              <p className="text-gray-500">Add your first sweet using the form above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sweets.map((sweet) => (
                <AdminSweetCard
                  key={sweet._id}
                  sweet={sweet}
                  onDelete={deleteSweet}
                  onRestock={restockSweet}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
