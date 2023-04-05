import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import Button from '@/components/UI/Button/';
import { useRouter } from 'next/router';

const index = () => {
  const [active, setActive] = useState(false);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', isActive);
    return () => {
      window.removeEventListener('scroll', isActive);
    };
  }, []);

  const router = useRouter();

  return (
    <div
      className={
        active ? `${styles.wrapper} ${styles.active}` : `${styles.wrapper}`
      }
    >
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.text}>Freelancer</span>
          <span className={styles.dot}>.</span>
        </div>
        <div className={styles.links}>
          <span>Qui sommes-nous ?</span>
          <span>Explore</span>
          <span>English</span>
          <Button
            type="submit"
            title="Se connecter"
            className="btn__primary"
            handleClick={() => router.push('/auth/login')}
          />
          <Button type="submit" title="S'inscrire" className="btn__primary" />
        </div>
      </div>
      {active && (
        <>
          <hr />
          <div className={styles.menu}>
            <span>Graphics & Design</span>
            <span> Video & Animation</span>
            <span>Writing & Translation</span>
            <span> AI Services</span>
            <span>Digital Marketing</span>
            <span> Music & Audio</span>
            <span> Programming & Tech</span>
            <span> Business</span>
            <span> Lifestyle</span>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default index;
