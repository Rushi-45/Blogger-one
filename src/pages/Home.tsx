import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClock, FiEye, FiHeart, FiArrowRight } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/useAuth";
import { getCursorClasses, CURSOR_STATES } from "../utils/cursorUtils";
import { blogService } from "../services/blogService";
import { type Blog } from "../types/index";

const Home: React.FC = () => {
  const { isDark } = useTheme();
  const { isAdmin } = useAuth();
  const [topBlogs, setTopBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopBlogs = async () => {
      try {
        setLoading(true);
        const blogs = await blogService.getBlogs();
        // Sort by likes and take top 6
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes).slice(0, 6);
        setTopBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching top blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopBlogs();
  }, []);

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
      <motion.section
        className="relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-neon-pink/20 to-neon-green/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div className="text-center" variants={itemVariants}>
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="gradient-text">Blogger</span>
              <br />
              <span className={`${isDark ? "text-white" : "text-gray-800"}`}>
                One
              </span>
            </h1>

            <motion.p
              className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
              variants={itemVariants}
            >
              The future of blogging is here. Share your stories, ideas, and
              insights with a platform designed for the modern creator.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <Link
                to="/blogs"
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 focus-ring ${
                  isDark
                    ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-lg hover:shadow-neon-blue/25"
                    : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/25"
                } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
              >
                Explore Blogs
              </Link>

              {isAdmin && (
                <Link
                  to="/create"
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 focus-ring border-2 ${
                    isDark
                      ? "border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white"
                      : "border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
                  } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
                >
                  Start Writing
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Top Blogs Section */}
      <motion.section
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="gradient-text">Top</span> Stories
            </h2>
            <p
              className={`text-lg ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Discover the most loved content from our community
            </p>
          </motion.div>

          {loading ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div
                className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${
                  isDark ? "border-neon-blue" : "border-primary-500"
                }`}
              ></div>
              <p
                className={`mt-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                Loading top blogs...
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {topBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className={`group rounded-xl overflow-hidden transition-all duration-300 ${
                    isDark
                      ? "glass-dark hover:shadow-lg hover:shadow-neon-blue/10"
                      : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg hover:shadow-primary-500/10"
                  }`}
                >
                  <Link
                    to={`/blog/${blog.id}`}
                    className={`block ${getCursorClasses(
                      CURSOR_STATES.CARD()
                    )}`}
                  >
                    {blog.image && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}

                    <div className="p-4">
                      <h3
                        className={`text-lg font-semibold mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {blog.title}
                      </h3>

                      <p
                        className={`text-sm mb-3 line-clamp-2 ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {blog.content}
                      </p>

                      <div
                        className={`flex items-center justify-between text-sm ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <FiClock className="text-xs" />
                            <span>{blog.read_time} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiEye className="text-xs" />
                            <span>{blog.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiHeart className="text-xs" />
                            <span>{blog.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div className="text-center mt-8" variants={itemVariants}>
            <Link
              to="/blogs"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus-ring ${
                isDark
                  ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-lg hover:shadow-neon-blue/25"
                  : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/25"
              } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
            >
              View All Blogs
              <FiArrowRight className="text-lg" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Compact Advantages Section */}
      <motion.section
        className="py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h2
              className={`text-2xl md:text-3xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Why Choose <span className="gradient-text">Blogger One</span>?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🚀",
                title: "Lightning Fast",
                description:
                  "Built with modern technologies for optimal performance.",
              },
              {
                icon: "🎨",
                title: "Beautiful Design",
                description:
                  "Futuristic UI with smooth animations and responsive design.",
              },
              {
                icon: "📱",
                title: "Mobile First",
                description:
                  "Optimized for all devices with a mobile-first approach.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? "glass-dark hover:shadow-lg hover:shadow-neon-blue/10"
                    : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg hover:shadow-primary-500/10"
                }`}
                variants={itemVariants}
                whileHover={{ y: -3 }}
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
