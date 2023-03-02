import styles from "./in.module.css";
import Image from "next/image";
import NavLink from "../../components/NavLink";
import IconComponent from "../../components/iconComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useState, useRef } from "react";
import { showSiteData } from "../../store/slices/generalSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslation, i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import validator from "validator";
import BeatLoader from "react-spinners/BeatLoader";
import { whatLanguage } from "../../utils/helperFunctions";

//create floating text input
function TextInput({
  type = "text",
  label,
  name,
  required = false,
  value,
  setter,
}) {
  // const [value, setValue] = useState("");

  function handleChange(e) {
    setter(e.target.value);
  }

  return (
    <div className={styles.coursesFormInput}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        name={name}
        required={required}
      />
      <label className={value && styles.filled} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
//create floating select
function SelectInput({
  type = "text",
  label,
  name,
  onclick,
  coursescats = undefined,
  setter,
  value,
  lang,
}) {
  // const [value, setValue] = useState("");

  function handleChange(e) {
    setter(e.target.value);
  }

  return (
    <div className={styles.coursesFormInput}>
      {/* <input
        type={type}
        value={value}
        onChange={handleChange}
        onClick={onclick}
      /> */}
      <select onClick={onclick} onChange={handleChange}>
        <option defaultValue={""} value=""></option>
        {coursescats?.map((item) => {
          return (
            <option value={item.id} key={item.id} defaultValue={value}>
              {whatLanguage(lang, item, "title")}
            </option>
          );
        })}
      </select>
      <label className={value && styles.filled} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
//date picker custom input
// eslint-disable-next-line react/display-name
const FloatingDatePicker = forwardRef(
  ({ value, onClick, name, label, type = "text" }, ref) => (
    <div className={styles.coursesFormInput}>
      <input type={type} value={value} onClick={onClick} />
      <label className={value && styles.filled} htmlFor={name}>
        {label}
      </label>
    </div>
  )
);
const LearningIn = ({ serve, courses, coursescats, lang }) => {
  const router = useRouter();
  const { id } = router.query;
  //datepicker state:

  const siteData = useSelector(showSiteData);
  const [thecourses, setTheCourses] = useState(courses);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const { t } = useTranslation(["common"]);

  const theserve = serve.serves || "";
  const form = useRef();
  const [filter_title, setFilterTitle] = useState("");
  const [filter_cat, setFilterCat] = useState(0);
  const [startDate, setStartDate] = useState("");
  const filterCourses = async (e) => {
    setLoadingCourses(true);
    e.preventDefault();
    // const inputData = e.target.elements;
    let coursedate = "";
    let searchParam = "";
    //validate date
    if (startDate !== "") {
      if (validator.isDate(startDate)) {
        let month = String(startDate.getUTCMonth() + 1); //months from 1-12
        if (month.length === 1) {
          month = "0" + month;
        }
        const day = startDate.getUTCDate();
        const year = startDate.getUTCFullYear();
        // const newdate = year + "/" + month + "/" + day;
        coursedate = year + "-" + month;
        searchParam += `&date=${coursedate}`;
        console.log("dateeee", coursedate);
      } else {
        console.log("not dateeee");
        return;
      }
    }
    if (filter_title !== "") {
      if (
        validator.isAlphanumeric(filter_title, ["he"], {
          ignore: " ",
        }) ||
        validator.isAlphanumeric(filter_title, ["en-US"], {
          ignore: " ",
        })
      ) {
        console.log("titleeee");
        searchParam += `&title=${filter_title}`;
      } else {
        console.log("wrong title");
        return;
      }
    }
    if (filter_cat !== "") {
      searchParam += `&cat=${filter_cat}`;
    }
    let searchStr = searchParam !== "" ? searchParam.substring(1) : "";
    searchStr = searchStr !== "" ? "?" + searchStr : searchStr;
    console.log(searchStr);
    const res = await fetch(
      `https://qrs-global.com/react/courses/index.php${searchStr}`
    );
    const courses = await res.json();
    setTheCourses([]);
    courses && setTheCourses(courses.allcourses);
    setLoadingCourses(false);
  };
  return (
    <section>
      <Head>
        <meta charSet="utf-8" />
        <title>
          {siteData["Title"]} | {whatLanguage(lang, theserve, "title")}
        </title>
      </Head>
      <div id="pageCover" className={styles.pageCover}>
        <Image
          alt="page cover"
          src="/img/learningcover.jpg"
          layout="fill"
          objectFit="cover"
        />
        {/* <div className={styles.coverTitle}>SERVES</div> */}
      </div>
      <div id="pageData" className={styles.pageData}>
        <div id="pageDataIn" className={styles.pageDataIn}>
          {/* <div className={styles.pageNavigator}>
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
          </div> */}
          <div className={styles.pageRealData}>
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
                href={`/serves/${id}`}
                className={styles.navlink}
                activeClassName={styles.navlink__active}
                title={`${whatLanguage(lang, theserve, "title")}`}
              />
            </div>
            <div className={styles.contentParagraph_copy1}>
              <div className={styles.contentParagraph_copy1_text}>
                <div className={styles.contentMainTitle_copy}>
                  <div className={styles.titleIconContainer}>
                    <IconComponent
                      name="fa-sharp fa-solid fa-chalkboard-user"
                      className={styles.titleIcon}
                    />
                  </div>
                  <h1>{whatLanguage(lang, theserve, "title")}</h1>
                </div>
                <div
                  className={styles.contentText}
                  dangerouslySetInnerHTML={{
                    __html: whatLanguage(lang, theserve, "text"),
                  }}
                ></div>
              </div>
              <div className={styles.contentParagraph_copy1_img}>
                <Image
                  alt="page cover"
                  src="/img/servesin.png"
                  width={624}
                  height={670}
                  objectFit="scale-down"
                />
              </div>
            </div>
            {(theserve.title?.includes("courses") ||
              theserve.title?.includes("הדרכות") ||
              theserve.title?.includes("קורסים")) && (
              <div className={styles.contentParagraph_copy2}>
                <div className={styles.coursesListTitle}>
                  <h2>{t("common:courseslist")}</h2>
                </div>
                <div className={styles.coursesListContainer}>
                  <div className={styles.coursesListFormContainer}>
                    <form ref={form} onSubmit={filterCourses}>
                      <div className={styles.coursesListFormFullRow}>
                        <TextInput
                          label={t("common:title")}
                          name="address"
                          type="input"
                          setter={setFilterTitle}
                          value={filter_title}
                        />
                      </div>
                      <div className={styles.coursesListFormFullRow}>
                        <div
                          className={styles.coursesListFormHalfRow}
                          style={{ paddingInlineEnd: "10px" }}
                        >
                          <DatePicker
                            type="input"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            customInput={
                              <FloatingDatePicker
                                name="startdate"
                                label={t("common:fromdate")}
                              />
                            }
                            dateFormat="MM/dd/yyyy"
                            // dateFormat='Pp'
                          />
                          {startDate ? (
                            <div
                              onClick={() => setStartDate("")}
                              className={styles.datePickerClearIcon}
                            >
                              <IconComponent type="fab" name="fa-solid fa-x" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className={styles.coursesListFormHalfRow}>
                          <div className={styles.coursesFormInput}>
                            <SelectInput
                              name="cat"
                              value={filter_cat}
                              setter={setFilterCat}
                              coursescats={coursescats}
                              label={t("common:choosecategory")}
                              lang={lang}
                            />
                          </div>
                        </div>
                        <div
                          className={styles.coursesListFormHalfRow}
                          style={{ flex: 0.7, marginInlineStart: "0.5vw" }}
                        >
                          <button className={styles.coursesFormButton}>
                            {t("common:search")}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className={styles.coursesList}>
                    {!loadingCourses && thecourses ? (
                      thecourses?.map((item, index) => {
                        return index % 2 === 0 ? (
                          <div className={styles.courseItem} key={item.id}>
                            <div className={styles.courseItemIn}>
                              <div className={styles.courseItemInInside}>
                                <div className={styles.courseItemInInsideImg}>
                                  <NavLink
                                    href={`/serves/course/${item.id}`}
                                    className={
                                      styles.courseItemInInsideImg_link
                                    }
                                    activeClassName={
                                      styles.courseItemInInsideImg_link
                                    }
                                  >
                                    {t("common:todetails")}
                                    <br />
                                    {t("common:andregister")}
                                  </NavLink>
                                </div>
                                <div className={styles.courseItemInInsideText}>
                                  <NavLink
                                    href={`/serves/course/${item.id}`}
                                    className={
                                      styles.courseItemInInsideText_link
                                    }
                                    activeClassName={
                                      styles.courseItemInInsideText_link
                                    }
                                  >
                                    {whatLanguage(lang, item, "title")} <br />
                                    {whatLanguage(lang, item, "description")}
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.courseItem} key={item.id}>
                            <div className={styles.courseItemIn2}>
                              <div className={styles.courseItemInInside2}>
                                <div className={styles.courseItemInInside2Text}>
                                  <NavLink
                                    href={`/serves/course/${item.id}`}
                                    className={
                                      styles.courseItemInInsideText_link
                                    }
                                    activeClassName={
                                      styles.courseItemInInsideText_link
                                    }
                                  >
                                    {whatLanguage(lang, item, "title")} <br />
                                    {whatLanguage(lang, item, "description")}
                                  </NavLink>
                                </div>
                                <div className={styles.courseItemInInside2Img}>
                                  <NavLink
                                    href={`/serves/course/${item.id}`}
                                    className={
                                      styles.courseItemInInsideImg_link
                                    }
                                    activeClassName={
                                      styles.courseItemInInsideImg_link
                                    }
                                  >
                                    {t("common:todetails")}
                                    <br />
                                    {t("common:andregister")}
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                            <div className={styles.courseItemCircle}></div>
                          </div>
                        );
                      })
                    ) : (
                      <div className={styles.loader}>
                        <BeatLoader
                          color="#004b8d"
                          size={15}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// This function gets called at build time
export async function getServerSideProps({ params, locale }) {
  // Call an external API endpoint to get posts
  const res = await fetch("https://qrs-global.com/react/serves/serves.php");
  const serves = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = serves.allserves.map((serve) => ({
    params: { id: serve.id },
  }));

  const res2 = await fetch(
    `https://qrs-global.com/react/serves/index.php?id=${params.id}`
  );
  const serve = await res2.json();

  let courses = null;
  let coursescats = null;

  if (
    serve?.serves?.title?.includes("courses") ||
    serve?.serves?.title?.includes("הדרכות") ||
    serve?.serves?.title?.includes("קורסים")
  ) {
    const res3 = await fetch(`https://qrs-global.com/react/courses/index.php`);
    courses = await res3.json();

    const res4 = await fetch(`https://qrs-global.com/react/courses/cats.php`);
    coursescats = await res4.json();
  }
  if (process.env.NODE_ENV === "development") {
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      lang: locale ?? "he",
      serve,
      courses: courses?.allcourses || null,
      coursescats: coursescats?.allcoursescats || null,
      paths: [...paths],
      fallback: false,
    },
  };
}

// This also gets called at build time
// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(
//     `https://qrs-global.com/react/serves/index.php?id=${params.id}`
//   );
//   const serve = await res.json();

//   // Pass post data to the page via props
//   return {
//     props: {
//       serve,
//     },
//   };
// }
// Learning.title = 'Learning';
export default LearningIn;
