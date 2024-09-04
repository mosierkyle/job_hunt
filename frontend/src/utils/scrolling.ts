import { scroller } from 'react-scroll';
import { ActiveSection } from '../types/global';

export const scrollToSection = (section: ActiveSection) => {
  scroller.scrollTo(section, {
    duration: 800,
    delay: 0,
    smooth: 'easeInOutQuart',
    offset: -56,
  });
};
