import React from 'react';
import Carousel from 'react-elastic-carousel';
import styles from './index.module.scss';
import ItemCaroussel from '../ItemCaroussel';
import { cards } from '@/data';

//nous permet de gérer la responsivité
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function index() {
  return (
    <div className={styles.App}>
      <hr className={styles.seperator} />
      <div className={styles.carousel_wrapper}>
        <Carousel breakPoints={breakPoints}>
          {cards.map((item) => (
            <ItemCaroussel item={item} key={item.id} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default index;
