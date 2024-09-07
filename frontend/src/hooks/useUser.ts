import { useState, useCallback, useEffect } from 'react';
import Authentication from '../utils/auth';
import { User } from '../types/global';
import instance from '../utils/tokens';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await instance.get('/users/me/');
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user details');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const updateUser = async (userData: Partial<User>) => {
    try {
      const response = await instance.patch('/users/me/', userData);
      setUser(response.data);
      return response.data;
    } catch (err) {
      setError('Failed to update user');
      throw err;
    }
  };

  const deleteUser = async () => {
    try {
      await instance.delete('/users/me/');
      setUser(null);
      Authentication.logout();
    } catch (err) {
      setError('Failed to delete user');
      throw err;
    }
  };

  return { user, loading, error, updateUser, deleteUser };
};

export default useUser;
