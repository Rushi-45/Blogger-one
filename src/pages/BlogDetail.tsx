import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiClock,
  FiEye,
  FiHeart,
  FiShare2,
  FiUser,
  FiCalendar,
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { getCursorClasses, CURSOR_STATES } from "../utils/cursorUtils";
import { blogService } from "../services/blogService";
import { type Blog } from "../types/index";
import toast from "react-hot-toast";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const [blogData, relatedData] = await Promise.all([
          blogService.getBlogById(id),
          blogService.getRelatedBlogs(id, 3),
        ]);

        setBlog(blogData);
        setRelatedBlogs(relatedData);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    if (!blog) return;

    try {
      if (liked) {
        const success = await blogService.unlikeBlog(blog.id);
        if (success) {
          setLiked(false);
          setBlog((prev) =>
            prev ? { ...prev, likes: Math.max(0, prev.likes - 1) } : null
          );
          toast.success("Removed from likes");
        } else {
          toast.error("Failed to unlike blog");
        }
      } else {
        const success = await blogService.likeBlog(blog.id);
        if (success) {
          setLiked(true);
          setBlog((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
          toast.success("Added to likes");
        } else {
          toast.error("Failed to like blog");
        }
      }
    } catch (error) {
      console.error("Error handling like:", error);
      toast.error("Something went wrong");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.content.substring(0, 100),
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark
            ? "bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"
            : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
        }`}
      >
        <div className="text-center">
          <div
            className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${
              isDark ? "border-neon-blue" : "border-primary-500"
            }`}
          ></div>
          <p className={`mt-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Loading blog...
          </p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark
            ? "bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"
            : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
        }`}
      >
        <div className="text-center">
          <h1
            className={`text-2xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Blog not found
          </h1>
          <Link
            to="/blogs"
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus-ring ${
              isDark
                ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-lg hover:shadow-neon-blue/25"
                : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/25"
            } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"
          : "bg-gradient-to-br from-gray-50 via-white to-blue-50"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-xl transition-all duration-300 focus-ring ${
            isDark
              ? "text-gray-300 hover:text-white hover:bg-dark-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FiArrowLeft className="text-lg" />
          Back
        </motion.button>

        <motion.article
          className={`rounded-2xl overflow-hidden ${
            isDark
              ? "glass-dark"
              : "bg-white/80 backdrop-blur-sm border border-gray-200"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {blog.image && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          <div className="p-8">
            <h1
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {blog.title}
            </h1>

            <div
              className={`flex flex-wrap items-center gap-6 mb-8 text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <FiUser className="text-lg" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-lg" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-lg" />
                <span>{blog.read_time} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <FiEye className="text-lg" />
                <span>{blog.views} views</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
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
              className={`prose prose-lg max-w-none ${
                isDark ? "prose-invert" : "prose-gray"
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">
                {blog.content}
              </p>
            </div>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 focus-ring ${
                    liked
                      ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                      : isDark
                      ? "text-gray-400 hover:text-red-500 hover:bg-red-900/20"
                      : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                  } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
                >
                  <FiHeart
                    className={`text-lg ${liked ? "fill-current" : ""}`}
                  />
                  <span>{blog.likes}</span>
                </button>

                <button
                  onClick={handleShare}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 focus-ring ${
                    isDark
                      ? "text-gray-400 hover:text-neon-blue hover:bg-neon-blue/20"
                      : "text-gray-600 hover:text-primary-500 hover:bg-primary-50"
                  } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
                >
                  <FiShare2 className="text-lg" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </motion.article>

        {relatedBlogs.length > 0 && (
          <motion.section
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              className={`text-2xl font-bold mb-8 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Related Articles
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <motion.div
                  key={relatedBlog.id}
                  className={`group rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                    isDark
                      ? "glass-dark hover:shadow-lg hover:shadow-neon-blue/10"
                      : "bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg hover:shadow-primary-500/10"
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <Link
                    to={`/blog/${relatedBlog.id}`}
                    className={`block ${getCursorClasses(
                      CURSOR_STATES.CARD()
                    )}`}
                  >
                    {relatedBlog.image && (
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={relatedBlog.image}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="p-4">
                      <h3
                        className={`text-lg font-semibold mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {relatedBlog.title}
                      </h3>

                      <div
                        className={`flex items-center gap-4 text-sm ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <FiClock className="text-sm" />
                          <span>{relatedBlog.read_time} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiEye className="text-sm" />
                          <span>{relatedBlog.views}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
