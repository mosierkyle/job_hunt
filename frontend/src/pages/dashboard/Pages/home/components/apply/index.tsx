import React from 'react';
import styles from './page.module.css';

const Apply: React.FC = () => {
  return (
    <div className={styles.apply}>
      <h1 className={styles.header}>Yet to apply</h1>
      <div className={styles.content}></div>
    </div>
  );
};

export default Apply;
