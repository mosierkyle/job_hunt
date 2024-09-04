import React from 'react';
import styles from './page.module.css';
import { useFormValidation, useAuth } from '../../utils/formValidation';

const Registration: React.FC = () => {
  const { values, errors, handleChange, validateForm, setErrors } = useFormValidation({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const { handleRegister } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(['email', 'password', 'confirmPassword', 'firstName', 'lastName'])) {
      await handleRegister(
        values.email,
        values.password,
        values.firstName,
        values.lastName,
        setErrors,
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Register</h2>
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
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            className={styles.input}
            required
          />
          {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
        {errors.form && <span className={styles.error}>{errors.form}</span>}
      </form>
    </div>
  );
};

export default Registration;
