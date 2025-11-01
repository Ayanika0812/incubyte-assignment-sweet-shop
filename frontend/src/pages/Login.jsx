import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await API.post("/auth/login", form);
      login(
        { 
          email: res.data.email, 
          role: res.data.role 
        },
        res.data.token
      );

      toast.success("Welcome back! 🍭");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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
            <p className="text-gray-600 mt-2">Welcome back to your sweet paradise!</p>
          </div>

          <Card>
            <Card.Header>
              <h2 className="text-2xl font-bold text-center text-gray-900">
                Sign In
              </h2>
            </Card.Header>
            
            <Card.Content>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  icon="📧"
                  required
                />
                
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  icon="🔒"
                  required
                />

                <Button 
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Signing in... ⏳" : "Sign In 🍭"}
                </Button>
              </form>
            </Card.Content>
            
            <Card.Footer>
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link 
                  to="/register" 
                  className="font-medium text-pink-600 hover:text-pink-500 transition-colors"
                >
                  Create one here
                </Link>
              </p>
            </Card.Footer>
          </Card>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <div>👤 User: user@demo.com / password123</div>
              <div>👑 Admin: admin@demo.com / admin123</div>
            </div>
          </div>

          {/* Registration Info */}
          <div className="mt-4 p-4 bg-pink-50 rounded-xl border border-pink-200">
            <h3 className="text-sm font-semibold text-pink-900 mb-2">✨ New Feature:</h3>
            <p className="text-xs text-pink-700">
              When registering, you can now choose to create an admin account with full inventory management privileges!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
