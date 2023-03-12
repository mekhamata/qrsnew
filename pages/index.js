import Image from "next/image";
import NavLink from "../components/NavLink";
import styles from "./index.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRouter } from "next/router";
import Head from "next/head";
import { showSiteData, getSiteDataAsync } from "../store/slices/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useTranslation, i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { whatLanguage } from "../utils/helperFunctions";

const Home = ({ circles, lang }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteDataAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const router = useRouter();
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: router.locale === "he",
  };
  const siteData = useSelector(showSiteData);
  const { t } = useTranslation(["common", "course"]);
  return (
    <>
      <section>
        <Head>
          <meta charSet="utf-8" />
          <title>{siteData?.["Title"]}</title>
        </Head>
        <Slider {...sliderSettings}>
          <div className={styles.pageCover}>
            <Image
              alt="page cover"
              src="/img/homecover.jpg"
              layout="fill"
              objectFit="cover"
            />
            {/* <div className={styles.coverTitle}>SERVES</div> */}
          </div>
          <div className={styles.pageCover}>
            <Image
              alt="page cover"
              src="/img/servescover.jpg"
              layout="fill"
              objectFit="cover"
            />
            {/* <div className={styles.coverTitle}>SERVES</div> */}
          </div>
          <div className={styles.pageCover}>
            <Image
              alt="page cover"
              src="/img/servescover.jpg"
              layout="fill"
              objectFit="cover"
            />
            {/* <div className={styles.coverTitle}>SERVES</div> */}
          </div>
        </Slider>
      </section>
      <section>
        <div id="homeCircles" className={styles.homeCircles}>
          <div id="homeCircleContainer" className={styles.homeCircleContainer}>
            <div id="homeCircleCenter" className={styles.homeCircleCenter}>
              {circles &&
                circles.circles.map((item) => {
                  return (
                    <div className={styles.homeCircleItem} key={item.id}>
                      <NavLink
                        href={`/${whatLanguage(lang, item, "url")}`}
                        className={styles.circlelink}
                      >
                        <div className={styles.homeCircleItem__img}>
                          <div className={styles.homeCircleItem__img_wrapper}>
                            <Image
                              alt="page cover"
                              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.pic}`}
                              layout="responsive"
                              width={286}
                              height={284}
                            />
                          </div>
                        </div>
                        <div className={styles.homeCircleItem__title}>
                          {whatLanguage(lang, item, "title")}
                        </div>
                        <div className={styles.homeCircleItem__desc}>
                          {whatLanguage(lang, item, "description")}
                        </div>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export const getServerSideProps = async ({ locale }) => {
  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/react/home/index.php`
  );
  const data1 = await res1.json();
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      circles: data1,
      lang: locale ?? "he",
    },
  };
};
// Home.title = 'QRS MEDICAL';
export default Home;
