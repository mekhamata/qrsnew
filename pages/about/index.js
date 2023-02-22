/* eslint-disable react/no-unescaped-entities */
import styles from "./index.module.css";
import Image from "next/image";
import Head from "next/head";
import { showSiteData } from "../../store/slices/generalSlice";
import { useSelector } from "react-redux";
import { useTranslation, i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const About = ({ about, eman, lang }) => {
  const siteData = useSelector(showSiteData);
  const { t } = useTranslation(["common"]);
  return (
    <section>
      <Head>
        <meta charSet="utf-8" />
        <title>
          {siteData["Title"]} | {about.title}
        </title>
      </Head>
      <div id="pageCover" className={styles.pageCover}>
        <Image alt="page cover" src="/img/aboutcover.jpg" layout="fill" />
      </div>
      <div id="pageData" className={styles.pageData}>
        <div id="pageDataIn" className={styles.pageDataIn}>
          <div id="emansDiv" className={styles.emansDiv}>
            <div className={styles.imgDiv}>
              <Image alt="page main pic" src="/img/iman.png" layout="fill" />
            </div>
            <div className={styles.imanTitle}>
              <span>{eman.title}</span> {eman.description}
            </div>
            <div
              className={styles.imanDesc}
              dangerouslySetInnerHTML={{ __html: eman.text }}
            ></div>
            <div className={styles.imanBold}>{t("common:emansentence")}</div>
          </div>
          <div id="contentDiv" className={styles.contentDiv}>
            <div className={styles.contentParagraph}>
              <div className={styles.contentMainTitle}>
                <h1>{about.title}</h1>
              </div>
              <div
                className={styles.contentText}
                dangerouslySetInnerHTML={{ __html: about.text }}
              ></div>
            </div>
            <div className={styles.contentParagraph}>
              <div
                className={styles.contentText}
                dangerouslySetInnerHTML={{ __html: about.extra_text }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getStaticProps = async ({ locale }) => {
  const res1 = await fetch(
    "https://qrs-global.com/react/about/index.php?id=28"
  );
  const data1 = await res1.json();

  const res2 = await fetch("https://qrs-global.com/react/about/index.php?id=3");
  const data2 = await res2.json();
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      about: data1.about,
      eman: data2.about,
      lang: locale ?? "he",
    },
  };
};
// About.title = 'About';
export default About;
// import connectMongo from '../../utils/dbConnect';
// import Samar from '../../models/toursModel';
// const About = ({ samars }) => {
//   return (
//     <div>
//       {samars.map((samars) => (
//         <div key={samars._id}>{samars.name}</div>
//       ))}
//     </div>
//   );
// };
// About.title = 'About';

// export const getServerSideProps = async () => {
//   try {
//     console.log('connecting to mongo');
//     await connectMongo();
//     console.log('connected to mongo');
//     console.log('Fetching documents');
//     const samars = await Samar.find();
//     console.log('fetched documents');

//     return {
//       props: {
//         samars: JSON.parse(JSON.stringify(samars)),
//       },
//     };
//   } catch (err) {
//     return {
//       notFound: true,
//     };
//   }
// };

// export default About;
