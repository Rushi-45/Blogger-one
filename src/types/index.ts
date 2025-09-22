/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "@supabase/supabase-js";

export interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  author: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  read_time: number;
  likes: number;
  views: number;
}

export interface CreateBlogData {
  title: string;
  content: string;
  image?: File;
  tags: string[];
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface CursorState {
  type: "default" | "pointer" | "wait" | "not-allowed" | "grab" | "grabbing";
  isLoading?: boolean;
  isDisabled?: boolean;
  isInteractive?: boolean;
}

export interface PageTransition {
  initial: any;
  animate: any;
  exit: any;
  transition: any;
}

export type AppUser = User & {
  profile?: {
    id: string;
    email: string;
    full_name: string;
    role: string;
    created_at?: string;
    updated_at?: string;
  };
};
