import React from 'react';
import styles from './index.module.scss';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Title from '@/components/UI/Title';
import Image from '../../../../public/img/header.png';

function index() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Title
            title="Trouvez les services parfaits pour votre entreprise"
            Level="h3"
          />

          <div className={styles.search}>
            <div className={styles.searchCard}>
              <form className={styles.searchForm}>
                <div className={styles.searchInputs}>
                  <div className={styles.input}>
                    <img src="./img/search.png" alt="" />
                    <Input
                      type="text"
                      name="email"
                      placeholder="Développement Web..."
                    />
                  </div>
                  <div className={styles.input}>
                    <img src="./img/map.png" alt="" />
                    <Input
                      type="text"
                      name="email"
                      placeholder="Paris, France..."
                    />
                  </div>
                </div>
                <Button type="submit" title="Trouver" className="btn__search" />
                ou
                <Button
                  type="submit"
                  title="Publier"
                  className="btn__default"
                />
              </form>
            </div>
          </div>

          <div className={styles.popular}>
            <span>Popular:</span>
            <button>Front End</button>
            <button>Back End</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        <div className={styles.right}>
          <img src={Image.src} alt="auth" />
        </div>
      </div>
    </div>
  );
}

export default index;
