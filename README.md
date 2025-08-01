# 🚀 Modern Portfolio with Admin Panel

A comprehensive **Next.js portfolio website** featuring a powerful admin panel for content management. Built with modern web technologies and designed for developers who want full control over their portfolio content.

## ✨ Features

### 🎨 **Portfolio Website**
- **Responsive Design** - Looks great on all devices
- **Dark/Light Theme** - Automatic theme switching with toggle
- **Smooth Animations** - AOS (Animate On Scroll) integration
- **Project Showcase** - Grid layout with pinned projects
- **Work Timeline** - Professional work experience display
- **Skills Section** - Technical skills with modern design
- **Contact Form** - Integrated with Formspree
- **Analytics** - GoatCounter integration for visitor tracking
- **SEO Optimized** - Meta tags and optimized structure

### 🛠️ **Admin Panel** (Development Only)
- **Projects Management** - CRUD operations with image/tech management
- **Work Experience** - Timeline management with current position support
- **Skills Management** - Add/edit/delete skills with bulk operations
- **Portfolio Settings** - Personal info, statistics, and file paths
- **Password Protection** - Simple authentication for local development
- **Auto-scroll Forms** - Smooth UX when editing content
- **Real-time Updates** - Changes reflect immediately

## 🛠️ Tech Stack

### **Frontend**
- **[Next.js 15.3.5](https://nextjs.org/)** - React framework with SSG
- **[React 19](https://react.dev/)** - Latest React with modern hooks
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful modern icons

### **Libraries & Integrations**
- **[AOS 2.3.4](https://michalsnik.github.io/aos/)** - Animate On Scroll library
- **[SweetAlert2](https://sweetalert2.github.io/)** - Beautiful alert/modal system
- **[Formspree](https://formspree.io/)** - Contact form backend
- **[GoatCounter](https://www.goatcounter.com/)** - Privacy-friendly analytics

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **Node.js File System** - JSON-based content management

## 📁 Project Structure

```
my-portfolio/
├── components/           # React components
│   ├── CodeShowcase.js  # Code display component
│   ├── ContactSection.js # Contact form
│   ├── FolderTreeView.js # File tree display
│   ├── Footer.js        # Site footer
│   ├── Loader.js        # Loading animation
│   ├── Navbar.js        # Navigation header
│   ├── ProfileCard.js   # Profile information
│   ├── ProjectsGrid.js  # Projects showcase
│   ├── ScrollToTop.js   # Scroll utility
│   ├── StatsBox.js      # Statistics display
│   ├── TechStack.js     # Skills showcase
│   ├── ThemeToggle.js   # Dark/light mode
│   ├── WorkTimeline.js  # Work experience
│   ├── ProjectAdmin.js  # Projects management
│   ├── SettingsAdmin.js # Settings management
│   ├── WorkAdmin.js     # Work experience management
│   └── SkillsAdmin.js   # Skills management
├── data/                # JSON data files
│   ├── projects.json    # Portfolio projects
│   ├── settings.json    # Site configuration
│   ├── skills.json      # Technical skills
│   └── work.json        # Work experience
├── lib/                 # Utility functions
│   └── getGoatCounterViews.js # Analytics helper
├── pages/               # Next.js pages
│   ├── _app.js         # App configuration
│   ├── _document.js    # HTML document structure
│   ├── index.js        # Homepage
│   ├── admin.js        # Admin panel
│   └── api/            # API endpoints
│       ├── hello.js    # Example API
│       ├── projects.js # Projects CRUD API
│       ├── settings.js # Settings API
│       ├── work.js     # Work experience API
│       └── skills.js   # Skills API
├── public/             # Static assets
│   ├── images/         # Profile and UI images
│   └── projects/       # Project screenshots
└── styles/
    └── globals.css     # Global styles
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/rdevz-ph/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   - Portfolio: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### **Admin Panel Access**
- **Password**: `admin123` (change in `pages/admin.js`)
- **Development Only**: Admin panel only works in development mode
- **Features**: Manage projects, work experience, skills, and settings

## 📝 Content Management

### **Portfolio Data Files**

#### **`data/projects.json`**
```json
{
  "title": "Project Name",
  "description": "Project description",
  "image": "/projects/screenshot.png",
  "technologies": ["React", "Next.js", "Tailwind"],
  "url": "https://project-url.com",
  "isPinned": false
}
```

#### **`data/settings.json`**
```json
{
  "full_name": "Your Name",
  "position": "Your Title",
  "description": "Your bio",
  "system_logo": "/images/profile.jpg",
  "system_cv_path": "/files/cv.pdf",
  "years_of_experience": 2,
  "visitor_count": 156,
  "client_count": 13
}
```

#### **`data/work.json`**
```json
{
  "title": "Job Title",
  "company": "Company Name",
  "start_date": "2023-01-01",
  "end_date": null,
  "description": "Job description and achievements"
}
```

#### **`data/skills.json`**
```json
["HTML", "CSS", "JavaScript", "React", "Next.js"]
```

## 🎨 Customization

### **Colors & Theme**
- **Primary**: Purple (`#8b5cf6`)
- **Dark Mode**: Gray scale palette
- **Customize**: Edit `tailwind.config.js` and `globals.css`

### **Adding Projects**
1. Use admin panel at `/admin`
2. Or manually edit `data/projects.json`
3. Add project images to `public/projects/`

### **Contact Form**
- **Setup**: Create account at [Formspree](https://formspree.io/)
- **Configure**: Update form action in `ContactSection.js`

### **Analytics**
- **Setup**: Create account at [GoatCounter](https://www.goatcounter.com/)
- **Configure**: Update settings in `lib/getGoatCounterViews.js`

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push code to GitHub
2. Import project to [Vercel](https://vercel.com/)
3. Deploy automatically

### **Other Platforms**
- **Netlify**: `npm run build` + `npm run export`
- **GitHub Pages**: Static export with `next export`

### **Production Notes**
- Admin panel is **development-only** (disabled in production)
- Content updates require redeployment
- Static files are served from CDN

## 🔧 Configuration

### **Environment Variables** (Optional)
```env
# Analytics
NEXT_PUBLIC_GOATCOUNTER_CODE=your-code

# Contact Form
NEXT_PUBLIC_FORMSPREE_ID=your-form-id
```

### **Package Scripts**
```json
{
  "dev": "next dev",           # Development server
  "build": "next build",       # Production build
  "start": "next start",       # Production server
  "lint": "next lint",         # Code linting
  "export": "next export"      # Static export
}
```

## 📊 Admin Panel Features

### **Projects Management**
- ✅ Add/Edit/Delete projects
- ✅ Pin important projects (appear first)
- ✅ Image and technology management
- ✅ URL validation and previews

### **Work Experience**
- ✅ Timeline management
- ✅ Current position support (no end date)
- ✅ Company and role descriptions
- ✅ Date validation

### **Skills Management**
- ✅ Individual skill addition
- ✅ Bulk add multiple skills
- ✅ Inline editing
- ✅ Duplicate prevention

### **Portfolio Settings**
- ✅ Personal information
- ✅ File paths (images, CV)
- ✅ Statistics (experience, visitors, clients)
- ✅ Real-time change detection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Romel Brosas**
- Portfolio: [Your Portfolio URL]
- GitHub: [@rdevz-ph](https://github.com/rdevz-ph)
- Email: your.email@example.com

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Hosting and deployment platform
- **Open Source Community** - All the amazing libraries used

---

⭐ **Star this repository if you found it helpful!**
