import React from 'react';
import styles from './index.module.scss';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Title from '@/components/UI/Title';
import Card from '@/components/UI/Card';
import Footer from '@/components/partials/Footer';
import Link from 'next/link';

const index = () => {
  const [data, setData] = React.useState([]);
  // console.log(process.env.NEXT_PUBLIC_API_URL);

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/freelance/search`, {
      headers: {
        'Content-Type': 'Application/json',
      },

      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => setData(data.freelances));
  }, []);

  console.log(data);
  return (
    <div className={styles.search}>
      <div className={styles.searchCard}>
        <form className={styles.searchForm}>
          <div className={styles.searchInputs}>
            <div className={styles.input}>
              <img src="./img/search.png" alt="" />
              <Input
                type="text"
                name="email"
                placeholder="Développeur Web..."
              />
            </div>
            <div className={styles.input}>
              <img src="./img/map.png" alt="" />
              <Input type="text" name="email" placeholder="Paris, France..." />
            </div>
          </div>
          <Button type="submit" title="Trouver" className="btn__search" />
          ou
          <Button type="submit" title="Publier" className="btn__default" />
        </form>
      </div>
      <Title title="Les dernières offres" Level="h1" />
      <div className={styles.freelances}>
        <div className={styles.left}>LEFT PART</div>
        <div className={styles.right}>
          <Link href="/freelances/id">
            <div className={styles.right_body}>
              {data.map((freelance) => (
                <Card freelance={freelance} />
              ))}
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default index;
