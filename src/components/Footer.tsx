import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { getCursorClasses, CURSOR_STATES } from "../utils/cursorUtils";

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/Rushi-45", label: "GitHub" },
    {
      icon: FiInstagram,
      href: "https://www.instagram.com/rushiii.js/",
      label: "Instagram",
    },
    {
      icon: FiLinkedin,
      href: "https://www.linkedin.com/in/rushi-chudasama-63473819a/",
      label: "LinkedIn",
    },
    { icon: FiMail, href: "mailto:rushi.positive@gmail.com", label: "Email" },
  ];

  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs" },
    { label: "Create", href: "/create" },
    { label: "About", href: "/about" },
  ];

  return (
    <footer
      className={`mt-20 transition-all duration-300 ${
        isDark
          ? "bg-dark-200/50 border-t border-gray-700"
          : "bg-gray-50/50 border-t border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to="/"
              className={`text-2xl font-bold mb-4 inline-block transition-all duration-300 hover:scale-105 ${getCursorClasses(
                CURSOR_STATES.LINK()
              )}`}
            >
              <span className="gradient-text">Blogger</span>
              <span className={isDark ? "text-white" : "text-gray-900"}>
                One
              </span>
            </Link>

            <p
              className={`text-lg mb-6 max-w-md ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              A modern, futuristic blogging platform designed for creators who
              want to share their stories with the world in style.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`p-3 rounded-xl transition-all duration-300 focus-ring ${
                      isDark
                        ? "text-gray-400 hover:text-neon-blue hover:bg-neon-blue/10"
                        : "text-gray-500 hover:text-primary-500 hover:bg-primary-50"
                    } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="text-xl" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className={`text-sm transition-all duration-300 hover:scale-105 ${
                      isDark
                        ? "text-gray-300 hover:text-neon-blue"
                        : "text-gray-600 hover:text-primary-500"
                    } ${getCursorClasses(CURSOR_STATES.LINK())}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Contact
            </h3>
            <div
              className={`space-y-3 text-sm ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <p>Rushi Chudasama</p>
              <p>+91 7016552650</p>
              <p>Ahmedabad, IND</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={`mt-12 pt-8 border-t ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              © {currentYear} Blogger One. All rights reserved.
            </p>

            <div
              className={`flex items-center gap-2 text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span>Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1, 1.3, 1, 1, 1, 1],
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FiHeart
                  className={`${isDark ? "text-red-400" : "text-red-500"}`}
                />
              </motion.div>
              <span>by the Blogger One team</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
