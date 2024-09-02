import React, { useState, useEffect } from 'react';
import NavBar from './components/nav';
import Features from './components/features';
import Hero from './components/hero';
import About from './components/about';
import { Element } from 'react-scroll';
import { ActiveSection } from '../../types/global';

const Landing: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('Hero');

  //User Scroll Functionality
  useEffect(() => {
    const sections: ActiveSection[] = ['Hero', 'Features', 'About'];
    const observers = sections.map((id) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.5 },
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
      <NavBar activeSection={activeSection}></NavBar>
      <Element name="Hero" id="Hero">
        <Hero />
      </Element>
      <Element name="Features" id="Features">
        <Features />
      </Element>
      <Element name="ABout" id="About">
        <About />
      </Element>
    </div>
  );
};

export default Landing;
