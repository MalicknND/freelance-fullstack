import React from 'react';
import styles from './index.module.scss';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Title from '@/components/UI/Title';
import Card from '@/components/UI/Card';
import Footer from '@/components/partials/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

const index = () => {
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    if (router.isReady) {
      console.log(router.query);

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/freelance/search`, {
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          searchString: router.query.firstName,
        }),
        method: 'POST',
      })
        .then((response) => response.json())
        .then((data) => setData(data.freelances));
    }
  }, [router.isReady]);

  return (
    <div className={styles.search}>
      <div className={styles.searchCard}>
        <form className={styles.searchForm}>
          <div className={styles.searchInputs}>
            <div className={styles.input}>
              <img src="./img/search.png" alt="" />
              <Input
                type="text"
                name="firstName"
                placeholder="Développeur Web..."
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.input}>
              <img src="./img/map.png" alt="" />
              <Input
                type="text"
                name="address"
                placeholder="Paris, France..."
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" title="Trouver" className="btn__search" />
          ou
          <Button type="submit" title="Publier" className="btn__default" />
        </form>
      </div>
      <Title title="Les dernières offres" Level="h1" />
      <div className={styles.freelances}>
        <div className={styles.right}>
          <Link href="/freelances/id">
            <div className={styles.right_body}>
              {data.map((freelance) => (
                <Card key={freelance._id} freelance={freelance} />
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
