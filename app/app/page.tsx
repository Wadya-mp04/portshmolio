import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
// The terminal now lives in Hero's right column, which carries the #about
// anchor. Restoring this section means removing that anchor from Hero, or two
// elements would share one id.
// import About from '@/components/About';
import ExperienceSection from '@/components/ExperienceSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
// import SudokuSection from '@/components/Sudoku/SudokuSection';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* <About /> */}
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        {/* <SudokuSection /> */}
      </main>

      {/* Outside <main> on purpose: as the contentinfo landmark it is site
          furniture rather than page content. Nav still reaches it by #contact. */}
      <ContactSection />
    </>
  );
}