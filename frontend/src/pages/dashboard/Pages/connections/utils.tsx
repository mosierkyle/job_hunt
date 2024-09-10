import React, { useMemo } from 'react';
import { Connection } from '../../../../types/global';
import styles from './page.module.css';

export const createConnectionUpdater = (
  updateConnection: (id: number, data: Partial<Connection>) => Promise<void>,
) => {
  return (id: number, field: keyof Connection) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    updateConnection(id, { [field]: value });
  };
};

export const useConnectionUpdater = (
  updateConnection: (id: number, data: Partial<Connection>) => Promise<void>,
) => {
  return useMemo(() => createConnectionUpdater(updateConnection), [updateConnection]);
};

export const TableHeader: React.FC<{
  field: keyof Connection;
  label: string;
  onSort: (field: keyof Connection) => void;
}> = React.memo(({ field, label, onSort }) => (
  <th className={styles.th} onClick={() => onSort(field)}>
    {label}
  </th>
));

export const ConnectionRow: React.FC<{
  connection: Connection;
  onUpdate: ReturnType<typeof useConnectionUpdater>;
  onDelete: (id: number) => Promise<void>;
}> = React.memo(({ connection, onUpdate, onDelete }) => (
  <tr className={styles.row}>
    <td className={styles.elementLeft}>{connection.name}</td>
    <td className={styles.element}>{connection.company}</td>
    <td className={styles.element}>
      <input
        type="checkbox"
        checked={connection.connected}
        onChange={onUpdate(connection.id, 'connected')}
      />
    </td>
    <td className={styles.element}>
      <input
        type="checkbox"
        checked={connection.talked}
        onChange={onUpdate(connection.id, 'talked')}
      />
    </td>
    <td className={styles.element}>
      <input
        type="checkbox"
        checked={connection.referral}
        onChange={onUpdate(connection.id, 'referral')}
      />
    </td>
    <td className={styles.elementRight}>
      <button onClick={() => onDelete(connection.id)}>Delete</button>
    </td>
  </tr>
));
