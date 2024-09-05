import React, { useState } from 'react';
import styles from './page.module.css';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  placeholder?: string;
  //   onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...' }) => {
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(query);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <FiSearch className={styles.icon} />
      <input
        type="text"
        value={query}
        className={styles.input}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </form>
  );
};

export default SearchBar;
