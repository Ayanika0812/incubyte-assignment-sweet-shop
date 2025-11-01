import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import { showToast } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import SearchBar from "../components/ui/SearchBar";
import SweetGrid from "../components/sweet/SweetGrid";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) navigate("/login");
    fetchSweets();
  }, [token]);

  const fetchSweets = async (query = "") => {
    try {
      setLoading(true);
      const endpoint = query ? `/sweets/search?name=${query}` : "/sweets";
      const res = await API.get(endpoint);
      setSweets(res.data);
    } catch (err) {
      showToast.error("Failed to fetch sweets");
    } finally {
      setLoading(false);
    }
  };

  const buySweet = async (id) => {
    try {
      await API.post(`/sweets/${id}/purchase`);
      showToast.purchase("Yum! Sweet purchased successfully!");
      fetchSweets(searchQuery);
    } catch (err) {
      showToast.error(err.response?.data?.message || "Purchase failed");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchSweets(query);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Sweet Treats Await! 🍭
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our delicious collection of handcrafted sweets and treats. 
            From chocolates to candies, we have something for every sweet tooth!
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-md mx-auto mb-12">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for your favorite treats... 🍭"
            className="w-full"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-pink-200">
            <div className="text-3xl mb-2">🍬</div>
            <div className="text-2xl font-bold text-pink-600">{sweets.length}</div>
            <div className="text-sm text-gray-600">Sweet Varieties</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-pink-200">
            <div className="text-3xl mb-2">📦</div>
            <div className="text-2xl font-bold text-green-600">
              {sweets.reduce((acc, sweet) => acc + sweet.quantity, 0)}
            </div>
            <div className="text-sm text-gray-600">Items in Stock</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-pink-200">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-yellow-600">Premium</div>
            <div className="text-sm text-gray-600">Quality Guaranteed</div>
          </div>
        </div>

        {/* Sweet Grid */}
        <SweetGrid 
          sweets={sweets} 
          onPurchase={buySweet}
          loading={loading}
        />
      </div>
    </Layout>
  );
}
