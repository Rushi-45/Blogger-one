# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login with your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: blogger-one
   - **Database Password**: (choose a strong password)
   - **Region**: Choose closest to your location
6. Click "Create new project"

## 2. Get Your Project Credentials

1. Once your project is ready, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with https://)
   - **Project API Key** (anon/public key)

## 3. Create Environment Variables

**Option 1: Use the template file**

1. Copy `env.template` to `.env.local`
2. Replace the placeholder values with your actual Supabase credentials

**Option 2: Create manually**
Create a `.env.local` file in your project root with:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important:** Make sure `.env.local` is in your `.gitignore` file to keep your API keys secure!

## 4. Set Up Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Create blogs table
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Current User',
  tags TEXT[] DEFAULT '{}',
  image TEXT,
  read_time INTEGER DEFAULT 5,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table for user management
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for blogs
-- Anyone can read blogs
CREATE POLICY "Anyone can read blogs" ON blogs
  FOR SELECT USING (true);

-- Only authenticated users can create blogs
CREATE POLICY "Only authenticated users can create blogs" ON blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated users can update blogs
CREATE POLICY "Only authenticated users can update blogs" ON blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Only authenticated users can delete blogs
CREATE POLICY "Only authenticated users can delete blogs" ON blogs
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 5. Enable Authentication

1. Go to **Authentication** → **Settings**
2. Configure your site URL: `http://localhost:5173`
3. Add redirect URLs: `http://localhost:5173/**`
4. Enable email confirmations (optional)

## 6. Test Your Setup

After completing the above steps, your app should work with Supabase authentication!
