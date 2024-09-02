import React from 'react';
import styles from './page.module.css';
import Button from '../button';

const Hero: React.FC = () => {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroText}>ACHIEVE YOUR CAREER GOALS</h1>
      <h3 className={styles.heroSecondaryText}>
        From Application to Offer. JobHunt is your all in one tool for a successful job search.
      </h3>
      <Button fontSize={16} text="Get Started"></Button>
    </div>
  );
};

export default Hero;
