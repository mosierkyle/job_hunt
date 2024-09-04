import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Authentication from './auth';

export interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = (initialState: { [key: string]: string }) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validateForm = (fields: string[]) => {
    const newErrors: FormErrors = {};
    fields.forEach((field) => {
      if (!values[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (fields.includes('email') && values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (fields.includes('password') && values.password && values.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (fields.includes('confirmPassword') && values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validateForm, setErrors };
};

export const useAuth = () => {
  const navigate = useNavigate();

  const handleLogin = async (
    email: string,
    password: string,
    setErrors: (errors: FormErrors) => void,
  ) => {
    try {
      await Authentication.login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error', error);
      setErrors({ form: 'Invalid email or password' });
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    setErrors: (errors: FormErrors) => void,
  ) => {
    try {
      await Authentication.register(email, password, firstName, lastName);
      navigate('/login');
    } catch (error) {
      console.error('Registration error', error);
      setErrors({ form: 'Registration failed. Please try again.' });
    }
  };

  return { handleLogin, handleRegister };
};
