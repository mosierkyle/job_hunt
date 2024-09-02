import React from 'react';
import styles from './page.module.css';
import { ActiveSection } from '../../../../types/global';
import { Link } from 'react-scroll';
import Button from '../button';

interface NavBarProps {
  activeSection: ActiveSection;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection }) => {
  const sections = ['Features', 'About', 'Blog', 'Support'];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link to="Hero" smooth={true} duration={500}>
          JobHunt
        </Link>
      </div>
      <ul className={styles.links}>
        {sections.map((section) => {
          return (
            <li key={section} className={styles.link}>
              <Link to={section} smooth={true} duration={500}>
                {section}
                {activeSection === section && <div className={styles.activeLink}></div>}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={styles.user}>
        <div>Log in</div>
        <Button text="Sign Up" fontSize={12}></Button>
      </div>
    </nav>
  );
};

export default NavBar;
