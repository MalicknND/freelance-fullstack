import React from 'react';
import Title from '@/components/UI/Title';
import { Avatar } from '@mui/material';
import Link from 'next/link';
import styles from './index.module.scss';

const Index = () => {
  return (
    <div className={styles.index}>
      <Title title="Quelle est votre situation ?" Level="h2" />
      <Link href="/auth/register/entreprise">
        <div className={styles.box}>
          <Avatar
            alt="Remy Sharp"
            src="https://img.freepik.com/vecteurs-libre/illustration-concept-experts_114360-451.jpg?size=626&ext=jpg&uid=R15765290&ga=GA1.2.547947235.1680361633&semt=sph"
            className={styles.avatar}
          />
          <p>
            <span>Entreprise</span>
            <span>je recherche des freelances</span>
          </p>
        </div>
      </Link>
      <Link href="/auth/register/freelance">
        <div className={styles.box}>
          <Avatar
            alt="Remy Sharp"
            src="https://img.freepik.com/vecteurs-libre/rencontres-ligne-homme-heureux-via-ordinateur-portable_74855-7495.jpg?size=626&ext=jpg&uid=R15765290&ga=GA1.2.547947235.1680361633&semt=sph"
            className={styles.avatar}
          />
          <p>
            <span>Freelance</span>
            <span>Je crée mon profil</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Index;
