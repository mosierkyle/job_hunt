import React from 'react';
import styles from './page.module.css';
import { ActiveSection } from '../../../../types/global';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  activeSection: ActiveSection;
  onNavClick: (section: ActiveSection) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeSection, onNavClick }) => {
  const sections: ActiveSection[] = ['Features', 'About', 'Blog', 'Support'];
  const navigate = useNavigate();

  const handleNavigate = (location: string) => {
    navigate(location);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link className={styles.logoText} to="Hero" smooth={true} duration={500}>
          JobHunt
        </Link>
      </div>
      <ul className={styles.links}>
        {sections.map((section) => {
          return (
            <li key={section} className={styles.link}>
              <button
                style={{
                  backgroundColor: activeSection === section ? '#f7f6f3' : '#fff',
                }}
                className={styles.linkButton}
                onClick={() => onNavClick(section)}
              >
                {section}
                {/* {activeSection === section && <div className={styles.activeLink}></div>} */}
              </button>
            </li>
          );
        })}
      </ul>
      <div className={styles.user}>
        <button onClick={() => handleNavigate('login')} className={styles.login}>
          Log in
        </button>
        <button onClick={() => handleNavigate('register')} className={styles.signup}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
