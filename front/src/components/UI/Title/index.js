import React from 'react';
import styles from './index.module.scss';

const index = ({ title, Level }) => {
  return (
    <di className={styles.wrapper}>
      <Level>{title}</Level>
    </di>
  );
};

export default index;
