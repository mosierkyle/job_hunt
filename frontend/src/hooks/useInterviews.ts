import { useState, useCallback, useEffect } from 'react';
import { Interview } from '../types/global';
import instance from '../utils/tokens';

const useInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInterviews = useCallback(async () => {
    try {
      const response = await instance.get('/interviews/');
      setInterviews(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch interviews');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  const createInterview = async (interviewData: Omit<Interview, 'id' | 'user'>) => {
    try {
      const response = await instance.post('/interviews/', interviewData);
      setInterviews([...interviews, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create interview');
      throw err;
    }
  };

  const updateInterview = async (interviewId: number, interviewData: Partial<Interview>) => {
    try {
      const response = await instance.patch(`/interviews/${interviewId}/`, interviewData);
      setInterviews(
        interviews.map((interview) => (interview.id === interviewId ? response.data : interview)),
      );
      return response.data;
    } catch (err) {
      setError('Failed to update interview');
      throw err;
    }
  };

  const deleteInterview = async (interviewId: number) => {
    try {
      await instance.delete(`/interviews/${interviewId}/`);
      setInterviews(interviews.filter((interview) => interview.id !== interviewId));
    } catch (err) {
      setError('Failed to delete interview');
      throw err;
    }
  };

  return { interviews, loading, error, createInterview, updateInterview, deleteInterview };
};

export default useInterviews;
