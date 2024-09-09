import React, { useState } from 'react';
import { Connection } from '../../../../types/global';

interface AddConnectionProps {
  onAdd: (connection: Omit<Connection, 'id' | 'user'>) => Promise<void>;
}

const AddConnection: React.FC<AddConnectionProps> = ({ onAdd }) => {
  const [newConnection, setNewConnection] = useState<Omit<Connection, 'id' | 'user'>>({
    name: '',
    company: '',
    connected: false,
    talked: false,
    referral: false,
    link: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setNewConnection((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAdd(newConnection);
      setNewConnection({
        name: '',
        company: '',
        connected: false,
        talked: false,
        referral: false,
        link: '',
        notes: '',
      });
    } catch (error) {
      console.error('Failed to add connection:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={newConnection.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <input
        type="text"
        name="company"
        value={newConnection.company}
        onChange={handleInputChange}
        placeholder="Company"
      />
      <input
        type="url"
        name="link"
        value={newConnection.link}
        onChange={handleInputChange}
        placeholder="Link"
      />
      <textarea
        name="notes"
        value={newConnection.notes}
        onChange={handleInputChange}
        placeholder="Notes"
      />
      <label>
        <input
          type="checkbox"
          name="connected"
          checked={newConnection.connected}
          onChange={handleInputChange}
        />
        Connected
      </label>
      <label>
        <input
          type="checkbox"
          name="talked"
          checked={newConnection.talked}
          onChange={handleInputChange}
        />
        Talked
      </label>
      <label>
        <input
          type="checkbox"
          name="referral"
          checked={newConnection.referral}
          onChange={handleInputChange}
        />
        Referral
      </label>
      <button type="submit">Add Connection</button>
    </form>
  );
};

export default AddConnection;
