import fs from 'fs';
import path from 'path';
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
  return (
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
  );
}
