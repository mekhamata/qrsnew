/* eslint-disable react/no-unescaped-entities */
import styles from "./index.module.css";
import Image from "next/image";
import NavLink from "../../../components/NavLink";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { showSiteName } from "../../../store/slices/generalSlice";
import Head from "next/head";
import CheckBox from "react-animated-checkbox";
import IconComponent from "../../../components/iconComponent";

const LeftSide = () => {
  const { t } = useTranslation(["common", "course"]);
  return (
    <div className={styles.realLeftSide}>
      <div
        className={styles.realLeftSide_greyTitle}
        style={{ borderRadius: "20px 20px 0 0" }}
      >
        {t("course:coursedetails")}
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>
          {t("common:category")}:
        </div>
        <div className={styles.realLeftSide_lines_b}>
          <NavLink
            href="/"
            className={styles.navlink__active}
            activeClassName={styles.navlink__active}
            title="רגולציה"
          />
        </div>
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>
          {t("course:courselength")}:
        </div>
        <div className={styles.realLeftSide_lines_b}>8 שעות</div>
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>
          {t("course:startdate")}:
        </div>
        <div className={styles.realLeftSide_lines_b}>10-11-2020</div>
      </div>
      <div className={styles.realLeftSide_greyTitle}>
        {t("course:coursecoo")}
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>נעים אנדראוס</div>
        <div className={styles.realLeftSide_lines_b}>0547256024</div>
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>סמאח אלקוט ח'טיב</div>
        <div className={styles.realLeftSide_lines_b}>0547256024</div>
      </div>
      <div className={styles.realLeftSide_greyTitle}>
        {t("course:interested")}
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>
          {t("course:sendtofriend")}
        </div>
        <div className={styles.realLeftSide_lines_b}>
          <NavLink
            href="/"
            className={styles.navlink__active}
            activeClassName={styles.navlink__active}
            title=""
          >
            <div className={styles.realLeftSide_lines_b_iconContainer}>
              <div className={styles.realLeftSide_lines_b_iconCover}>
                <IconComponent
                  name="fa-sharp fa-solid fa-envelope-open-text"
                  className={styles.realLeftSide_lines_b_icon}
                />
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>
          {t("course:downloadregisterdoc")}
        </div>
        <div className={styles.realLeftSide_lines_b}>
          <NavLink
            href="/"
            className={styles.navlink__active}
            activeClassName={styles.navlink__active}
            title=""
          >
            <div className={styles.realLeftSide_lines_b_iconContainer}>
              <div className={styles.realLeftSide_lines_b_iconCover}>
                <IconComponent
                  name="fa-sharp fa-solid fa-download"
                  className={styles.realLeftSide_lines_b_icon}
                />
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>
          {t("course:onlineregister")}
        </div>
        <div className={styles.realLeftSide_lines_b}>
          <NavLink
            href="/"
            className={styles.navlink__active}
            activeClassName={styles.navlink__active}
            title=""
          >
            <div className={styles.realLeftSide_lines_b_iconContainer}>
              <div className={styles.realLeftSide_lines_b_iconCover}>
                <IconComponent
                  name="fa-sharp fa-solid fa-file-invoice"
                  className={styles.realLeftSide_lines_b_icon}
                />
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <div className={styles.realLeftSide_blueTitle}>
        {t("course:moreinfo")}
        <br />
        {t("course:filldetails")}
      </div>
      <form>
        <div className={styles.realLeftSide_form_input}>
          <input type="text" name="" placeholder={t("common:fullname")} />
        </div>
        <div className={styles.realLeftSide_form_input}>
          <input type="text" name="" placeholder={t("common:phone")} />
        </div>
        <div className={styles.realLeftSide_form_input}>
          <input type="text" name="" placeholder={t("common:email")} />
        </div>
        <input type="hidden" name="courseData" />
        <div className={styles.realLeftSide_form_button}>
          <button>{t("common:send")}</button>
        </div>
      </form>
    </div>
  );
};
const CourseIn = () => {
  const siteName = useSelector(showSiteName);
  const { t } = useTranslation(["common", "course"]);
  //dispacher example to update states

  // const dispatcher = useDispatch();
  // useEffect(() => {
  //   name.name === 'mikha'
  //     ? dispatcher(nameAction.nameSamar())
  //     : dispatcher(nameAction.nameMikha());
  // }, []);

  //useSelector example to read states

  // let icon = useSelector((state) => state.icon);
  // let name = useSelector((state) => state.name);
  return (
    <section>
      <Head>
        <meta charSet="utf-8" />
        <title>{siteName} | Course data</title>
      </Head>
      {/* {icon.icon}
      {name.name} */}
      <div id="pageCover" className={styles.pageCover}>
        <Image
          alt="page cover"
          src="/img/courseincover.png"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div id="pageData" className={styles.pageData}>
        <div id="pageDataIn" className={styles.pageDataInContainer}>
          <div className={styles.courseInfoContainer}>
            <div
              className={`${styles.courseInfoTitle} ${styles.courseInfoTitle1}`}
            >
              <div className={styles.contentMainTitle_copy}>
                <div className={styles.titleIconContainer}>
                  <IconComponent
                    name="fa-sharp fa-solid fa-chalkboard-user"
                    className={styles.titleIcon}
                  />
                </div>
                <h1>דרישות לרישום מכשור רפואי למתחילים ב ZOOM</h1>
              </div>
            </div>
            <div className={styles.courseInfoNav}>
              <div className={styles.navDataDiv}>
                <div className={styles.pageNavigator}>
                  <NavLink
                    href="/"
                    className={styles.navlink}
                    activeClassName={styles.navlink__active}
                    title={t("common:home")}
                  />
                  /
                  <NavLink
                    href="/serves"
                    className={styles.navlink}
                    activeClassName={styles.navlink__active}
                    title={t("common:serves")}
                  />
                  /
                  <NavLink
                    href="/serves/25"
                    className={styles.navlink}
                    activeClassName={styles.navlink__active}
                    title="קורסים והדרכות"
                  />
                  /
                  <NavLink
                    href={`/serves/course/1`}
                    className={styles.navlink}
                    activeClassName={styles.navlink__active}
                    title={`קורס מסויים`}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${styles.courseInfoTitle} ${styles.courseInfoTitle2}`}
            >
              <div className={styles.contentMainTitle_copy}>
                <h1>דרישות לרישום מכשור רפואי למתחילים ב ZOOM</h1>
              </div>
            </div>
          </div>
          <div id="pageDataIn" className={styles.pageDataIn}>
            <div className={styles.productsContainer}>
              <div className={styles.productsHeader}>
                <div className={styles.productsHeaderActive}>
                  <div className={styles.productsHeaderActiveTitle}>
                    <h2>{t("course:aboutcourse")}</h2>
                  </div>
                </div>
              </div>
              <div className={styles.productsList}>
                <div className={styles.productsListIn}>
                  <div className={styles.productsListUl}>
                    פה יהיה התוכן ממערכת הניהול
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.filterContainer}>
              <div className={styles.filterContainerIn}>
                <div className={styles.filterItemsContainer}>
                  <LeftSide />
                </div>
              </div>
              <div className={styles.filterCircle}>
                <div className={styles.filterCircleIn}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
// ProductsIn.title = `Products`;
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      // Will be passed to the page component as props
    },
  };
}
export default CourseIn;
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
