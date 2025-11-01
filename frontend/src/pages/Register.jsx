import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import Toggle from "../components/ui/Toggle";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" // default to user role
  });
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdminToggle = (checked) => {
    setIsAdmin(checked);
    setForm({ ...form, role: checked ? "admin" : "user" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await API.post("/auth/register", form);
      toast.success("Account created successfully! Please sign in. 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout showHeader={false} showFooter={false}>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl mb-4">
              <span className="text-white text-2xl">🍭</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Sweet Shop
            </h1>
            <p className="text-gray-600 mt-2">Join our sweet community today!</p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <span>👤</span>
                <span>User Account</span>
              </div>
              <div className="text-gray-300">or</div>
              <div className="flex items-center space-x-1">
                <span>👑</span>
                <span>Admin Account</span>
              </div>
            </div>
          </div>

          <Card>
            <Card.Header>
              <h2 className="text-2xl font-bold text-center text-gray-900">
                Create Account
              </h2>
            </Card.Header>
            
            <Card.Content>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  name="name"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  icon="👤"
                  required
                />
                
                <Input
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  icon="📧"
                  required
                />
                
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  icon="🔒"
                  required
                />

                {/* Admin Toggle */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200">
                  <Toggle
                    label="Admin Account"
                    description="Enable admin privileges to manage sweet inventory and user accounts"
                    checked={isAdmin}
                    onChange={handleAdminToggle}
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      isAdmin 
                        ? 'bg-pink-100 text-pink-700 border border-pink-200' 
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      {isAdmin ? '👑 Admin User' : '👤 Regular User'}
                    </span>
                    <div className="text-xs text-gray-500">
                      {isAdmin ? 'Full access to admin panel' : 'Standard user privileges'}
                    </div>
                  </div>
                  
                  {isAdmin && (
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-700 flex items-center gap-1">
                        <span>⚠️</span>
                        Admin accounts can add, edit, and delete sweets from the inventory.
                      </p>
                    </div>
                  )}
                </div>

                <Button 
                  type="submit"
                  variant="success"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Creating Account... ⏳" : `Create ${isAdmin ? 'Admin' : 'User'} Account 🎉`}
                </Button>
              </form>
            </Card.Content>
            
            <Card.Footer>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="font-medium text-pink-600 hover:text-pink-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
