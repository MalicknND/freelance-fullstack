import React from 'react';
import styles from './index.module.scss';

const index = ({ title, Level }) => {
  return (
    <div className={styles.wrapper}>
      <Level>{title}</Level>
    </div>
  );
};

export default index;
