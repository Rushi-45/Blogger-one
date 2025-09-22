import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { getCursorClasses, CURSOR_STATES } from "../utils/cursorUtils";
import { useAuth } from "../contexts/useAuth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSignup,
}) => {
  const { isDark } = useTheme();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(formData.email, formData.password);
      onClose();
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Login error:", error);
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          className={`relative w-full max-w-md rounded-2xl p-8 ${
            isDark
              ? "glass-dark border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
              isDark
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
          >
            <FiX className="text-xl" />
          </button>

          <div className="text-center mb-8">
            <h2
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome Back
            </h2>
            <p className={`mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Don't have an account?{" "}
              <button
                onClick={onSwitchToSignup}
                className={`font-semibold transition-colors ${
                  isDark
                    ? "text-neon-blue hover:text-neon-purple"
                    : "text-primary-500 hover:text-primary-600"
                } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
              >
                Sign up
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;
