import React, { useState, useEffect } from 'react';
import NavBar from './components/nav';
import Features from './components/features';
import Hero from './components/hero';
import About from './components/about';
import Blog from './components/blog';
import Support from './components/support';
import { Element } from 'react-scroll';
import { ActiveSection } from '../../types/global';
import { scrollToSection } from '../../utils/scrolling';
import Footer from './components/footer';

const Landing: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('Hero');

  //User Scroll Functionality
  useEffect(() => {
    const sections: ActiveSection[] = ['Hero', 'Features', 'About', 'Blog', 'Support'];
    const observers = sections.map((id) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: '-56px 0px 0px 0px', // Adjust for navbar height
        },
      );

      const element = document.getElementById(id);
      if (element) observer.observe(element);

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div>
      <NavBar activeSection={activeSection} onNavClick={scrollToSection}></NavBar>
      <Element name="Hero" id="Hero">
        <Hero />
      </Element>
      <Element name="Features" id="Features">
        <Features />
      </Element>
      <Element name="About" id="About">
        <About />
      </Element>
      <Element name="Blog" id="Blog">
        <Blog />
      </Element>
      <Element name="Support" id="Support">
        <Support />
      </Element>
      <Footer />
    </div>
  );
};

export default Landing;
