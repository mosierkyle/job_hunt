import React from 'react';
import styles from './page.module.css';
import useJobs from '../../../../hooks/useJobs';

const Jobs: React.FC = () => {
  const { jobs, loading, error, updateJob, deleteJob } = useJobs();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.jobs}>
      <p>Jobs Page</p>

      {jobs.map((job) => (
        <div key={job.id}>
          <h3>
            {job.title} at {job.company}
          </h3>
          <p>Status: {job.status}</p>
          <button onClick={() => updateJob(job.id, { status: 'Interviewing' })}>
            Mark as Interviewing
          </button>
          <button onClick={() => deleteJob(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
