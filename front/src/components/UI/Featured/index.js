import React, { useState } from 'react';
import styles from './index.module.scss';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Title from '@/components/UI/Title';
import Image from '../../../../public/img/header.png';
import { useRouter } from 'next/router';

function Index() {
  const router = useRouter();
  const [searchString, setSearchString] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push({
      pathname: '/freelances',
      query: {
        firstName: searchString,
        address: address,
      },
    });
  };

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
              <form onSubmit={handleSubmit} className={styles.searchForm}>
                <div className={styles.searchInputs}>
                  <div className={styles.input}>
                    <img src="./img/search.png" alt="" />
                    <Input
                      type="text"
                      placeholder="Développeur Web..."
                      name="searchString"
                      value={searchString}
                      onChange={(event) => setSearchString(event.target.value)}
                    />
                  </div>
                  <div className={styles.input}>
                    <img src="./img/map.png" alt="" />
                    <Input
                      type="text"
                      placeholder="Paris, France..."
                      name="address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" title="Trouver" className="btn__search" />
              </form>
            </div>
          </div>

          <div className={styles.popular}>
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

export default Index;
