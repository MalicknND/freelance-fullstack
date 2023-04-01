import React from 'react';
import styles from './index.module.scss';

function index() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className={styles.search}>
            <div className={styles.searchInput}>
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder="Développement Web..." />
            </div>
            <button>Search</button>
          </div>
          <div className={styles.popular}>
            <span>Popular:</span>
            <button>Front End</button>
            <button>Back End</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className={styles.right}>
          <img src="./img/mman.png" alt="photo" />
        </div>
      </div>
    </div>
  );
}

export default index;
