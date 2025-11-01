import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(
            { 
                email: res.data.email, 
                role: res.data.role 
            },
            res.data.token
            );

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <button 
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-xl w-full font-semibold shadow"
            >
                Login 🍭
        </button>


        <p className="text-sm mt-2">
             Don't have an account?{" "}
            <a href="/register" className="text-blue-600 underline">Register</a>
        </p>

      </form>
    </div>
  );
}
