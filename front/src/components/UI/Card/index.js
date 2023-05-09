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
          {freelance &&
          freelance.user &&
          freelance.user.firstName &&
          freelance.user.lastName
            ? `${freelance.user.firstName} ${freelance.user.lastName}`
            : null}
        </h3>
        {freelance.activity && (
          <p className={styles.freelancer_title}>{freelance.activity.name}</p>
        )}

        <p className={styles.freelancer_rate}>
          Taux journalier : {freelance.rate}€/jour
        </p>
        <p className={styles.freelancer_location}>
          {freelance.user && freelance.user.address && (
            <span className={styles.profile_info_value}>
              {freelance.user.address.street} {freelance.user.address.zipCode}{' '}
              {freelance.user.address.city}
            </span>
          )}
        </p>
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
