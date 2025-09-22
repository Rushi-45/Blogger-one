import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/useAuth";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiHome,
  FiBookOpen,
  FiEdit3,
  FiInfo,
  FiLogOut,
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { getCursorClasses, CURSOR_STATES } from "../utils/cursorUtils";

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin, isAuthenticated, signOut } = useAuth();

  const navItems = [
    { path: "/", label: "Home", icon: FiHome },
    { path: "/blogs", label: "Blogs", icon: FiBookOpen },
    ...(isAdmin ? [{ path: "/create", label: "Create", icon: FiEdit3 }] : []),
    { path: "/about", label: "About", icon: FiInfo },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isDark
          ? "bg-dark-100/80 backdrop-blur-md border-b border-gray-700"
          : "bg-white/80 backdrop-blur-md border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className={`text-2xl font-bold transition-all duration-300 hover:scale-105 ${getCursorClasses(
              CURSOR_STATES.LINK()
            )}`}
          >
            <span className="gradient-text">Blogger</span>
            <span className={isDark ? "text-white" : "text-gray-900"}>One</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 focus-ring ${
                    isActive(item.path)
                      ? isDark
                        ? "text-neon-blue bg-neon-blue/10"
                        : "text-primary-600 bg-primary-50"
                      : isDark
                      ? "text-gray-300 hover:text-white hover:bg-dark-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  } ${getCursorClasses(CURSOR_STATES.LINK())}`}
                >
                  <Icon className="text-lg" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={signOut}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 focus-ring ${
                  isDark
                    ? "text-gray-300 hover:text-red-400 hover:bg-red-900/20"
                    : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
              >
                <FiLogOut className="text-lg" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg transition-all duration-300 focus-ring ${
                    isDark
                      ? "text-gray-300 hover:text-neon-blue hover:bg-dark-200"
                      : "text-gray-600 hover:text-primary-500 hover:bg-gray-100"
                  } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus-ring ${
                    isDark
                      ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-lg hover:shadow-neon-blue/25"
                      : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/25"
                  } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 focus-ring ${
                isDark
                  ? "text-gray-300 hover:text-neon-blue hover:bg-dark-200"
                  : "text-gray-600 hover:text-primary-500 hover:bg-gray-100"
              } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FiSun className="text-xl" />
              ) : (
                <FiMoon className="text-xl" />
              )}
            </button>

            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 focus-ring ${
                isDark
                  ? "text-gray-300 hover:text-white hover:bg-dark-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="text-xl" />
              ) : (
                <FiMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden border-t ${
                isDark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 focus-ring ${
                        isActive(item.path)
                          ? isDark
                            ? "text-neon-blue bg-neon-blue/10"
                            : "text-primary-600 bg-primary-50"
                          : isDark
                          ? "text-gray-300 hover:text-white hover:bg-dark-200"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      } ${getCursorClasses(CURSOR_STATES.LINK())}`}
                    >
                      <Icon className="text-lg" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
