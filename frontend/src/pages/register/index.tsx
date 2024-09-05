import React from 'react';
import styles from './page.module.css';
import { useFormValidation, useAuth } from '../../utils/formValidation';
import { useNavigate } from 'react-router-dom';

const Registration: React.FC = () => {
  const { values, errors, handleChange, validateForm, setErrors } = useFormValidation({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

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

  const handleNavigate = (location: string) => {
    navigate(location);
  };

  return (
    <div className={styles.formPage}>
      <div onClick={() => handleNavigate('/')} className={styles.logo}>
        JobHunt
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formHeading}>
          <h2 className={styles.formTitle}>Register </h2>
          <p className={styles.subHeader}>Create a JobHunt account </p>
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.nameFormGroup}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.label}>
                First Name
              </label>
              <input
                id="firstName"
                placeholder="First name"
                name="firstName"
                type="text"
                value={values.firstName}
                onChange={handleChange}
                className={`${styles.input} ${styles.name}`}
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
                placeholder="Last name"
                type="text"
                value={values.lastName}
                onChange={handleChange}
                className={`${styles.input} ${styles.name}`}
                required
              />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
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
              placeholder="Enter password"
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
              placeholder="Confirm password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              required
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>
          <button type="submit" className={styles.submitButton}>
            Sign Up
          </button>
          {errors.form && <span className={styles.error}>{errors.form}</span>}
          <p className={styles.already}>
            Have an account already?{' '}
            <span onClick={() => handleNavigate('/login')} className={styles.alreadyLink}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
