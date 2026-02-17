import React from 'react';
import { useTheme } from '../../../Context_TEMP/ThemeContext';
import styles from './FilterBar.module.css';

const FilterBar = ({ filter, setFilter, sortBy, setSortBy, courseStats }) => {
  const { theme } = useTheme();

  const filters = [
    { id: 'all', label: 'All Lessons', count: Object.values(courseStats).reduce((sum, stat) => sum + stat.count, 0) },
    { id: 'crypto', label: 'Crypto', count: courseStats.crypto?.count || 0 },
    { id: 'scams', label: 'Scams', count: courseStats.scams?.count || 0 },
    { id: 'memecoins', label: 'Memecoins', count: courseStats.memecoins?.count || 0 },
    { id: 'security', label: 'Security', count: courseStats.security?.count || 0 }
  ];

  const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'progress', label: 'Progress' }
  ];

  return (
    <div className={`${styles.filterBar} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.filterSection}>
        <div className={styles.filterLabel}>
          <i className="fas fa-filter"></i>
          Filter by Course:
        </div>
        <div className={styles.filterButtons}>
          {filters.map(f => (
            <button
              key={f.id}
              className={`${styles.filterBtn} ${filter === f.id ? styles.active : ''}`}
              onClick={() => setFilter(f.id)}
              data-filter={f.id}
            >
              {f.label}
              {f.count > 0 && <span className={styles.filterCount}>{f.count}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sortSection}>
        <div className={styles.sortLabel}>
          <i className="fas fa-sort-amount-down"></i>
          Sort by:
        </div>
        <div className={styles.sortButtons}>
          {sortOptions.map(option => (
            <button
              key={option.id}
              className={`${styles.sortBtn} ${sortBy === option.id ? styles.active : ''}`}
              onClick={() => setSortBy(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;