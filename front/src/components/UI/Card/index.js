import Link from 'next/link';
import React from 'react';
import styles from './index.module.scss';

const index = ({ freelance }) => {
  return (
    <div className={styles.freelancer_card}>
      <div className={styles.freelancer_card_header}>
        <img
          src="https://fontawesome.com/social/user-unlock?f=&s="
          alt="Freelancer photo"
        />
      </div>
      <div className={styles.freelancer_card_body}>
        <h3 className={styles.freelancer_name}>
          {freelance.user.firstName} {freelance.user.firstName}
        </h3>
        <p className={styles.freelancer_title}>Métier du freelancer</p>
        <p clasNames={styles.freelancer_rate}>Taux journalier : $XX</p>
        <p className={styles.freelancer_location}>Localisation du freelancer</p>
        <div className={styles.freelancer_skills}>
          <span>Compétences :</span>
          <ul>
            {freelance.skills.map((skill, index) => (
              <li key={index}>{skill.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default index;
