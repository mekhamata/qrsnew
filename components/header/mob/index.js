import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useTranslation } from "next-i18next";
const MobHeader = ({ header_allserves }) => {
  const [showNav, setShowNav] = useState(false);
  let classlist = "classlist";
  const toggleMenu = () => {
    setShowNav(!showNav);
  };
  const { t } = useTranslation(["common"]);
  return (
    <div id="container" className={styles.container}>
      <div id="mobileMenuOpener" className={styles.mobileMenuOpener}>
        <div id="menuOpenerBars" className={styles.menuOpenerBars}>
          {/* <icon-component
          @click="showNav = !showNav"
          iconName="fa-solid fa-bars"
          class="mobileMenuOpener"
        ></icon-component> */}
          <FontAwesomeIcon
            icon={faBars}
            className={styles.mobileMenuOpenerText}
            onClick={toggleMenu}
          />
        </div>
        <div id="menuOpenerLogo" className={styles.menuOpenerLogo}>
          <div id="logoDiv" className={styles.logoDiv}>
            <div id="catalogBtn" className={styles.catalogBtn}>
              <div id="catalogBtnIn" className={styles.catalogBtnIn}>
                <a href="" alt="" title="">
                  קטלוג
                </a>
              </div>
            </div>
            <div className={styles.logoContainer}>
              <Image
                src={"/img/logo.png"}
                width="154"
                height="82"
                alt="logo"
                layout="responsive"
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="headerUlComponentContainer"
        className={`${
          showNav
            ? styles.headerUlComponentContainer_opened
            : styles.headerUlComponentContainer
        }`}
      >
        <ul id="headerUlComponent" className={styles.headerUlComponent}>
          <li key={1}>
            <Link href="/en">
              <a className={styles.navlink}>EN</a>
            </Link>
          </li>
          <li key={2}>
            <Link href="/">
              <a className={styles.navlink}>{t("common:main")}</a>
            </Link>
          </li>
          <li key={3}>
            <Link href="/about">
              <a className={styles.navlink}>{t("common:about")}</a>
            </Link>
          </li>
          <li key={4}>
            <Link href="/serves">
              <a className={styles.navlink}>{t("common:serves")}</a>
            </Link>
          </li>
          <li key={5}>
            <Link href="/products">
              <a className={styles.navlink}>{t("common:products")}</a>
            </Link>
          </li>
          <li key={6}>
            <Link href="/contact">
              <a className={styles.navlink}>{t("common:contactus")}</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MobHeader;
