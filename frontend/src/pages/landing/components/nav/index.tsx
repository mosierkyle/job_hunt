import React from 'react';
import styles from './page.module.css';
import { ActiveSection } from '../../../../types/global';
import { Link } from 'react-scroll';

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
              <Link
                to={section}
                smooth={true}
                duration={500}
                style={{
                  textDecoration: activeSection === section ? 'underline' : 'none',
                  cursor: 'pointer',
                }}
              >
                {section}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={styles.user}>
        <div>Login</div>
        <div>Sign Up</div>
      </div>
    </nav>
  );
};

export default NavBar;
