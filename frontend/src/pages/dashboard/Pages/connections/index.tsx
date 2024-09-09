import React from 'react';
// import styles from './page.module.css';
import { useState, useCallback } from 'react';
import useConnections from '../../../../hooks/useConnections';
import { Connection } from '../../../../types/global';
import AddConnection from '../../components/addConneciton';
import { useConnectionUpdater, TableHeader, ConnectionRow } from './utils';

const Connections: React.FC = () => {
  const {
    connections,
    loading,
    error,
    createConnection,
    updateConnection,
    deleteConnection,
    setSort,
    setFilter,
  } = useConnections();

  const [showAddForm, setShowAddForm] = useState(false);
  const [filterText, setFilterText] = useState('');

  const handleAddConnection = useCallback(
    async (newConnection: Omit<Connection, 'id' | 'user'>) => {
      await createConnection(newConnection);
      setShowAddForm(false);
    },
    [createConnection],
  );

  const handleUpdateConnection = useConnectionUpdater(updateConnection);

  const handleDeleteConnection = useCallback(
    async (id: number) => {
      try {
        await deleteConnection(id);
      } catch (err) {
        console.error('Failed to delete connection:', err);
      }
    },
    [deleteConnection],
  );

  const handleSort = useCallback(
    (field: keyof Connection) => {
      setSort(field);
    },
    [setSort],
  );

  const handleFilter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFilterText(value);
      setFilter({ name: value });
    },
    [setFilter],
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Connections</h1>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Cancel' : 'Add Connection'}
      </button>
      {showAddForm && <AddConnection onAdd={handleAddConnection} />}
      <input type="text" value={filterText} onChange={handleFilter} placeholder="Filter by name" />
      <table>
        <thead>
          <tr>
            <TableHeader field="name" label="Name" onSort={handleSort} />
            <TableHeader field="company" label="Company" onSort={handleSort} />
            <th>Connected</th>
            <th>Talked</th>
            <th>Referral</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {connections.map((connection) => (
            <ConnectionRow
              key={connection.id}
              connection={connection}
              onUpdate={handleUpdateConnection}
              onDelete={handleDeleteConnection}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Connections);
