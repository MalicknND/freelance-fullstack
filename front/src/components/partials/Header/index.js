import React, { useState } from 'react';
import styles from './index.module.scss';
import Button from '@/components/UI/Button/';

const index = () => {
  const [active, setActive] = useState(false);
  return (
    <div className={active ? `${styles.wrapperActive}` : `${styles.wrapper}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.text}>Fiverr</span>
          <span className={styles.dot}>.</span>
        </div>
        <div className={styles.links}>
          <span>Qui sommes-nous ?</span>
          <span>Explore</span>
          <span>English</span>
          <Button type="submit" title="Se connecter" className="btn__primary" />
          <Button type="submit" title="S'inscrire" className="btn__primary" />
        </div>
      </div>

      <hr />
      <div className={styles.menu}>
        <span>TEST</span>
        <span>TEST</span>
      </div>
    </div>
  );
};

export default index;
