import Link from 'next/link';
import React from 'react';
import styles from './index.module.scss';

const index = () => {
  return (
    <div className={styles.card}>
      <img
        src="https://assets.codepen.io/285131/uslmOwQpdRRUwr6AmBP6JdzeHjS.jpg"
        className={styles.card_img_top}
        alt="..."
      />
      <div className={styles.card_body}>
        <h5 className={styles.card_title}>Card title</h5>
        <p className={styles.card_text}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <Link href="#" className={styles.btn}>
          Go somewhere
        </Link>
      </div>
    </div>
  );
};

export default index;
