import React from 'react';
import styles from './page.module.css';
import { useFormValidation, useAuth } from '../../utils/formValidation';

const Login: React.FC = () => {
  const { values, errors, handleChange, validateForm, setErrors } = useFormValidation({
    email: '',
    password: '',
  });
  const { handleLogin } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(['email', 'password'])) {
      await handleLogin(values.email, values.password, setErrors);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Login</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        {errors.form && <span className={styles.error}>{errors.form}</span>}
      </form>
    </div>
  );
};

export default Login;
