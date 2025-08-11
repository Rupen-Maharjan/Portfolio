import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { Lock, User, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";

// Toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Password validator
const validatePassword = (password) => {
  return {
    minLength: password.length >= 6,
    uppercase: (password.match(/[A-Z]/g) || []).length >= 1,
    numbers: (password.match(/[0-9]/g) || []).length >= 1,
    symbols: (password.match(/[^A-Za-z0-9]/g) || []).length >= 1,
  };
};

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validation, setValidation] = useState({});
  const [isValidPassword, setIsValidPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const result = validatePassword(formData.password);
    setValidation(result);
    setIsValidPassword(Object.values(result).every((v) => v === true));
  }, [formData.password]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/register", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      sessionStorage.setItem('token',res.data.token)
      toast.success(res.data.msg || "Registration successful!");
      navigate('/admin')
      

    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    }
  };

  const renderValidationItem = (label, passed) => (
    <div className="flex items-center gap-2 text-sm text-gray-300" key={label}>
      {passed ? (
        <CheckCircle className="text-green-400 w-4 h-4" />
      ) : (
        <XCircle className="text-red-400 w-4 h-4" />
      )}
      {label}
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <motion.div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-300">First Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-700 bg-[#1b1c2a] text-white rounded-lg"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-300">Last Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-700 bg-[#1b1c2a] text-white rounded-lg"
                placeholder="Last Name"
              />
            </div>
          </div>
        </motion.div>

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

          {/* Live password validation feedback */}
          <div className="space-y-1 mt-2 pl-2">
            {renderValidationItem("At least 6 characters", validation.minLength)}
            {renderValidationItem("At least 1 uppercase letter", validation.uppercase)}
            {renderValidationItem("At least 1 numbers", validation.numbers)}
            {renderValidationItem("At least 1 special characters", validation.symbols)}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full pl-10 pr-12 py-2.5 border border-gray-700 bg-[#1b1c2a] text-white rounded-lg"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <motion.button
          type="submit"
          className={`w-full py-2.5 rounded-lg font-medium ${
            isValidPassword
              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br text-white"
              : "bg-gray-600 cursor-not-allowed text-white opacity-50"
          }`}
          whileHover={isValidPassword ? { scale: 1.02 } : {}}
          whileTap={isValidPassword ? { scale: 0.98 } : {}}
          disabled={!isValidPassword}
        >
          Register
        </motion.button>
      </form>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default RegisterForm;
