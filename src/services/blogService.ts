import { supabase } from "../supabase/config";
import { type Blog, type CreateBlogData } from "../types/index";

// Temporarily comment out image upload function
// const uploadImage = async (file: File): Promise<string> => {
//   const imageRef = ref(storage, `blog-images/${Date.now()}-${file.name}`);
//   const snapshot = await uploadBytes(imageRef, file);
//   return await getDownloadURL(snapshot.ref);
// };

export const blogService = {
  async getBlogs(): Promise<Blog[]> {
    try {
      const response = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      const { data, error } = response;
      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return [];
    }
  },

  async getBlogById(id: string): Promise<Blog | null> {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching blog:", error);
      return null;
    }
  },

  async createBlog(blogData: CreateBlogData): Promise<Blog> {
    try {
      const newBlog = {
        title: blogData.title,
        content: blogData.content,
        author: "Current User",
        tags: blogData.tags,
        read_time: Math.ceil(blogData.content.split(" ").length / 200),
        likes: 0,
        views: 0,
      };

      const { data, error } = await supabase
        .from("blogs")
        .insert([newBlog])
        .select()
        .single();

      if (error) throw error;
      return { ...data, image: undefined };
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },

  async updateBlog(
    id: string,
    blogData: Partial<CreateBlogData>
  ): Promise<Blog | null> {
    try {
      const updateData = {
        ...blogData,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("blogs")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating blog:", error);
      return null;
    }
  },

  async deleteBlog(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting blog:", error);
      return false;
    }
  },

  async searchBlogs(searchQuery: string): Promise<Blog[]> {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .or(
          `title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,tags.cs.{${searchQuery}}`
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error searching blogs:", error);
      return [];
    }
  },

  async getRelatedBlogs(
    currentBlogId: string,
    limit: number = 3
  ): Promise<Blog[]> {
    try {
      const currentBlog = await this.getBlogById(currentBlogId);
      if (!currentBlog) return [];

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .neq("id", currentBlogId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const relatedBlogs = (data || [])
        .filter((blog) =>
          blog.tags.some((tag: string) => currentBlog.tags.includes(tag))
        )
        .slice(0, limit);

      return relatedBlogs;
    } catch (error) {
      console.error("Error fetching related blogs:", error);
      return [];
    }
  },

  async likeBlog(blogId: string): Promise<boolean> {
    try {
      const { data: blog, error: fetchError } = await supabase
        .from("blogs")
        .select("likes")
        .eq("id", blogId)
        .single();

      if (fetchError || !blog) return false;

      const { error } = await supabase
        .from("blogs")
        .update({
          likes: (blog.likes || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", blogId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error liking blog:", error);
      return false;
    }
  },

  async unlikeBlog(blogId: string): Promise<boolean> {
    try {
      const { data: blog, error: fetchError } = await supabase
        .from("blogs")
        .select("likes")
        .eq("id", blogId)
        .single();

      if (fetchError || !blog) return false;

      const newLikes = Math.max(0, (blog.likes || 0) - 1);

      const { error } = await supabase
        .from("blogs")
        .update({
          likes: newLikes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", blogId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error unliking blog:", error);
      return false;
    }
  },
};
