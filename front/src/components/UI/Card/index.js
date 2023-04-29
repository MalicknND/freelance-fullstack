import Link from 'next/link';
import React from 'react';
import styles from './index.module.scss';

const index = ({ freelance }) => {
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.card}>
        <img
          src="https://assets.codepen.io/285131/uslmOwQpdRRUwr6AmBP6JdzeHjS.jpg"
          alt="Image 1"
        />
        <div className={styles.card_body}>
          <h5 className={styles.card_title}>
            {freelance.user.firstName}
            {freelance.user.lastName}
          </h5>
          <p className={styles.card_text}>Contenu de la carte 1</p>
        </div>
      </div>
    </div>
  );
};

export default index;
