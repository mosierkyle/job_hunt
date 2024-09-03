import React from 'react';
import styles from './page.module.css';

interface ButtonProps {
  text: string;
  fontSize: number;
}

const Button: React.FC<ButtonProps> = ({ text, fontSize = 16 }) => {
  return (
    <>
      <button style={{ fontSize: `${fontSize}px` }} className={styles.button}>
        {text}
      </button>
    </>
  );
};

export default Button;
