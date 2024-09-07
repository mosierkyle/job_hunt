import React from 'react';
import styles from './page.module.css';
import Apply from './components/apply';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <p className={styles.header}>Home Page</p>
      <Apply />
    </div>
  );
};

export default Home;
