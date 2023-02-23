import styles from "./index.module.css";
import Image from "next/image";
import NavLink from "../../components/NavLink";
import Head from "next/head";
import { showSiteData } from "../../store/slices/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, i18n } from "next-i18next";
import { getSiteDataAsync } from "../../store/slices/generalSlice";
import IconComponent from "../../components/iconComponent";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";
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
    <div className={styles.footerFormInput}>
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
const Contact = (props) => {
  const router = useRouter();
  const { t } = useTranslation(["common", "contact"]);
  const form = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteDataAsync());
  }, []);
  const siteData = useSelector(showSiteData);
  //all serves <--start-->
  const myLoader = ({ src, width, quality }) => {
    return `https://qrs-global.com/uploads/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  const [from_email, setFromEmail] = useState("");
  const [full_name, setFull_name] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [sendStatus, setSendStatus] = useState(false);

  //all serves <--end-->
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
    if (inputData.phone && inputData.phone.value.trim() !== "") {
      if (validator.isMobilePhone(inputData.phone.value, ["he-IL"])) {
        console.log("valid phone");
      } else {
        notify(`${t("contact:phoneerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }
    if (inputData.message && inputData.message.value.trim() !== "") {
      if (
        validator.isAlphanumeric(inputData.message.value, ["he"], {
          ignore: " ,.?:@()[]-_",
        }) ||
        validator.isAlphanumeric(inputData.message.value, ["en-US"], {
          ignore: " ,.?:@()[]-_",
        })
      ) {
        console.log("valid message");
      } else {
        notify(`${t("contact:messageerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }
    if (inputData.company && inputData.company.value.trim() !== "") {
      if (
        validator.isAlphanumeric(inputData.company.value, ["he"], {
          ignore: " ()-_",
        }) ||
        validator.isAlphanumeric(inputData.company.value, ["en-US"], {
          ignore: " ()-_",
        })
      ) {
        console.log("valid company");
      } else {
        notify(`${t("contact:companyerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }

    emailjs
      .sendForm(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.EMAILJS_USER_ID
      )
      .then(
        (result) => {
          notify(`${t("contact:formsuccess")}`, "success");
          setFromEmail("");
          setFull_name("");
          setPhone("");
          setCompany("");
          setMessage("");
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
  return (
    <section>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Head>
        <meta charSet="utf-8" />
        <title>
          {siteData?.["Title"]} | {t("common:contactus")}
        </title>
      </Head>
      <div id="pageCover" className={styles.pageCover}>
        <Image
          alt="page cover"
          src="/img/contactcover.png"
          layout="fill"
          objectFit="cover"
        />
        {/* <div className={styles.coverTitle}>SERVES</div> */}
      </div>
      <div id="pageData" className={styles.pageData}>
        <div id="pageDataIn" className={styles.pageDataIn}>
          <div className={styles.pageNavigator}>
            <NavLink
              href="/"
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title={t("common:home")}
            />
            /
            <NavLink
              href="/contact"
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title={t("common:contactus")}
            />
          </div>
          <div className={styles.pageRealData}>
            <div className={styles.contentParagraph}>
              <div
                id="homeCircleContainer"
                className={styles.homeCircleContainer}
              >
                <div id="homeCircleCenter" className={styles.homeCircleCenter}>
                  <div className={styles.contactCirclesContainer}>
                    <ul className={styles.contactCirclesItemUL}>
                      <li className={styles.contactCirclesItem}>
                        <NavLink
                          href={`tel:${siteData?.["phone"]}`}
                          className=""
                          activeClassName=""
                        >
                          <div className={styles.contactCirclesItemIcon}>
                            <div className={styles.contactCirclesItemIconOut}>
                              <div className={styles.contactCirclesItemIconIn}>
                                <IconComponent
                                  type="fab"
                                  name="fa-solid fa-phone-volume"
                                  className={styles.contactCirclesItemIconClass}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={styles.contactCirclesItemText}>
                            {siteData?.["phone"]}
                          </div>
                        </NavLink>
                      </li>
                      <li className={styles.contactCirclesItem}>
                        <NavLink
                          href={`tel:${siteData?.["phone2"]}`}
                          className=""
                          activeClassName=""
                        >
                          <div className={styles.contactCirclesItemIcon}>
                            <div className={styles.contactCirclesItemIconOut}>
                              <div className={styles.contactCirclesItemIconIn}>
                                <IconComponent
                                  type="fab"
                                  name="fa-solid fa-phone-volume"
                                  className={styles.contactCirclesItemIconClass}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={styles.contactCirclesItemText}>
                            {siteData?.["phone2"]}
                          </div>
                        </NavLink>
                      </li>
                      <li className={styles.contactCirclesItem}>
                        <NavLink
                          href={`tel:${siteData?.["phone3"]}`}
                          className=""
                          activeClassName=""
                        >
                          <div className={styles.contactCirclesItemIcon}>
                            <div className={styles.contactCirclesItemIconOut}>
                              <div className={styles.contactCirclesItemIconIn}>
                                <IconComponent
                                  type="fab"
                                  name="fa-solid fa-phone-volume"
                                  className={styles.contactCirclesItemIconClass}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={styles.contactCirclesItemText}>
                            {siteData?.["phone3"]}
                          </div>
                        </NavLink>
                      </li>
                      <li className={styles.contactCirclesItem}>
                        <NavLink
                          href={`mailto:${siteData?.["email"]}`}
                          className=""
                          activeClassName=""
                        >
                          <div className={styles.contactCirclesItemIcon}>
                            <div className={styles.contactCirclesItemIconOut}>
                              <div className={styles.contactCirclesItemIconIn}>
                                <IconComponent
                                  type="fab"
                                  name="fa-solid fa-envelope-open"
                                  className={styles.contactCirclesItemIconClass}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={styles.contactCirclesItemText}>
                            {siteData?.["email"]}
                          </div>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className={styles.formAndText}>
                    <div
                      id="footerContainer_in"
                      className={styles.footerContainer_in}
                    >
                      <div id="footerForm" className={styles.footerForm}>
                        <div className={styles.footerTitles}>
                          <h1>{t("common:contactus")}</h1>
                        </div>
                        <form ref={form} onSubmit={sendEmail}>
                          <div className={styles.footerFormRow}>
                            <TextInput
                              type="input"
                              label={t("common:email")}
                              name="from_email"
                              setter={setFromEmail}
                              value={from_email}
                            />
                            <TextInput
                              type="input"
                              label={t("common:fullname")}
                              name="full_name"
                              setter={setFull_name}
                              value={full_name}
                            />
                          </div>
                          <div className={styles.footerFormRow}>
                            <TextInput
                              label={t("common:cellphone")}
                              name="phone"
                              setter={setPhone}
                              value={phone}
                            />
                            <TextInput
                              label={t("common:company")}
                              name="company"
                              setter={setCompany}
                              value={company}
                            />
                          </div>
                          <div
                            className={styles.footerFormRow}
                            style={{ flexDirection: "column" }}
                          >
                            <div className={styles.footerFormTextAreaTitle}>
                              {t("common:message")}
                            </div>
                            <div className={styles.footerFormTextArea}>
                              <textarea
                                placeholder=""
                                name="message"
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                              ></textarea>
                            </div>
                          </div>
                          <div className={styles.footerFormRow}>
                            <div className={styles.formSubscription}>
                              <label>
                                {" "}
                                <input type="checkbox" />
                                {t("contact:interestedinmailsub")}
                              </label>
                            </div>
                            <div className={styles.formSubmit}>
                              <button disabled={sendStatus}>
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
                          </div>
                        </form>
                      </div>
                      <div id="footerText" className={styles.footerText}>
                        <div className={styles.footerTitles}>
                          {siteData?.["Title"]}
                        </div>
                        <div className={styles.footerInfo}>
                          <ul>
                            <li>
                              <NavLink
                                href=""
                                title={siteData?.["address"]}
                                className={styles.footerInfoLink}
                              />
                            </li>
                            <li>
                              טל.{" "}
                              <NavLink
                                href={`tel:${siteData?.["phone"]}`}
                                title={siteData?.["phone"]}
                                className={styles.footerInfoLink}
                              />
                            </li>
                            <li>
                              נייד.{" "}
                              <NavLink
                                href={`tel:${siteData?.["phone2"]}`}
                                title={siteData?.["phone2"]}
                                className={styles.footerInfoLink}
                              />
                            </li>
                            <li>
                              נייד.{" "}
                              <NavLink
                                href={`tel:${siteData?.["phone3"]}`}
                                title={siteData?.["phone3"]}
                                className={styles.footerInfoLink}
                              />
                            </li>
                            <li>
                              <NavLink
                                href={`mailto:${siteData?.["email"]}`}
                                title={siteData?.[0]?.["email"]}
                                className={styles.footerInfoLink}
                              />
                            </li>
                          </ul>
                        </div>
                        <div className={styles.footerSocial}>
                          <ul>
                            <li>
                              <NavLink href="" className={styles.socialIcons}>
                                <IconComponent
                                  type="fab"
                                  name="fa-brands fa-twitter"
                                />
                              </NavLink>
                            </li>
                            <li>
                              <NavLink href="" className={styles.socialIcons}>
                                <IconComponent
                                  type="fab"
                                  name="fa-brands fa-square-facebook"
                                />
                              </NavLink>
                            </li>
                            <li>
                              <NavLink href="" className={styles.socialIcons}>
                                <IconComponent
                                  type="fab"
                                  name="fa-brands fa-youtube"
                                />
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.contactMap}>
                    <div className={styles.contactMapTitle}>
                      {t("common:map")}
                    </div>
                    <div className={styles.contactMapFrame}>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.47031753989!2d35.27621428445091!3d33.017737578978775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c2dec8ec81c1d%3A0x928a13de582e4400!2sQrs%20global!5e0!3m2!1siw!2sil!4v1675347873797!5m2!1siw!2sil"
                        style={{ border: 0, width: "100%", height: "100%" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// export const getStaticProps = async () => {
//   const res1 = await fetch(
//     'https://qrs-global.com/react/serves/servescat.php?id=5'
//   );
//   const data1 = await res1.json();

//   const res2 = await fetch('https://qrs-global.com/react/serves/serves.php');
//   const data2 = await res2.json();
//   return {
//     props: {
//       servescat: data1,
//       allserves: data2,
//     },
//   };
// };
// Serves.title = 'Serves';
export async function getServerSideProps({ locale }) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      // Will be passed to the page component as props
    },
  };
}
export default Contact;
