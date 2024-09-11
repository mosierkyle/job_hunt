import React from 'react';
import styles from './page.module.css';
import { useState, useCallback } from 'react';
import useConnections from '../../../../hooks/useConnections';
import { Connection } from '../../../../types/global';
import AddConnection from '../../components/addConneciton';
import { useConnectionUpdater, TableHeader, ConnectionRow } from './utils';
import {
  // MdOutlinePersonOutline,
  MdOutlineLocalPostOffice,
  MdDomain,
  MdOutlineQuestionAnswer,
  MdOutlineSync,
  MdOutlineEditNote,
  MdOutlineAdd,
  MdOutlineAccountCircle,
  MdOutlineFilterList,
  // MdOutlineSort,
  MdImportExport,
  // MdOutlineCorporateFare,
  // MdOutlineSyncAlt,
} from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';

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
  const [showFilterPopup, setShowFilterPopup] = useState(false);

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

  const emptyRows = 25 - connections.length;

  return (
    <div className={styles.connections}>
      <div className={styles.title}>
        <h1 className={styles.h1}>Connections</h1>
        <p className={styles.sub}>Manage your network</p>
      </div>
      <div className={styles.edit}>
        {showAddForm && <AddConnection onAdd={handleAddConnection} />}
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            value={filterText}
            onChange={handleFilter}
            placeholder="Search by name"
            className={styles.searchBar}
          />
        </div>
        <div className={styles.sortWrapper}>
          <MdImportExport className={styles.sortIcon} />
          <select
            className={styles.sortDropdown}
            onChange={(e) => handleSort(e.target.value as keyof Connection)}
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="company">Company</option>
            <option value="connected">Connected</option>
            <option value="talked">Talked</option>
            <option value="referral">Referral</option>
          </select>
        </div>

        {/* Filter Button */}
        <button
          className={styles.filterButton}
          onClick={() => setShowFilterPopup(!showFilterPopup)}
        >
          <MdOutlineFilterList className={styles.buttonIconFilter} />
          Filter Options
        </button>
        <button
          className={!showAddForm ? styles.addConnection : styles.addConnection2}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {!showAddForm && <MdOutlineAdd className={styles.buttonIcon} />}
          {showAddForm ? 'Cancel' : 'Connection'}
        </button>
      </div>
      <div className={styles.tableDiv}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headers}>
              <th className={styles.header}>
                <MdOutlineAccountCircle className={styles.icon} />
                <TableHeader field="name" label="Name" onSort={handleSort} />
              </th>
              <th className={styles.header}>
                <MdDomain className={styles.icon} />
                <TableHeader field="company" label="Company" onSort={handleSort} />
              </th>
              <th className={styles.header}>
                <MdOutlineLocalPostOffice className={styles.icon} />
                <th className={styles.th}>Connected</th>
              </th>
              <th className={styles.header}>
                <MdOutlineQuestionAnswer className={styles.icon} />
                <th className={styles.th}>Talked</th>
              </th>
              <th className={styles.header}>
                <MdOutlineSync className={styles.icon} />
                <th className={styles.th}>Referral</th>
              </th>
              <th className={styles.header}>
                <MdOutlineEditNote className={styles.icon} />
                <th className={styles.th}>Actions</th>
              </th>
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
            {Array.from({ length: emptyRows > 0 ? emptyRows : 0 }).map((_, index) => (
              <tr key={`empty-row-${index}`} className={styles.row}>
                <td className={styles.elementLeft}>&nbsp;</td>
                <td className={styles.element}>&nbsp;</td>
                <td className={styles.element}>&nbsp;</td>
                <td className={styles.element}>&nbsp;</td>
                <td className={styles.element}>&nbsp;</td>
                <td className={styles.elementRight}>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(Connections);
