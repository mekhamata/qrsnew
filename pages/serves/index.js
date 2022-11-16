import styles from './index.module.css';
import Image from 'next/image';
import NavLink from '../../components/NavLink';
import Head from 'next/head';
import { showSiteName } from '../../store/slices/generalSlice';
import { useSelector } from 'react-redux';
const Serves = ({ servescat, allserves }) => {
  const siteName = useSelector(showSiteName);
  const catdata = servescat.servescat;
  //all serves <--start-->
  const allservesdata = allserves.allserves;
  // const myLoader = ({ src, width, quality }) => {
  //   return `https://qrs-global.com/uploads/${src}?w=${width}&q=${
  //     quality || 75
  //   }`;
  // };
  const Allservescircles = () => {
    return (
      allservesdata &&
      allservesdata.map((item) => {
        return (
          <div className={styles.homeCircleItem} key={item.id}>
            <NavLink href={`/serves/${item.id}`} className={styles.circlelink}>
              <div className={styles.homeCircleItem__img}>
                <div className={styles.homeCircleItem__img_wrapper}>
                  <Image
                    alt='page cover'
                    src={`https://qrs-global.com/uploads/${item.pic}`}
                    // src='/img/serves/i1.png'
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
              </div>
              <div className={styles.homeCircleItem__title}>{item.title}</div>
            </NavLink>
          </div>
        );
      })
    );
  };
  //all serves <--end-->
  return (
    <section>
      <Head>
        <meta charSet='utf-8' />
        <title>
          {siteName} | {catdata.title}
        </title>
      </Head>
      <div id='pageCover' className={styles.pageCover}>
        <Image
          alt='page cover'
          src='/img/servescover.jpg'
          layout='fill'
          objectFit='cover'
        />
        <div className={styles.coverTitle}>SERVES</div>
      </div>
      <div id='pageData' className={styles.pageData}>
        <div id='pageDataIn' className={styles.pageDataIn}>
          <div className={styles.pageNavigator}>
            <NavLink
              href='/serves'
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title={catdata.title}
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
                <h1>{catdata.title}</h1>
              </div>
              <div
                className={styles.contentText}
                dangerouslySetInnerHTML={{ __html: catdata.description }}
              ></div>
            </div>
            <div className={styles.contentParagraph}>
              <div
                id='homeCircleContainer'
                className={styles.homeCircleContainer}
              >
                <div id='homeCircleCenter' className={styles.homeCircleCenter}>
                  <Allservescircles />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getStaticProps = async () => {
  const res1 = await fetch(
    'https://qrs-global.com/react/serves/servescat.php?id=5'
  );
  const data1 = await res1.json();

  const res2 = await fetch('https://qrs-global.com/react/serves/serves.php');
  const data2 = await res2.json();
  return {
    props: {
      servescat: data1,
      allserves: data2,
    },
  };
};
// Serves.title = 'Serves';
export default Serves;
