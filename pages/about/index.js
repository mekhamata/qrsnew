/* eslint-disable react/no-unescaped-entities */
import styles from "./index.module.css";
import Image from "next/image";
import Head from "next/head";
import { showSiteName } from "../../store/slices/generalSlice";
import { useSelector } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const About = ({ about, eman }) => {
  const siteName = useSelector(showSiteName);
  console.log(eman);
  return (
    <section>
      <Head>
        <meta charSet="utf-8" />
        <title>
          {siteName} | {about.title}
        </title>
      </Head>
      <div id="pageCover" className={styles.pageCover}>
        <Image
          alt="page cover"
          src="/img/aboutcover.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div id="pageData" className={styles.pageData}>
        <div id="pageDataIn" className={styles.pageDataIn}>
          <div id="emansDiv" className={styles.emansDiv}>
            <div className={styles.imgDiv}>
              <Image
                alt="page main pic"
                src="/img/iman.png"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.imanTitle}>
              <span>אימן חורשיד</span> מייסדת ומנכ"לית חברת QRS
            </div>
            <div className={styles.imanDesc}>
              בעלת תואר ראשון במדעי הטבע - האוניברסיטה הפתוחה תואר שני בהבטחת
              איכות ואמינות - הטכניון תואר שני במנהל עסקים - אוניברסיטת חיפה
            </div>
            <div className={styles.imanBold}>
              אמינות, זמינות ומחויבות לשירות הטוב ביותר ולשביעות רצונם של
              לקוחותינו
            </div>
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
              <div className={styles.contentText}>
                <h2>QRS נוסדה בשנת 2014</h2>
                <h3>אימן חורשיד מייסדת ומנכ"לית חברת QRS</h3>
                <p>
                  אימן חורשיד מייסדת ומנכ"לית חברת QRS לאימאן יש יותר מעשרים
                  שנות ניסיון של פיתוח ויישום של מערכות QMS המעודכנות, במגוון
                  רחב של תעשיות: כלי חיתוך, ברזים תעשייתיים, ציוד לחץ, יציקות
                  מתכת ומכשור רפואי. בנוסף, יש לה ניסיון רב בשילוב מדיניות
                  סביבתית וניהול בטיחות כחלק ממערכת ניהול האיכות בחברות מובילות.
                  היא כיהנה כסמנכ"ל איכות ורגולציה בחברת MIS , אחת החבורות
                  המובילות בעולם בתחום תעשיית שתלים דנטליים בנוסף לתפקידים
                  ניהוליים בחברות גלובליות כמו לומינס מדיקל. אימאן מייעצת ומלווה
                  חברות בארץ ובחו"ל: ברישום למכשור רפואי ו- IVD, בארה"ב (FDA),
                  באיחוד האירופאי (CE) ובמדינות כמו: סין, קנדה, דרום אמריקה,
                  מזרח אירופה ומדינות אחרות ברחבי העולם. וגם מלווה חברות לקראת
                  מבדקי הסמכה לתקנים בינלאומיים וביקורת ה- FDA, ובונה מערכות
                  איכות בהתאם לתקנים בינלאומיים ומדריכה לתקנים אלו למעורבים
                  בפיתוח וייצור מוצרים, במטרה להגביר את ההיכרות וההבנה של עבודה
                  מול דרישות התקנים והתקינה הבינלאומיים.
                </p>
              </div>
            </div>
            <div className={styles.contentParagraph}>
              <div className={styles.contentMainH2Title}>
                <h2>QRS נוסדה בשנת 2014</h2>
              </div>
              <div className={styles.contentText}>
                <p>
                  הצוות שלנו מורכב ממומחים לרגולציה, מהנדסי איכות המצטיינים
                  בתעשייה בכלל ובתעשיית המכשור הרפואי בפרט ומהנדסי מכונות וכימיה
                  שילוו אותכם באמינות ובמקצועיות. צוות QRS הינו צוות מקצועי בעל
                  מומחיות, יצירתיות וניסיון רב בחשיבה מחוץ לקופסה המאפשר לנו
                  להציע ללקוחותינו ייצור מוצרים חדשים וייחודיים כמו גם שיפור
                  משמעותי של תהליכי הייצור של מוצרים קיימים, באמצעות תכנון
                  תהליכי ייצור ייעילים ואופטימליים. לצוות QRS ידע אקדמי, ניסיון
                  רב לאורך שנים וקשרים רבים עם רשויות בתחום האיכות ורגולציה
                  בישראל ובחו"ל כמו: FDA, משרד הבריאות הישראלי, רשויות קנדיות,
                  גופי הסמכה שונים (Notified Body) ונציגות אירופאיות.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = async ({ locale }) => {
  const res1 = await fetch("https://qrs-global.com/react/about/index.php?id=6");
  const data1 = await res1.json();

  const res2 = await fetch("https://qrs-global.com/react/about/index.php?id=3");
  const data2 = await res2.json();
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      about: data1.about,
      eman: data2,
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
