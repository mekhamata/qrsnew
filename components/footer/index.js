import Link from "next/link";
import styles from "./index.module.css";
import NavLink from "../NavLink";
import IconComponent from "../iconComponent";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  showSiteData,
  getSiteDataAsync,
} from "../../store/slices/generalSlice";
import { useRouter } from "next/router";
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
function TextInput({ type = "text", label, name }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className={styles.footerFormInput}>
      <input type={type} value={value} onChange={handleChange} />
      <label className={value && styles.filled} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
const Footer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteDataAsync());
  }, []);
  const siteData = useSelector(showSiteData);
  const router = useRouter();
  return (
    <footer>
      <div id="footerContainer" className={styles.footerContainer}>
        {router?.pathname !== "/contact" && (
          <div id="footerContainer_in" className={styles.footerContainer_in}>
            <div id="footerForm" className={styles.footerForm}>
              <div className={styles.footerTitles}>צור קשר</div>
              <div className={styles.footerFormRow}>
                <TextInput label="כתובת" name="address" />
                <TextInput label="שם מלא" name="fullname" />
              </div>
              <div className={styles.footerFormRow}>
                <TextInput label="טלפון" name="phone" />
                <TextInput label="חברה" name="company" />
              </div>
              <div
                className={styles.footerFormRow}
                style={{ flexDirection: "column" }}
              >
                <div className={styles.footerFormTextAreaTitle}>הודעה</div>
                <div className={styles.footerFormTextArea}>
                  <textarea placeholder=""></textarea>
                </div>
              </div>
              <div className={styles.footerFormRow}>
                <div className={styles.formSubscription}>
                  <label>
                    {" "}
                    <input type="checkbox" />
                    כן, אני מעוניין לקבל מייל
                  </label>
                </div>
                <div className={styles.formSubmit}>
                  <button>שלח</button>
                </div>
              </div>
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
