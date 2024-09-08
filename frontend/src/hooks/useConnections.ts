/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from 'react';
import { Connection, ConnectionsState, SortOption } from '../types/global';
import instance from '../utils/tokens';

const useConnections = () => {
  const [state, setState] = useState<ConnectionsState>({
    connections: [],
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>({ field: 'name', direction: 'asc' });
  const [filterOption, setFilterOption] = useState<Partial<Connection>>({});

  const fetchConnections = useCallback(async () => {
    try {
      setLoading(true);
      const { currentPage, pageSize } = state;
      const response = await instance.get('/connections/', {
        params: {
          page: currentPage,
          page_size: pageSize,
          ordering: `${sortOption.direction === 'desc' ? '-' : ''}${sortOption.field}`,
          ...filterOption,
        },
      });
      setState((prevState) => ({
        ...prevState,
        connections: response.data.results,
        totalCount: response.data.count,
      }));
      setError(null);
    } catch (err) {
      setError('Failed to fetch connections');
    } finally {
      setLoading(false);
    }
  }, [state.currentPage, state.pageSize, sortOption, filterOption]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  const createConnection = async (connectionData: Omit<Connection, 'id' | 'user'>) => {
    try {
      const response = await instance.post('/connections/', connectionData);
      setState((prevState) => ({
        ...prevState,
        connections: [...prevState.connections, response.data],
        totalCount: prevState.totalCount + 1,
      }));
      return response.data;
    } catch (err) {
      setError('Failed to create connection');
      throw err;
    }
  };

  const updateConnection = async (connectionId: number, connectionData: Partial<Connection>) => {
    try {
      const response = await instance.patch(`/connections/${connectionId}/`, connectionData);
      setState((prevState) => ({
        ...prevState,
        connections: prevState.connections.map((conn) =>
          conn.id === connectionId ? response.data : conn,
        ),
      }));
      return response.data;
    } catch (err) {
      setError('Failed to update connection');
      throw err;
    }
  };

  const deleteConnection = async (connectionId: number) => {
    try {
      await instance.delete(`/connections/${connectionId}/`);
      setState((prevState) => ({
        ...prevState,
        connections: prevState.connections.filter((conn) => conn.id !== connectionId),
        totalCount: prevState.totalCount - 1,
      }));
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
    setState((prevState) => ({ ...prevState, currentPage: 1 }));
  };

  const setPage = (page: number) => {
    setState((prevState) => ({ ...prevState, currentPage: page }));
  };

  return {
    ...state,
    loading,
    error,
    createConnection,
    updateConnection,
    deleteConnection,
    setSort,
    setFilter,
    setPage,
  };
};

export default useConnections;
