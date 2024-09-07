import { useState, useCallback, useEffect } from 'react';
import { Job } from '../types/global';
import instance from '../utils/tokens';

const useJobs = () => {
  // eslint-disable-next-line prettier/prettier
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await instance.get('/jobs/');
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch jobs');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const createJob = async (jobData: Omit<Job, 'id' | 'user'>) => {
    try {
      const response = await instance.post('/jobs/', jobData);
      setJobs([...jobs, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create job');
      throw err;
    }
  };

  const updateJob = async (jobId: number, jobData: Partial<Job>) => {
    try {
      const response = await instance.patch(`/jobs/${jobId}/`, jobData);
      setJobs(jobs.map((job) => (job.id === jobId ? response.data : job)));
      return response.data;
    } catch (err) {
      setError('Failed to update job');
      throw err;
    }
  };

  const deleteJob = async (jobId: number) => {
    try {
      await instance.delete(`/jobs/${jobId}/`);
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (err) {
      setError('Failed to delete job');
      throw err;
    }
  };

  return { jobs, loading, error, createJob, updateJob, deleteJob };
};

export default useJobs;
