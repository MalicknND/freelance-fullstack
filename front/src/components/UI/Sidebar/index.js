import './index.module.scss';
import Link from 'next/link';
import styles from './index.module.scss';

export default function index() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItem}>
        <span className={styles.sidebarTitle}>ABOUT ME</span>
        <img
          src="https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className={styles.sidebarItem}>
        <span className={styles.sidebarTitle}>COMPETENCES</span>
        <ul className={styles.sidebarList}>
          <li className={styles.sidebarListItem}>Html</li>
          <li className={styles.sidebarListItem}>Css</li>
          <li className={styles.sidebarListItem}>Javascript</li>
          <li className={styles.sidebarListItem}>ReactJs</li>
          <li className={styles.sidebarListItem}>NextJS</li>
          <li className={styles.sidebarListItem}>Sass</li>
        </ul>
      </div>
    </div>
  );
}
