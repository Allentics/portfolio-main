import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { getSiteContent } from "./lib/db";

export default async function Home() {
  const { settings, skills, services, projects } = await getSiteContent();

  const socialLinks = {
    github: settings.social_github,
    linkedin: settings.social_linkedin,
    twitter: settings.social_twitter
  };

  return (
    <>
      <Navbar sitename={settings.site_name} />
      <main>
        <Hero content={{
          welcome: settings.hero_welcome,
          name: settings.hero_name,
          subtitle: settings.hero_subtitle,
          imageUrl: settings.hero_image_url
        }} />
        <About content={{
          title: settings.about_title,
          bio1: settings.about_bio_1,
          bio2: settings.about_bio_2,
          skills: skills,
          imageUrl: settings.profile_image_url
        }} />
        <Services content={{
          headerTitle: settings.services_header_title,
          headerSubtitle: settings.services_header_subtitle,
          headerDescription: settings.services_header_description,
          services: services
        }} />
        <Projects content={{
          headerTitle: settings.projects_header_title,
          headerSubtitle: settings.projects_header_subtitle,
          headerDescription: settings.projects_header_description,
          projects: projects
        }} />
        <Contact socialLinks={socialLinks} />
      </main>
      <Footer
        sitename={settings.site_name}
        description={settings.footer_description}
        socialLinks={socialLinks}
      />
    </>
  );
}
