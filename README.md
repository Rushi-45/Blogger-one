# Blogger One 🚀

A modern, futuristic blogging platform built with React, TypeScript, and cutting-edge web technologies. Share your stories, ideas, and insights with a beautiful, responsive interface designed for the future.

## ✨ Features

### 🎨 Design & UI

- **Futuristic Theme**: Modern design with gradients, neon accents, and smooth transitions
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Responsive Design**: Mobile-first approach that looks great on all devices
- **Glass Morphism**: Beautiful glassmorphism effects and backdrop blur
- **Custom Cursor States**: DRY-compliant cursor management using Tailwind utilities

### 🎭 Animations

- **Framer Motion**: Smooth page transitions and micro-interactions
- **Hover Effects**: Interactive elements with scale and glow effects
- **Loading States**: Beautiful loading animations and skeleton screens
- **Scroll Animations**: Elements animate in as you scroll

### 📝 Core Features

- **Blog Management**: Create, read, update, and delete blog posts
- **Image Upload**: Support for featured images with preview
- **Tag System**: Organize posts with custom tags
- **Search Functionality**: Find posts by title, content, or tags
- **Related Posts**: Smart suggestions for related content
- **Reading Time**: Automatic calculation of estimated reading time

### 🔧 Technical Features

- **TypeScript**: Full type safety throughout the application
- **React Router**: Client-side routing with nested routes
- **Context API**: Theme management and state sharing
- **Mock API**: Simulated backend with realistic delays
- **SEO Optimized**: Meta tags, structured data, and performance optimization
- **Toast Notifications**: User feedback for all actions

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **SEO**: React Helmet
- **HTTP Client**: Axios (ready for backend integration)

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd blogger-one
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Blogs.tsx       # Blog listing page
│   ├── CreateBlog.tsx  # Blog creation form
│   ├── BlogDetail.tsx  # Individual blog post
│   └── About.tsx       # About page
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Theme management
├── services/           # API services
│   └── blogService.ts  # Mock blog API
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types
├── utils/              # Utility functions
│   └── cursorUtils.ts  # Cursor state management
└── hooks/              # Custom React hooks
```

## 🎨 Design System

### Colors

- **Primary**: Blue gradient palette
- **Neon Accents**: Blue, purple, pink, green
- **Dark Theme**: Custom dark color palette
- **Gradients**: Smooth color transitions

### Typography

- **Primary Font**: Inter (system fonts)
- **Display Font**: Poppins
- **Responsive**: Fluid typography scaling

### Cursor States

The project implements a DRY-compliant cursor state management system:

```typescript
// Available cursor states
CURSOR_STATES.BUTTON(isLoading, isDisabled);
CURSOR_STATES.LINK(isDisabled);
CURSOR_STATES.CARD(isClickable);
CURSOR_STATES.DRAGGABLE(isDragging);
CURSOR_STATES.LOADING();
CURSOR_STATES.DISABLED();
```

## 🔧 Customization

### Theme Configuration

Edit `tailwind.config.js` to customize:

- Color palette
- Font families
- Animation keyframes
- Cursor utilities

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/Navbar.tsx`

### Styling Guidelines

- Use Tailwind utility classes
- Follow the cursor state management system
- Maintain responsive design principles
- Use the established color palette

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- All the open-source contributors

---

**Built with ❤️ by the Blogger One team**
