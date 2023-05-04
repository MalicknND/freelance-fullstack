import React from 'react';
import styles from './index.module.scss';
import Title from '@/components/UI/Title';
const index = ({ user }) => {
  return (
    <>
      <div className={styles.profile_card}>
        {user && (
          <>
            <span></span>
            <div className={styles.profile_card_body}>
              <Title title="Profil" Level="h2" />
              <div className={styles.profile_info}>
                <p className={styles.profile_info_label}>Type de compte :</p>
                <p className={styles.profile_info_value}>{user.userType}</p>
              </div>
              <div className={styles.profile_info}>
                <p className={styles.profile_info_label}>Prénom :</p>
                <p className={styles.profile_info_value}>{user.firstName}</p>
              </div>
              <div className={styles.profile_info}>
                <p className={styles.profile_info_label}>Nom :</p>
                <p className={styles.profile_info_value}>{user.lastName}</p>
              </div>
              <div className={styles.profile_info}>
                <p className={styles.profile_info_label}>Email :</p>
                <p className={styles.profile_info_value}>{user.email}</p>
              </div>
              <div className={styles.profile_info}>
                <p className={styles.profile_info_label}>
                  Numéro de portable :
                </p>
                <p className={styles.profile_info_value}>{user.phone}</p>
              </div>
              <div className={styles.profile_info}>
                <p className={styles.profile_info_label}>Adresse :</p>
                <p className={styles.profile_info_value}>
                  {user.address.street}
                </p>
              </div>
              <div className={styles.profile_info}>
                <p className={styles.profile_info_label}>Code postal :</p>
                <p className={styles.profile_info_value}>
                  {user.address.zipCode}
                </p>
              </div>
              <div className={styles.profile_info}>
                <p className={styles.profile_info_label}>Ville :</p>
                <p className={styles.profile_info_value}>{user.address.city}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default index;
