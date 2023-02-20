import styles from "./index.module.css";
import Image from "next/image";
import NavLink from "../../components/NavLink";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSelector } from "react-redux";
import { showSiteName } from "../../store/slices/generalSlice";
import Head from "next/head";

const Products = ({ productscats, linkdata }) => {
  const { t } = useTranslation(["common", "contact"]);
  const siteName = useSelector(showSiteName);
  if (!productscats || !linkdata) {
    //loading or return...
    return;
  }
  return (
    <section>
      <Head>
        <meta charSet="utf-8" />
        <title>
          {siteName} | {t("products:products")}
        </title>
      </Head>
      <div id="pageCover" className={styles.pageCover}>
        <Image
          alt="page cover"
          src="/img/implantscover.jpg"
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.coverTitle}>
          {t("common:implants").toUpperCase()}
        </div>
      </div>
      <div id="pageData" className={styles.pageData}>
        <div id="pageDataIn" className={styles.pageDataIn}>
          <div className={styles.pageNavigator}>
            <NavLink
              href="/serves"
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title={t("common:serves")}
            />
            /
            <NavLink
              href="/products"
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title={t("products:products")}
            />
          </div>
          <div className={styles.pageRealData}>
            <div className={styles.contentParagraph}>
              <div className={styles.contentMainTitle}>
                <h1>{linkdata.title}</h1>
              </div>
              <div
                className={styles.contentText}
                dangerouslySetInnerHTML={{ __html: linkdata.text }}
              ></div>
            </div>
            <div className={styles.contentParagraph}>
              <div
                id="homeCircleContainer"
                className={styles.homeCircleContainer}
              >
                <div id="homeCircleCenter" className={styles.homeCircleCenter}>
                  {productscats.map((item) => {
                    return (
                      <div className={styles.homeCircleItem} key={item.id}>
                        <NavLink
                          href={`/products/${item.id}`}
                          className={styles.circlelink}
                        >
                          <div className={styles.homeCircleItem__img}>
                            <div className={styles.homeCircleItem__img_wrapper}>
                              <Image
                                alt="page cover"
                                src={`https://qrs-global.com/uploads/${item.pic}`}
                                layout="fill"
                                objectFit="contain"
                              />
                            </div>
                          </div>
                          <div className={styles.homeCircleItem__title}>
                            {item.title}
                          </div>
                        </NavLink>
                      </div>
                    );
                  })}
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
  const link = await fetch(
    "https://qrs-global.com/react/links/index.php?id=23"
  );
  const linkData = await link.json();
  const res1 = await fetch(
    "https://qrs-global.com/react/productscats/index.php"
  );
  const data1 = await res1.json();
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      productscats: data1?.productscats,
      linkdata: linkData?.linkdata,
      // Will be passed to the page component as props
    },
  };
}
export default Products;
