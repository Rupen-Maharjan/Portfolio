import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Import Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Important for sessions
        }
      );
      sessionStorage.setItem('token',res.data.token);
      toast.success("Login successful!");
        navigate("/admin");
    } catch (error) {
      // Show error toast
      toast.error(error.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Email</label>
          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-700 bg-[#1b1c2a] text-white rounded-lg"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-12 py-2.5 border border-gray-700 bg-[#1b1c2a] text-white rounded-lg"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <motion.button
          className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br text-white py-2.5 rounded-lg font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Log in
        </motion.button>

        <div className="text-center">
          <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-500">
            Forgot your password?
          </Link>
        </div>
      </form>

      {/* Toast container to render toasts */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default LoginForm;
