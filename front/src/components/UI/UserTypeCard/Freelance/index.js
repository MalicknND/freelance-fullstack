import React from 'react';
import styles from './index.module.scss';
import Title from '@/components/UI/Title';

const index = ({ user, freelance, handleClick }) => {
  return (
    <>
      <div className={styles.profile_card}>
        {user && (
          <>
            <span>
              <img
                src="/img/edit.png"
                alt=""
                className={styles.profile_icon}
                onClick={handleClick}
              />
            </span>
            <div className={styles.profile_card_body}>
              <Title title="Freelance" Level="h2" />
              {freelance.freelance != null && (
                <>
                  <div className={styles.profile_info}>
                    <p className={styles.profile_info_label}>
                      Taux Journalier :
                    </p>
                    <p className={styles.profile_info_value}>
                      {freelance.freelance.rate}€/Jour
                    </p>
                  </div>
                  <div className={styles.profile_info}>
                    <p className={styles.profile_info_label}>
                      Année d'éxperience :
                    </p>
                    <p className={styles.profile_info_value}>
                      {freelance.freelance.yearOfExperience} ans
                    </p>
                  </div>
                  <div className={styles.profile_info}>
                    <p className={styles.profile_info_label}>Métier :</p>
                    <p className={styles.profile_info_value}>
                      {freelance.freelance.activity.name}
                    </p>
                  </div>
                  <div className={styles.profile_info}>
                    <p className={styles.profile_info_label}>Compétences :</p>
                    <ul className={styles.profile_info_ul}>
                      {freelance.freelance.skills.map((skill, index) => (
                        <li key={index}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default index;
