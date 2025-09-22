import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Temporarily comment out unused image upload icons
// import { FiUpload, FiX, FiSave } from "react-icons/fi";
import { FiX, FiSave } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import { getCursorClasses, CURSOR_STATES } from "../utils/cursorUtils";
import { blogService } from "../services/blogService";
import { type CreateBlogData } from "../types/index";
import toast from "react-hot-toast";

const CreateBlog: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateBlogData>({
    title: "",
    content: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  // Temporarily comment out image preview state
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Temporarily comment out image handling functions
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       image: file,
  //     }));
  //     setImagePreview(URL.createObjectURL(file));
  //   }
  // };

  // const handleRemoveImage = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     image: undefined,
  //   }));
  //   setImagePreview(null);
  // };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      await blogService.createBlog(formData);
      toast.success("Blog created successfully!");
      navigate("/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="gradient-text">Create</span> New Blog
          </h1>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Share your story with the world
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className={`p-8 rounded-2xl ${
            isDark
              ? "glass-dark"
              : "bg-white/80 backdrop-blur-sm border border-gray-200"
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-6" variants={itemVariants}>
            <label
              className={`block text-sm font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your blog title..."
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus-ring ${
                isDark
                  ? "bg-dark-200 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500"
              }`}
              required
            />
          </motion.div>

          {/* Temporarily comment out image upload section */}
          {/* <motion.div className="mb-6" variants={itemVariants}>
            <label
              className={`block text-sm font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Featured Image
            </label>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
                    isDark
                      ? "bg-dark-200 text-white hover:bg-dark-300"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
                >
                  <FiX className="text-lg" />
                </button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 hover:border-solid ${
                  isDark
                    ? "border-gray-600 hover:border-neon-blue"
                    : "border-gray-300 hover:border-primary-500"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className={`flex flex-col items-center gap-2 ${getCursorClasses(
                    CURSOR_STATES.BUTTON()
                  )}`}
                >
                  <FiUpload className="text-3xl text-gray-400" />
                  <span
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Click to upload an image
                  </span>
                </label>
              </div>
            )}
          </motion.div> */}

          <motion.div className="mb-6" variants={itemVariants}>
            <label
              className={`block text-sm font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog content here..."
              rows={12}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus-ring resize-none ${
                isDark
                  ? "bg-dark-200 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500"
              }`}
              required
            />
          </motion.div>

          <motion.div className="mb-8" variants={itemVariants}>
            <label
              className={`block text-sm font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Tags
            </label>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all duration-300 focus-ring ${
                  isDark
                    ? "bg-dark-200 border-gray-600 text-white placeholder-gray-400 focus:border-neon-blue"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary-500"
                }`}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus-ring ${
                  isDark
                    ? "bg-neon-blue text-white hover:bg-neon-purple"
                    : "bg-primary-500 text-white hover:bg-primary-600"
                } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
              >
                Add
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                      isDark
                        ? "bg-neon-blue/20 text-neon-blue"
                        : "bg-primary-100 text-primary-600"
                    }`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className={`hover:scale-110 transition-transform ${getCursorClasses(
                        CURSOR_STATES.BUTTON()
                      )}`}
                    >
                      <FiX className="text-xs" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            className="flex justify-end gap-4"
            variants={itemVariants}
          >
            <button
              type="button"
              onClick={() => navigate("/blogs")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus-ring border-2 ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:border-gray-500"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              } ${getCursorClasses(CURSOR_STATES.BUTTON())}`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 focus-ring flex items-center gap-2 ${
                isDark
                  ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-lg hover:shadow-neon-blue/25"
                  : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/25"
              } ${getCursorClasses(CURSOR_STATES.BUTTON(loading))}`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <FiSave className="text-lg" />
                  Publish Blog
                </>
              )}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateBlog;
