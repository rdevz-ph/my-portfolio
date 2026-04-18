# Professional Portfolio with Admin Panel

A comprehensive Next.js portfolio website featuring a professional admin panel for content management. Built with modern web technologies and optimized for performance, accessibility, and clean design.

## Features

### Portfolio Website
- Responsive Design: Fully optimized for mobile, tablet, and desktop environments.
- Modern Dark Mode: Refined Zinc-based deep charcoal palette with smooth transitions.
- High-Performance UI: Powered by shadcn/ui components for consistency and accessibility.
- Project Showcase: Advanced grid layout with support for pinned featured projects and tech stacks.
- Professional Timeline: Detailed work experience display with automatic formatting.
- Interactive Skills: Dynamic skill showcase using modern badges and icons.
- Integrated Contact: Functional contact form powered by Formspree.
- Visitor Analytics: Integration with GoatCounter for privacy-friendly tracking.
- Search Engine Optimization: Comprehensive meta tags and structured data for better visibility.

### Admin Panel (Development Mode)
- Unified Dashboard: Centralized management using a tabbed interface.
- Project Management: Full CRUD operations with image and technology metadata.
- Career History: Timeline management with support for current and past positions.
- Skill Inventory: Individual and bulk operations for technical competency management.
- Configuration: Real-time updates for personal information, statistics, and system paths.
- Local Access: Direct access during development without complex authentication requirements.

## Tech Stack

### Core Frameworks
- Next.js 15.3.5: React framework with Server-Side Rendering and Static Site Generation.
- React 19: Latest version utilizing modern hooks and patterns.
- Tailwind CSS 4: Next-generation utility-first CSS framework.
- shadcn/ui: Accessible and customizable component primitives.

### Libraries and Integrations
- Lucide React: Modern and consistent icon set.
- AOS: Animate On Scroll for subtle entry effects.
- SweetAlert2: Professional feedback and confirmation modals.
- Formspree: Reliable contact form backend services.
- GoatCounter: Privacy-first web analytics.

## Project Structure

```
my-portfolio/
├── components/           # UI and Feature components
│   ├── ui/               # shadcn/ui primitives
│   ├── CodeShowcase.js   # Project architecture display
│   ├── ContactSection.js # Contact implementation
│   ├── Navbar.js         # Navigation with Sheet (mobile)
│   ├── ProjectsGrid.js   # Advanced project display
│   └── ...               # Additional feature components
├── data/                 # JSON-based content storage
│   ├── projects.json     # Project metadata
│   ├── settings.json     # Configuration and profile data
│   └── work.json         # Career history
├── lib/                  # Utilities and helpers
│   ├── utils.js          # Tailwind class merging
│   └── seo.js            # Metadata generation
├── pages/                # Next.js routing
│   ├── index.js          # Main portfolio
│   ├── admin.js          # Management dashboard
│   └── api/              # Local content APIs
└── styles/
    └── globals.css       # Core theme and shadcn variables
```

## Installation and Setup

### Prerequisites
- Node.js 18 or higher
- Package manager (npm, yarn, pnpm, or bun)

### Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/rdevz-ph/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access points:
   - Portfolio: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## Deployment

### Vercel (Recommended)
1. Push your repository to GitHub.
2. Connect your repository to Vercel.
3. The platform will automatically detect Next.js settings and deploy.

### Static Export
- Use `npm run build` followed by `npm run export` for static hosting providers.

## Content Configuration

### Portfolio Data
Content is managed via JSON files in the `data/` directory. While these can be edited manually, the Admin Panel provides a visual interface for all operations during development.

### Services Setup
- Contact Form: Update the endpoint in `ContactSection.js` with your Formspree ID.
- Analytics: Configure your GoatCounter code in `lib/getGoatCounterViews.js`.

## Contributing
Contributions are welcome. Please follow the standard workflow:
1. Fork the project.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Author
Romel Brosas
- Portfolio: https://romel-portfolio.vercel.app
- GitHub: @rdevz-ph
- Email: brosasromel01@gmail.com

---
Star this repository if you find it useful.
