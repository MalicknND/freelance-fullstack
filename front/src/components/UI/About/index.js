import React from 'react';
import styles from './index.module.scss';
import Title from '@/components/UI/Title';
import Image1 from '../../../../public/entreprise.svg';
import Image2 from '../../../../public/freelance.svg';
import Image3 from '../../../../public/solution.svg';
const Freelance = () => {
  return (
    <div className={styles.content_wrapper}>
      <div className={styles.content_variation}>
        <Title title="Freelancer c’est avant tout une communauté" Level="h1" />
      </div>
      <div className={styles.content}>
        <div className={styles.description}>
          <p>
            Où freelances et entreprises se retrouvent sur une marketplace, pour
            collaborer en toute simplicité.
          </p>
        </div>
        <div className={styles.columns}>
          <div className={styles.column}>
            <img
              src={Image1.src}
              alt="illustration of people doing a high-five"
            />
            <div className={styles.column_content}>
              <div>
                <Title title="+50k entreprises" Level="h2" />
              </div>
              <div>
                <p>À la recherche de freelances confirmés</p>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <img
              src={Image3.src}
              width="140"
              alt="illustration of people doing a high-five"
            />
            <div className={styles.column_content}>
              <div>
                <Title title="1 solution dédiée" Level="h2" />
              </div>
              <div>
                <p>Pensée et conçue pour collaborer</p>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <img
              src={Image2.src}
              alt="illustration of people doing a high-five"
            />
            <div className={styles.column_content}>
              <div>
                <Title title="+400K freelances" Level="h2" />
              </div>
              <div>
                <p>Aux multiples compétences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Freelance;
