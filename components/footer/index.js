import Link from "next/link";
import styles from "./index.module.css";
import NavLink from "../NavLink";
import IconComponent from "../iconComponent";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  showSiteData,
  getSiteDataAsync,
} from "../../store/slices/generalSlice";
import { useRouter } from "next/router";
import emailjs from "@emailjs/browser";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
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
const TheToast = () => {
  return (
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
  );
};
const Footer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteDataAsync());
  }, []);
  const siteData = useSelector(showSiteData);
  // const { t } = useTranslation(["common", "contact"]);
  const router = useRouter();
  const form = useRef();
  const [from_email, setFromEmail] = useState("");
  const [full_name, setFull_name] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [sendStatus, setSendStatus] = useState(false);
  const { t } = useTranslation(["common", "contact"]);
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
        setSendStatus(false);
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
        setSendStatus(false);
      } else {
        notify(`${t("contact:fullnameerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }
    if (inputData.phone && inputData.phone.value.trim() !== "") {
      if (validator.isMobilePhone(inputData.phone.value, ["he-IL"])) {
        console.log("valid phone");
        setSendStatus(false);
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
        setSendStatus(false);
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
        setSendStatus(false);
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
    <footer>
      <div id="footerContainer" className={styles.footerContainer}>
        <TheToast />
        {router?.pathname !== "/contact" && (
          <div id="footerContainer_in" className={styles.footerContainer_in}>
            <div id="footerForm" className={styles.footerForm}>
              <div className={styles.footerTitles}>{t("common:contactus")}</div>
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
                    label={t("common:phone")}
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
                      {sendStatus ? <div>a</div> : t("common:send")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div id="footerText" className={styles.footerText}>
              <div className={styles.footerTitles}>קיו אר אס מדיקל</div>
              <div className={styles.footerInfo}>
                <ul>
                  <li>
                    <NavLink
                      href=""
                      title={siteData?.[0]?.["address"]}
                      className={styles.footerInfoLink}
                    />
                  </li>
                  <li>
                    טל.{" "}
                    <NavLink
                      href=""
                      title={siteData?.[0]?.["phone"]}
                      className={styles.footerInfoLink}
                    />
                  </li>
                  <li>
                    נייד.{" "}
                    <NavLink
                      href=""
                      title={siteData?.[0]?.["phone2"]}
                      className={styles.footerInfoLink}
                    />
                  </li>
                  <li>
                    נייד.{" "}
                    <NavLink
                      href=""
                      title={siteData?.[0]?.["phone3"]}
                      className={styles.footerInfoLink}
                    />
                  </li>
                  <li>
                    <NavLink
                      href=""
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
                      <IconComponent type="fab" name="fa-brands fa-twitter" />
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
                      <IconComponent type="fab" name="fa-brands fa-youtube" />
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
export default Footer;
