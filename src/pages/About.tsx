import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { FiCode, FiHeart, FiUsers, FiZap } from "react-icons/fi";

const About: React.FC = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.section
          className="text-center mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className={`text-5xl md:text-7xl font-bold mb-8 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            variants={itemVariants}
          >
            About <span className="gradient-text">Blogger One</span>
          </motion.h1>

          <motion.p
            className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
            variants={itemVariants}
          >
            A modern, futuristic blogging platform designed for creators who
            want to share their stories with the world in style. Built with
            cutting-edge technologies and a focus on user experience.
          </motion.p>
        </motion.section>

        <motion.section
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div
            className={`p-12 rounded-3xl ${
              isDark
                ? "glass-dark"
                : "bg-white/80 backdrop-blur-sm border border-gray-200"
            }`}
          >
            <motion.h2
              className={`text-3xl md:text-4xl font-bold mb-8 text-center ${
                isDark ? "text-white" : "text-gray-900"
              }`}
              variants={itemVariants}
            >
              Our Mission
            </motion.h2>

            <motion.p
              className={`text-lg leading-relaxed text-center max-w-4xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
              variants={itemVariants}
            >
              To democratize content creation by providing a beautiful,
              intuitive, and powerful platform that empowers writers,
              developers, designers, and creators of all kinds to share their
              knowledge and stories with the world. We believe that everyone has
              a story worth telling, and we're here to help you tell it
              beautifully.
            </motion.p>
          </div>
        </motion.section>

        <motion.section
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            variants={itemVariants}
          >
            What Makes Us Different
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiCode className="text-4xl" />,
                title: "Modern Tech Stack",
                description:
                  "Built with React, TypeScript, and the latest web technologies for optimal performance.",
              },
              {
                icon: <FiZap className="text-4xl" />,
                title: "Lightning Fast",
                description:
                  "Optimized for speed with lazy loading, code splitting, and performance best practices.",
              },
              {
                icon: <FiUsers className="text-4xl" />,
                title: "User-Centric Design",
                description:
                  "Every feature is designed with the user in mind, ensuring an intuitive experience.",
              },
              {
                icon: <FiHeart className="text-4xl" />,
                title: "Built with Love",
                description:
                  "Crafted with attention to detail and a passion for creating beautiful experiences.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "glass-dark hover:shadow-lg hover:shadow-neon-blue/10"
                    : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg hover:shadow-primary-500/10"
                }`}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`mb-4 ${
                    isDark ? "text-neon-blue" : "text-primary-500"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            variants={itemVariants}
          >
            Technology Stack
          </motion.h2>

          <div
            className={`p-12 rounded-3xl ${
              isDark
                ? "glass-dark"
                : "bg-white/80 backdrop-blur-sm border border-gray-200"
            }`}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "React 18",
                  description:
                    "Modern UI library with hooks and concurrent features",
                },
                {
                  name: "TypeScript",
                  description:
                    "Type-safe JavaScript for better development experience",
                },
                {
                  name: "Vite",
                  description: "Fast build tool and development server",
                },
                {
                  name: "Tailwind CSS",
                  description: "Utility-first CSS framework for rapid styling",
                },
                {
                  name: "Framer Motion",
                  description: "Production-ready motion library for animations",
                },
                {
                  name: "React Router",
                  description: "Declarative routing for React applications",
                },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-xl ${
                    isDark
                      ? "bg-dark-200/50 border border-gray-700"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {tech.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {tech.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className={`p-12 rounded-3xl ${
              isDark
                ? "glass-dark"
                : "bg-white/80 backdrop-blur-sm border border-gray-200"
            }`}
            variants={itemVariants}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Ready to Start Your Journey?
            </h2>

            <p
              className={`text-lg mb-8 max-w-2xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Join our community of creators and start sharing your stories with
              the world. It's free, it's beautiful, and it's built for the
              future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/blogs"
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 focus-ring ${
                  isDark
                    ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-lg hover:shadow-neon-blue/25"
                    : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/25"
                } cursor-pointer hover:scale-105 active:scale-95`}
              >
                Explore Blogs
              </a>

              <a
                href="/create"
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 focus-ring border-2 ${
                  isDark
                    ? "border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white"
                    : "border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
                } cursor-pointer hover:scale-105 active:scale-95`}
              >
                Start Writing
              </a>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
