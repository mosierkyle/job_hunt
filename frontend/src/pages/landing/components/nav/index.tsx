import React from 'react';
import styles from './page.module.css';

const NavBar: React.FC = () => {
  const handleClick = (): void => {
    console.log('nav button clicked');
  };

  return (
    <div className={styles.nav}>
      <div className={styles.logo}>
        <p>JobHunt</p>
      </div>
      <div className={styles.links}>
        <div onClick={() => handleClick()} className={styles.link}>
          Features
        </div>
        <div onClick={() => handleClick()} className={styles.link}>
          Pricing
        </div>
        <div onClick={() => handleClick()} className={styles.link}>
          Blog
        </div>
        <div onClick={() => handleClick()} className={styles.link}>
          Careers
        </div>
        <div onClick={() => handleClick()} className={styles.link}>
          Support
        </div>
      </div>
      <div className={styles.user}></div>
    </div>
  );
};

export default NavBar;
