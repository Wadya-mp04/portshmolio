import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
      </main>
    </>
  );
}