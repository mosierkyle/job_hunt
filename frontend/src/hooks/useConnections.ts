/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from 'react';
import { Connection, SortOption } from '../types/global';
import instance from '../utils/tokens';

const useConnections = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>({ field: 'name', direction: 'asc' });
  const [filterOption, setFilterOption] = useState<Partial<Connection>>({});

  const fetchConnections = useCallback(async () => {
    try {
      setLoading(true);
      const response = await instance.get('/connections/', {
        params: {
          ordering: `${sortOption.direction === 'desc' ? '-' : ''}${sortOption.field}`,
          ...filterOption,
        },
      });
      setConnections(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch connections');
    } finally {
      setLoading(false);
    }
  }, [sortOption, filterOption]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  const createConnection = async (connectionData: Omit<Connection, 'id' | 'user'>) => {
    try {
      const response = await instance.post('/connections/', connectionData);
      setConnections((prevConnections) => [...prevConnections, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create connection');
      throw err;
    }
  };

  const updateConnection = async (connectionId: number, connectionData: Partial<Connection>) => {
    try {
      const response = await instance.patch(`/connections/${connectionId}/`, connectionData);
      setConnections((prevConnections) =>
        prevConnections.map((conn) => (conn.id === connectionId ? response.data : conn)),
      );
      return response.data;
    } catch (err) {
      setError('Failed to update connection');
      throw err;
    }
  };

  const deleteConnection = async (connectionId: number) => {
    try {
      await instance.delete(`/connections/${connectionId}/`);
      setConnections((prevConnections) =>
        prevConnections.filter((conn) => conn.id !== connectionId),
      );
    } catch (err) {
      setError('Failed to delete connection');
      throw err;
    }
  };

  const setSort = (field: keyof Connection) => {
    setSortOption((prevSort) => ({
      field,
      direction: prevSort.field === field && prevSort.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const setFilter = (filter: Partial<Connection>) => {
    setFilterOption(filter);
  };

  return {
    connections,
    loading,
    error,
    createConnection,
    updateConnection,
    deleteConnection,
    setSort,
    setFilter,
  };
};

export default useConnections;
