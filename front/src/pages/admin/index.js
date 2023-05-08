import React from 'react';
import Button from '@/components/UI/Button/';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

const index = () => {
  const router = useRouter();
  return (
    <div className={styles.parent_wrapper}>
      <div className={styles.wrapper}>
        <Button
          type="submit"
          title="users"
          className="btn__secondary"
          handleClick={() => router.push('/admin/users')}
        />
        <Button
          type="submit"
          title="Skills"
          className="btn__secondary"
          handleClick={() => router.push('/admin/skills')}
        />
        <Button
          type="submit"
          title="Metiers"
          className="btn__secondary"
          handleClick={() => router.push('/admin/metiers')}
        />
      </div>
    </div>
  );
};

export default index;
