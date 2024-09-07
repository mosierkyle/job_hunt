import React from 'react';
import styles from './page.module.css';
import useInterviews from '../../../../hooks/useInterviews';

const Interviews: React.FC = () => {
  const { interviews, loading, error, updateInterview, deleteInterview } = useInterviews();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.interviews}>
      <p>Interviews Page</p>
      {interviews.map((interview) => (
        <div key={interview.id}>
          <h3>
            {interview.type} interview for Job ID: {interview.job}
          </h3>
          <p>Status: {interview.status}</p>
          <p>Date: {new Date(interview.date).toLocaleString()}</p>
          <button onClick={() => updateInterview(interview.id, { status: 'Past' })}>
            Mark as Past
          </button>
          <button onClick={() => deleteInterview(interview.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Interviews;
