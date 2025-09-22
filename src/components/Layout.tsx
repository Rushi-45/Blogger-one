import React from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </motion.main>

      <Footer />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDark ? "#2d2d2d" : "#ffffff",
            color: isDark ? "#ffffff" : "#1a1a1a",
            border: isDark ? "1px solid #404040" : "1px solid #e5e7eb",
            borderRadius: "12px",
            boxShadow: isDark
              ? "0 10px 25px rgba(0, 0, 0, 0.3)"
              : "0 10px 25px rgba(0, 0, 0, 0.1)",
          },
          success: {
            iconTheme: {
              primary: isDark ? "#00f5ff" : "#0ea5e9",
              secondary: isDark ? "#2d2d2d" : "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: isDark ? "#2d2d2d" : "#ffffff",
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;
