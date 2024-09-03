import React from 'react';
import styles from './page.module.css';
import Button from '../button';
import useTypingAnimation from '../../../../hooks/useTypingAnimation';
import hero1 from '../../../../files/hero1.jpg';

const Hero: React.FC = () => {
  const fullText = 'ACHIEVE YOUR CAREER GOALS.';
  const { text, showCursor } = useTypingAnimation({
    fullText,
    typingSpeed: 100,
    repeatDelay: 10000, // Set to null if you don't want it to repeat
  });
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroText}>
        {text}
        {showCursor && <span className={styles.cursor}>|</span>}
      </h1>
      <h3 className={styles.heroSecondaryText}>
        From Application to Offer. JobHunt is your all in one tool for a successful job search.
      </h3>
      <Button fontSize={18} text="Get Started"></Button>
      <div className={styles.imgDiv}>
        <img className={styles.img} src={hero1} alt="" />
      </div>
    </div>
  );
};

export default Hero;
