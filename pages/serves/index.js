import styles from "./index.module.css";
import Image from "next/image";
import NavLink from "../../components/NavLink";
import Head from "next/head";
import { showSiteData } from "../../store/slices/generalSlice";
import { useSelector } from "react-redux";
import { useTranslation, i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { whatLanguage } from "../../utils/helperFunctions";
const Serves = ({ servescat, allserves, lang }) => {
  const siteData = useSelector(showSiteData);
  const catdata = servescat.servescat;
  //all serves <--start-->
  const allservesdata = allserves.allserves;
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  const { t } = useTranslation(["common"]);
  const Allservescircles = ({ lang }) => {
    return (
      allservesdata &&
      allservesdata.map((item) => {
        return (
          <div className={styles.homeCircleItem} key={item.id}>
            <NavLink href={`/serves/${item.id}`} className={styles.circlelink}>
              <div className={styles.homeCircleItem__img}>
                <div className={styles.homeCircleItem__img_wrapper}>
                  <Image
                    loader={myLoader}
                    alt="page cover"
                    src={`${item.pic}`}
                    // src='/img/serves/i1.png'
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className={styles.homeCircleItem__title}>
                {whatLanguage(lang, item, "title")}
              </div>
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
        <meta charSet="utf-8" />
        <title>
          {siteData["Title"]} | {whatLanguage(lang, catdata, "title")}
        </title>
      </Head>
      <div id="pageCover" className={styles.pageCover}>
        <Image
          alt="page cover"
          src="/img/servescover.jpg"
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.coverTitle}>{t("common:serves")}</div>
      </div>
      <div id="pageData" className={styles.pageData}>
        <div id="pageDataIn" className={styles.pageDataIn}>
          <div className={styles.pageNavigator}>
            <NavLink
              href="/serves"
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title={whatLanguage(lang, catdata, "title")}
            />
            /
            <NavLink
              href="/products"
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title={t("common:products")}
            />
          </div>
          <div className={styles.pageRealData}>
            <div className={styles.contentParagraph}>
              <div className={styles.contentMainTitle}>
                <h1>{whatLanguage(lang, catdata, "title")}</h1>
              </div>
              <div
                className={styles.contentText}
                dangerouslySetInnerHTML={{
                  __html: whatLanguage(lang, catdata, "description"),
                }}
              ></div>
            </div>
            <div className={styles.contentParagraph}>
              <div
                id="homeCircleContainer"
                className={styles.homeCircleContainer}
              >
                <div id="homeCircleCenter" className={styles.homeCircleCenter}>
                  <Allservescircles lang={lang} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = async ({ locale }) => {
  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/react/serves/servescat.php?id=5`
  );
  const data1 = await res1.json();

  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/react/serves/serves.php`
  );
  const data2 = await res2.json();

  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      servescat: data1,
      allserves: data2,
      lang: locale ?? "he",
    },
  };
};
// Serves.title = 'Serves';
export default Serves;
