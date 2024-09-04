import React from 'react';
import styles from './page.module.css';
import { useFormValidation, useAuth } from '../../utils/formValidation';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { values, errors, handleChange, validateForm, setErrors } = useFormValidation({
    email: '',
    password: '',
  });
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm(['email', 'password'])) {
      await handleLogin(values.email, values.password, setErrors);
    }
  };

  const handleNavigate = (location: string) => {
    navigate(location);
  };

  return (
    <div className={styles.formPage}>
      <div className={styles.formContainer}>
        <div className={styles.formHeading}>
          <h2 className={styles.formTitle}>Welcome Back</h2>
          <p className={styles.subHeader}>Log in to your JobHunt account </p>
        </div>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              // type="email"
              value={values.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your email address"
            />
            {errors.email && <span className={styles.error}>*{errors.email}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your email password"
              value={values.password}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.password && <span className={styles.error}>*{errors.password}</span>}
            <div className={styles.forgot}>Forgot Password</div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
          {errors.form && <span className={styles.error}>{errors.form}</span>}
          <p className={styles.already}>
            Dont have an account?{' '}
            <span onClick={() => handleNavigate('/register')} className={styles.alreadyLink}>
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
