import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiSearch, FiPlus, FiClock, FiEye, FiHeart } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { getCursorClasses, CURSOR_STATES } from "../utils/cursorUtils";
import { blogService } from "../services/blogService";
import { type Blog } from "../types/index";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/useAuth";
import { useAuthReady } from "../services/useAuthReady";

const Blogs: React.FC = () => {
  const authReady = useAuthReady();
  const { isDark } = useTheme();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!authReady) {
      return;
    }

    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const data = await blogService.getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [authReady, user]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      try {
        setLoading(true);
        const results = await blogService.searchBlogs(query);
        setBlogs(results);
      } catch (error) {
        console.error("Error searching blogs:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const data = await blogService.getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLike = async (e: React.MouseEvent, blogId: string) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const success = await blogService.likeBlog(blogId);
      if (success) {
        setBlogs((prev) =>
          prev.map((blog) =>
            blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
          )
        );
        toast.success("Liked!");
      } else {
        toast.error("Failed to like blog");
      }
    } catch (error) {
      console.error("Error liking blog:", error);
      toast.error("Something went wrong");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="gradient-text">Blog</span> Feed
          </h1>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Discover stories, insights, and ideas from our community
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex-1 relative">
            <FiSearch
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xl ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus-ring ${
                isDark
                  ? "bg-dark-200 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500"
              }`}
            />
          </div>

          <Link
            to="/create"
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus-ring flex items-center gap-2 ${
              isDark
                ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-lg hover:shadow-neon-blue/25"
                : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/25"
            } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
          >
            <FiPlus className="text-xl" />
            New Post
          </Link>
        </motion.div>

        {loading && (
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
            <p className={`mt-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Loading blogs...
            </p>
          </motion.div>
        )}

        {!loading && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
                  isDark
                    ? "glass-dark hover:shadow-lg hover:shadow-neon-blue/10"
                    : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg hover:shadow-primary-500/10"
                }`}
              >
                <Link
                  to={`/blog/${blog.id}`}
                  className={`block ${getCursorClasses(CURSOR_STATES.CARD())}`}
                >
                  {blog.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}

                  <div className="p-6">
                    <h3
                      className={`text-xl font-semibold mb-3 line-clamp-2 group-hover:text-neon-blue transition-colors ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {blog.title}
                    </h3>

                    <p
                      className={`text-sm mb-4 line-clamp-3 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {blog.content}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isDark
                              ? "bg-neon-blue/20 text-neon-blue"
                              : "bg-primary-100 text-primary-600"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`flex items-center justify-between text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <FiClock className="text-sm" />
                          <span>{blog.read_time} min read</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiEye className="text-sm" />
                          <span>{blog.views}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleLike(e, blog.id)}
                        className={`flex items-center gap-1 transition-all duration-200 hover:scale-105 ${getCursorClasses(
                          CURSOR_STATES.BUTTON()
                        )}`}
                      >
                        <FiHeart className="text-sm hover:text-red-500" />
                        <span>{blog.likes}</span>
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && blogs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className={`text-6xl mb-4 ${
                isDark ? "text-gray-600" : "text-gray-400"
              }`}
            >
              📝
            </div>
            <h3
              className={`text-2xl font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              No blogs found
            </h3>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {searchQuery
                ? "Try adjusting your search terms"
                : "Be the first to create a blog post!"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
