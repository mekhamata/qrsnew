/* eslint-disable react/no-unescaped-entities */
import styles from "./index.module.css";
import Image from "next/image";
import NavLink from "../../../components/NavLink";
import { useTranslation, i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { showSiteData } from "../../../store/slices/generalSlice";
import Head from "next/head";
import CheckBox from "react-animated-checkbox";
import IconComponent from "../../../components/iconComponent";
import { RWebShare } from "react-web-share";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import validator from "validator";
import BeatLoader from "react-spinners/BeatLoader";
import { whatLanguage } from "../../../utils/helperFunctions";

const LeftSide = ({ course, lang }) => {
  const { t } = useTranslation(["common", "course"]);
  const form = useRef();
  const [from_email, setFromEmail] = useState("");
  const [full_name, setFull_name] = useState("");
  const [phone, setPhone] = useState("");
  const message = `הרשמה לקורס: <a href='${window.location.href}'>${course.title}</a>`;
  const [sendStatus, setSendStatus] = useState(false);
  const teachers_arr = [
    { teacher: whatLanguage(lang, course, "teacher1"), phone: course.phone1 },
  ];
  if (course.teacher2 && course.teacher2.trim() !== "") {
    teachers_arr.push({
      teacher: whatLanguage(lang, course, "teacher2"),
      phone: course.phone2,
    });
  }
  if (course.teacher3 && course.teacher3.trim() !== "") {
    teachers_arr.push({
      teacher: whatLanguage(lang, course, "teacher3"),
      phone: course.phone3,
    });
  }
  if (course.teacher4 && course.teacher4.trim() !== "") {
    teachers_arr.push({
      teacher: whatLanguage(lang, course, "teacher4"),
      phone: course.phone4,
    });
  }
  if (course.teacher5 && course.teacher5.trim() !== "") {
    teachers_arr.push({
      teacher: whatLanguage(lang, course, "teacher5"),
      phone: course.phone5,
    });
  }

  console.log(sendStatus, "ttt");
  const notify = (msg, type) => {
    toast.dismiss();
    if (type === "success") {
      return toast.success(<div style={{ textAlign: "center" }}>{msg}</div>, {
        theme: "colored",
      });
    } else {
      return toast.error(<div style={{ textAlign: "center" }}>{msg}</div>, {
        theme: "colored",
      });
    }
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    setSendStatus(true);

    const inputData = e.target.elements;

    if (inputData.full_name) {
      if (
        validator.isAlpha(inputData.full_name.value, ["he"], {
          ignore: " ",
        }) ||
        validator.isAlpha(inputData.full_name.value, ["en-US"], {
          ignore: " ",
        })
      ) {
        console.log("valid name");
      } else {
        notify(`${t("contact:fullnameerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }
    if (inputData.phone) {
      if (validator.isMobilePhone(inputData.phone.value, ["he-IL"])) {
        console.log("valid phone");
      } else {
        notify(`${t("contact:phoneerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }
    if (inputData.from_email) {
      if (validator.isEmail(inputData.from_email.value)) {
        console.log("valid email");
      } else {
        // alert("Enter valid Email!");
        notify(`${t("contact:emailerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }
    emailjs
      .sendForm(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID_COURSE,
        form.current,
        process.env.EMAILJS_USER_ID
      )
      .then(
        (result) => {
          notify(`${t("contact:formsuccess")}`, "success");
          setFromEmail("");
          setFull_name("");
          setPhone("");
          setSendStatus(false);
          // inputData.from_email.value = "";
          // inputData.full_name.value = "";
          // inputData.phone.value = "";
          // inputData.company.value = "";
          // inputData.message.value = "";
        },
        (error) => {
          setSendStatus(false);
          notify(`${t("contact:formerror")}`, "error");
        }
      );
  };

  const TeacherRow = ({ lang }) => {
    return teachers_arr.map((item, index) => {
      return (
        <div className={styles.realLeftSide_lines} key={index}>
          <div className={styles.realLeftSide_lines_a}>
            {whatLanguage(lang, item, "teacher")}
          </div>
          <div className={styles.realLeftSide_lines_b}>
            <NavLink
              href={`tel:${item.phone}`}
              className={styles.navlink__active}
              activeClassName={styles.navlink__active}
              title={item.phone}
            />
          </div>
        </div>
      );
    });
  };

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
            href=""
            className={styles.navlink__active}
            activeClassName={styles.navlink__active}
            title={whatLanguage(lang, course.cat_data, "title")}
          />
        </div>
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>
          {t("course:courselength")}:
        </div>
        <div className={styles.realLeftSide_lines_b}>
          {whatLanguage(lang, course, "coursetime")}
        </div>
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>
          {t("course:startdate")}:
        </div>
        <div className={styles.realLeftSide_lines_b}>{course.startdate}</div>
      </div>
      <div className={styles.realLeftSide_greyTitle}>
        {t("course:coursecoo")}
      </div>
      <TeacherRow lang={lang} />
      {/* <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>סמאח אלקוט ח'טיב</div>
        <div className={styles.realLeftSide_lines_b}>0547256024</div>
      </div> */}
      <div className={styles.realLeftSide_greyTitle}>
        {t("course:interested")}
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>
          {t("course:sendtofriend")}
        </div>
        <div className={styles.realLeftSide_lines_b}>
          <RWebShare
            data={{
              text: `${whatLanguage(lang, course, "description")}`,
              url: window.location.href,
              title: `${whatLanguage(lang, course, "title")}`,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <div
              className={styles.realLeftSide_lines_b_iconContainer}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.realLeftSide_lines_b_iconCover}>
                <IconComponent
                  name="fa-sharp fa-solid fa-envelope-open-text"
                  className={styles.realLeftSide_lines_b_icon}
                />
              </div>
            </div>
          </RWebShare>
        </div>
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a}>
          {t("course:downloadregisterdoc")}
        </div>
        <div className={styles.realLeftSide_lines_b}>
          <NavLink
            href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${whatLanguage(
              lang,
              course,
              "file"
            )}`}
            className={styles.navlink__active}
            activeClassName={styles.navlink__active}
            title=""
            target="_blank"
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
          <div className={styles.realLeftSide_lines_b_iconContainer}>
            <div className={styles.realLeftSide_lines_b_iconCover}>
              <IconComponent
                name="fa-sharp fa-solid fa-file-invoice"
                className={styles.realLeftSide_lines_b_icon}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.realLeftSide_blueTitle}>
        {t("course:moreinfo")}
        <br />
        {t("course:filldetails")}
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div className={styles.realLeftSide_form_input}>
          <input
            type="text"
            name="full_name"
            placeholder={t("common:fullname")}
            value={full_name}
            onChange={(e) => setFull_name(e.target.value)}
          />
        </div>
        <div className={styles.realLeftSide_form_input}>
          <input
            type="text"
            name="phone"
            placeholder={t("common:phone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.realLeftSide_form_input}>
          <input
            type="text"
            name="from_email"
            placeholder={t("common:email")}
            value={from_email}
            onChange={(e) => setFromEmail(e.target.value)}
          />
          <input type="hidden" name="message" value={message} />
        </div>
        <input type="hidden" name="courseData" />
        <div className={styles.realLeftSide_form_button}>
          <button disabled={sendStatus} type="submit">
            {sendStatus ? (
              <BeatLoader
                color="#ffffff"
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              t("common:send")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
const CourseIn = ({ course, lang }) => {
  const siteData = useSelector(showSiteData);
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
  if (!course) {
    return;
  }
  return (
    <section>
      <Head>
        <meta charSet="utf-8" />
        <title>
          {siteData["Title"]} | {whatLanguage(lang, course, "title")}
        </title>
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
                <h1>{whatLanguage(lang, course, "title")}</h1>
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
                    title={t("course:coursesandtutorials")}
                  />
                  {/* /
                  <NavLink
                    href={`/serves/course/${course.id}`}
                    className={styles.navlink}
                    activeClassName={styles.navlink__active}
                    title={course.title}
                  /> */}
                </div>
              </div>
            </div>
            <div
              className={`${styles.courseInfoTitle} ${styles.courseInfoTitle2}`}
            >
              <div className={styles.contentMainTitle_copy}>
                <h1>{whatLanguage(lang, course, "title")}</h1>
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
                  <div
                    className={styles.productsListUl}
                    dangerouslySetInnerHTML={{
                      __html: whatLanguage(lang, course, "text"),
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className={styles.filterContainer}>
              <div className={styles.filterContainerIn}>
                <div className={styles.filterItemsContainer}>
                  <LeftSide course={course} lang={lang} />
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
export async function getServerSideProps({ locale, params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/react/courses/index.php?id=${params.id}`
  );
  const course = await res.json();
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      course: course?.allcourses,
      lang: locale ?? "he",
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
