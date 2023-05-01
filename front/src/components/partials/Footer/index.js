import React from 'react';
import styles from './index.module.scss';

function index() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_slices}>
        <div className={styles.infos}>
          <div className={styles.logo}>
            <span className={styles.text}>Freelancer</span>
            <span className={styles.dot}>.</span>
          </div>
          <p>
            <span>
              241 Saint Denis<br></br>
            </span>
            <span>
              75000 Paris<br></br>
            </span>
          </p>
          <p>
            <a href="/">Aide & Support</a>
          </p>
          <div className={styles.social_icons}>
            <div>
              <div className={styles.social_icon}>
                <a href="#">
                  {' '}
                  <img src="/img/twitter.png" alt="" />
                </a>
              </div>
            </div>
            <div>
              <div className={styles.social_icon}>
                <a href="#">
                  {' '}
                  <img src="/img/instagram.png" alt="" />
                </a>
              </div>
            </div>
            <div>
              <div className={styles.social_icon}>
                <a href="#">
                  {' '}
                  <img src="/img/linkedin.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className={styles.links}>
          <div className={styles.links_column}>
            <div className={styles.links_column_title}>
              <h6>Pour les entreprises</h6>
            </div>
            <div>
              <div>
                <p>Pourquoi Freelancer ?</p>
              </div>
            </div>
            <div>
              <div>
                <p>Marketplace de freelances</p>
              </div>
            </div>
            <div>
              <div>
                <p>Solution de gestion de freelances</p>
              </div>
            </div>
            <div>
              <div>
                <p>Fonctionnalités produit</p>
              </div>
            </div>
            <div>
              <div>
                <p>Malt Open: solution de portage administratif</p>
              </div>
            </div>
            <div>
              <div>
                <p>Demande de démo</p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.links}>
          <div className={styles.links_column}>
            <div className={styles.links_column_title}>
              <h6>Pour les freelances</h6>
            </div>
            <div>
              <div>
                <p>Pourquoi Freelancer ?</p>
              </div>
            </div>
            <div>
              <div>
                <p>Community & Programmes</p>
              </div>
            </div>
            <div>
              <div>
                <p>Fonctionnalités produit</p>
              </div>
            </div>
            <div>
              <div>
                <p>Programme Super Malter</p>
              </div>
            </div>
            <div>
              <div>
                <p>Malt Academy</p>
              </div>
            </div>
            <div>
              <div>
                <p>Partenaires</p>
              </div>
            </div>
            <div>
              <div>
                <p>Programme d'apport d'affaires</p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.links}>
          <div className={styles.links_column}>
            <div className={styles.links_column_title}>
              <h6>Ressources</h6>
            </div>
            <div>
              <div>
                <p>Articles</p>
              </div>
            </div>
            <div>
              <div>
                <p>Guides</p>
              </div>
            </div>
            <div>
              <div>
                <p>Success stories</p>
              </div>
            </div>
            <div>
              <div>
                <p>Aide</p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.links}>
          <div className={styles.links_column}>
            <div className={styles.links_column_title}>
              <h6>Freelancer</h6>
            </div>
            <div>
              <div>
                <p>A propos de Freelancer</p>
              </div>
            </div>

            <div>
              <div>
                <p>Presse</p>
              </div>
            </div>
            <div>
              <div>
                <p>Presse</p>
              </div>
            </div>
            <div>
              <div>
                <p>Protection des données</p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  {' '}
                  <a href="#">Site map</a>{' '}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.copyright}>
        © 2023 FREELANCER. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

export default index;
