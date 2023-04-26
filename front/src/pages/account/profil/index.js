import React from 'react';
import styles from './index.module.scss';
import Title from '@/components/UI/Title';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Sidebar from '@/components/UI/Sidebar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Footer from '@/components/partials/Footer';

export default function index() {
  return (
    <>
      <div className={styles.settings}>
        <div className={styles.settingsWrapper}>
          <div className={styles.settingsTitle}>
            <Title title="Modifier" Level="h1" />
            {/* <span className={styles.settingsTitleDelete}>Delete Account</span> */}
            <Button type="submit" title="Supprimer" className="btn__warning" />
          </div>
          <form className={styles.settingsForm}>
            <label>Profile Picture</label>
            <div className={styles.settingsPP}>
              <img
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
              />
              <label htmlFor="fileInput">
                <AccountBoxIcon className={styles.settingsPPIcon} />
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                className="settingsPPInput"
              />
            </div>

            <label>Username</label>
            <input type="text" placeholder="Safak" name="name" />
            <label>Email</label>
            <input type="email" placeholder="safak@gmail.com" name="email" />
            <label>Password</label>
            <input type="password" placeholder="Password" name="password" />
            <Button
              type="submit"
              title="Enregistrer les modifications"
              className="btn__secondary"
            />
          </form>
        </div>
        <Sidebar />
      </div>
      <Footer />
    </>
  );
}
