import styles from './index.module.css';
import Image from 'next/image';
import NavLink from '../../components/NavLink';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSelector } from 'react-redux';
import { showSiteName } from '../../store/slices/generalSlice';
import { useEffect } from 'react';
import Head from 'next/head';


const Products = (props) => {
  const { t } = useTranslation();
  const siteName = useSelector(showSiteName);

  return (
    <section>
      <Head>
        <meta charSet='utf-8' />
        <title>{siteName} | Products</title>
      </Head>
      <div id='pageCover' className={styles.pageCover}>
        <Image
          alt='page cover'
          src='/img/implantscover.jpg'
          layout='fill'
          objectFit='cover'
        />
        <div className={styles.coverTitle}>
          {t('common:implants').toUpperCase()}
        </div>
      </div>
      <div id='pageData' className={styles.pageData}>
        <div id='pageDataIn' className={styles.pageDataIn}>
          <div className={styles.pageNavigator}>
            <NavLink
              href='/serves'
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title='שירותים'
            />
            /
            <NavLink
              href='/products'
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title='מוצרים'
            />
          </div>
          <div className={styles.pageRealData}>
            <div className={styles.contentParagraph}>
              <div className={styles.contentMainTitle}>
                <h1>מוצרים</h1>
              </div>
              <div className={styles.contentText}>
                QRS מספקת את השטלים הטובים בעולם השטלים שלנו עוברים תהליך קפדני
                ועומדים בסטנדרטים בינלואמיים
              </div>
            </div>
            <div className={styles.contentParagraph}>
              <div
                id='homeCircleContainer'
                className={styles.homeCircleContainer}
              >
                <div id='homeCircleCenter' className={styles.homeCircleCenter}>
                  {/* item */}
                  <div className={styles.homeCircleItem}>
                    <NavLink href='' className={styles.circlelink}>
                      <div className={styles.homeCircleItem__img}>
                        <div className={styles.homeCircleItem__img_wrapper}>
                          <Image
                            alt='page cover'
                            src='/img/products/i1.png'
                            layout='fill'
                            objectFit='contain'
                          />
                        </div>
                      </div>
                      <div className={styles.homeCircleItem__title}>Kits</div>
                    </NavLink>
                  </div>
                  {/* /item */}
                  {/* item */}
                  <div className={styles.homeCircleItem}>
                    <NavLink href='' className={styles.circlelink}>
                      <div className={styles.homeCircleItem__img}>
                        <div className={styles.homeCircleItem__img_wrapper}>
                          <Image
                            alt='page cover'
                            src='/img/products/i2.png'
                            layout='fill'
                            objectFit='contain'
                          />
                        </div>
                      </div>
                      <div className={styles.homeCircleItem__title}>
                        Implants
                      </div>
                    </NavLink>
                  </div>
                  {/* /item */}
                  {/* item */}
                  <div className={styles.homeCircleItem}>
                    <NavLink href='' className={styles.circlelink}>
                      <div className={styles.homeCircleItem__img}>
                        <div className={styles.homeCircleItem__img_wrapper}>
                          <Image
                            alt='page cover'
                            src='/img/products/i3.png'
                            layout='fill'
                            objectFit='contain'
                          />
                        </div>
                      </div>
                      <div className={styles.homeCircleItem__title}>
                        Prosthetics
                      </div>
                    </NavLink>
                  </div>
                  {/* /item */}
                  {/* item */}
                  <div className={styles.homeCircleItem}>
                    <NavLink href='' className={styles.circlelink}>
                      <div className={styles.homeCircleItem__img}>
                        <div className={styles.homeCircleItem__img_wrapper}>
                          <Image
                            alt='page cover'
                            src='/img/products/i4.png'
                            layout='fill'
                            objectFit='contain'
                          />
                        </div>
                      </div>
                      <div className={styles.homeCircleItem__title}>Tools</div>
                    </NavLink>
                  </div>
                  {/* /item */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
// Products.title = 'Products';
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'products'])),
      // Will be passed to the page component as props
    },
  };
}
export default Products;
