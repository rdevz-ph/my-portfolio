import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import ProjectsGrid from '@/components/ProjectsGrid';
import ProfileCard from '@/components/ProfileCard';
import StatsBox from '@/components/StatsBox';
import ScrollToTop from '@/components/ScrollToTop';
import WorkTimeline from '@/components/WorkTimeline';
import TechStack from '@/components/TechStack';
import { getGoatCounterViews } from '@/lib/getGoatCounterViews';
import { generateSEO, siteConfig } from '@/lib/seo';
import CodeShowcase from '@/components/CodeShowcase';

export async function getStaticProps() {
  const workPath = path.join(process.cwd(), 'data', 'work.json');
  const skillsPath = path.join(process.cwd(), 'data', 'skills.json');

  const experiences = JSON.parse(fs.readFileSync(workPath, 'utf-8'));
  const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));

  const projectPath = path.join(process.cwd(), 'data', 'projects.json');
  const settingsPath = path.join(process.cwd(), 'data', 'settings.json');

  const rawProjects = JSON.parse(fs.readFileSync(projectPath, 'utf-8'));
  // Reverse the array so latest entries appear first
  const projects = rawProjects.reverse();

  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

  const visitorCount = await getGoatCounterViews();
  settings.visitor_count = visitorCount;
  console.log('[GoatCounter] Visitor count:', visitorCount);

  return {
    props: { projects, settings, experiences, skills },
    revalidate: 60,
  };
}

export default function Home({ projects, settings, experiences, skills }) {
  // Generate SEO data dynamically
  const pageTitle = `${settings.full_name} - ${settings.position}`;
  const pageDescription = settings.description || siteConfig.description;
  const seo = generateSEO({
    title: pageTitle,
    description: pageDescription
  });  // Featured projects for structured data
  const featuredProjects = projects.filter(p => p.isPinned).slice(0, 3);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{seo.title}</title>
        <meta name="title" content={seo.title} />
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={[...siteConfig.keywords, ...skills.slice(0, 10)].join(', ')} />
        <meta name="author" content={settings.full_name} />
        <meta name="creator" content={settings.full_name} />

        {/* Canonical URL */}
        <link rel="canonical" href={seo.canonical} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:image:alt" content={`${settings.full_name} - Portfolio`} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seo.canonical} />
        <meta property="twitter:title" content={seo.title} />
        <meta property="twitter:description" content={seo.description} />
        <meta property="twitter:image" content={seo.ogImage} />
        <meta property="twitter:creator" content={siteConfig.author.twitter} />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />

        {/* Theme and App */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="color-scheme" content="light dark" />
        <meta name="apple-mobile-web-app-title" content={settings.full_name} />

        {/* Structured Data for Featured Projects */}
        {featuredProjects.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Featured Projects",
                "description": "Portfolio projects showcasing web development skills",
                "itemListElement": featuredProjects.map((project, index) => ({
                  "@type": "CreativeWork",
                  "position": index + 1,
                  "name": project.title,
                  "description": project.description,
                  "url": project.url,
                  "image": `${siteConfig.url}${project.image}`,
                  "creator": {
                    "@type": "Person",
                    "name": settings.full_name
                  },
                  "keywords": project.technologies?.join(', ')
                }))
              })
            }}
          />
        )}

        {/* WebSite Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": siteConfig.name,
              "description": seo.description,
              "url": siteConfig.url,
              "author": {
                "@type": "Person",
                "name": settings.full_name,
                "jobTitle": settings.position,
                "url": siteConfig.url
              }
            })
          }}
        />
      </Head>

      <main className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 pt-24">
          <section id="about">
            <ProfileCard settings={settings} />
            <StatsBox settings={settings} />
            <TechStack skills={skills} />
            <section id="about">
              <CodeShowcase />
              <WorkTimeline experiences={experiences} />
            </section>
          </section>

          <section id="projects">
            <ProjectsGrid projects={projects} />
          </section>
        </div>

        <section id="contact">
          <ContactSection />
        </section>
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
}
