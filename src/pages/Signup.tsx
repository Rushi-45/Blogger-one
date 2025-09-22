import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
} from "react-icons/fi";
import { useAuth } from "../contexts/useAuth";
import { useTheme } from "../contexts/ThemeContext";
import { getCursorClasses, CURSOR_STATES } from "../utils/cursorUtils";

const Signup: React.FC = () => {
  const { isDark } = useTheme();
  const { isAuthenticated, signUp } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.fullName);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-neon-pink/20 to-neon-green/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          className={`w-full max-w-md rounded-2xl p-8 ${
            isDark
              ? "glass-dark border border-gray-700"
              : "bg-white/80 backdrop-blur-sm border border-gray-200"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className={`inline-flex items-center gap-2 mb-8 text-sm transition-colors ${
              isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
          >
            <FiArrowLeft className="text-lg" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <h1
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Create Account
            </h1>
            <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Join our blogging community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <div className="relative">
                <FiUser
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-lg ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus-ring ${
                    isDark
                      ? "bg-dark-200 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <div className="relative">
                <FiMail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-lg ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus-ring ${
                    isDark
                      ? "bg-dark-200 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <FiLock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-lg ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus-ring ${
                    isDark
                      ? "bg-dark-200 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-700"
                  } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-lg" />
                  ) : (
                    <FiEye className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <FiLock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-lg ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all duration-300 focus-ring ${
                    isDark
                      ? "bg-dark-200 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-700"
                  } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="text-lg" />
                  ) : (
                    <FiEye className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 focus-ring ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : isDark
                  ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-lg hover:shadow-neon-blue/25"
                  : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/25"
              } ${getCursorClasses(
                loading ? CURSOR_STATES.DISABLED() : CURSOR_STATES.BUTTON()
              )}`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Already have an account?{" "}
              <Link
                to="/login"
                className={`font-semibold transition-colors ${
                  isDark
                    ? "text-neon-blue hover:text-neon-purple"
                    : "text-primary-500 hover:text-primary-600"
                } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
