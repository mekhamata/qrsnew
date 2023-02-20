import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useLayoutEffect } from "react";
import MobHeader from "./mob";
import WebHeader from "./web";
import NavLink from "../NavLink";
import {
  showSiteData,
  getSiteDataAsync,
} from "../../store/slices/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteDataAsync());
  }, []);
  const [mobileView, setMobileView] = useState(false);
  const [width, height] = useWindowSize();
  useLayoutEffect(() => {
    setMobileView(width <= 991);
  }, [width, mobileView]);
  const siteData = useSelector(showSiteData);
  const { t } = useTranslation(["common"]);
  return (
    <header>
      <div id="headerPass" className={styles.headerPass}>
        <div id="headerBlue" className={styles.headerBlue}>
          <div id="headerBlueIn" className={styles.headerBlueIn}>
            <div id="headerAddress" className={styles.headerAddress}>
              <NavLink
                href="/en"
                className={styles.headerAddressLink}
                activeClassName={styles.navlink_active}
              >
                {siteData?.[0]?.["phone"]}{" "}
                <span className={styles.headerAddressSpan}>|</span>
              </NavLink>
              <NavLink
                href="/en"
                className={styles.headerAddressLink}
                activeClassName={styles.navlink_active}
              >
                {siteData?.[0]?.["phone2"]}{" "}
                <span className={styles.headerAddressSpan}>|</span>
              </NavLink>
              <NavLink
                href="/en"
                className={styles.headerAddressLink}
                activeClassName={styles.navlink_active}
              >
                {siteData?.[0]?.["phone3"]}{" "}
                <span className={styles.headerAddressSpan}>|</span>
              </NavLink>
              <NavLink
                href="/en"
                className={styles.headerAddressLink}
                activeClassName={styles.navlink_active}
              >
                {siteData?.[0]?.["email"] + " "}
                <span className={styles.headerAddressSpan}>|</span>
              </NavLink>
              <NavLink
                href="/en"
                className={styles.headerAddressLink}
                activeClassName={styles.navlink_active}
              >
                {siteData?.[0]?.["address"]}
              </NavLink>
            </div>
          </div>
          <div id="menuUl" className={styles.menuUl}>
            {/* <navigation-web v-if="!mobileView" />
          <navigation-mob v-if="mobileView" /> */}
            {mobileView ? <MobHeader /> : <WebHeader />}
          </div>
        </div>
        {/* <div id="headerWhite" v-if="!mobileView"> */}
        {!mobileView && (
          <div id="headerWhite" className={styles.headerWhite}>
            <div id="catalogBtn" className={styles.catalogBtn}>
              <div id="catalogBtnIn" className={styles.catalogBtnIn}>
                <NavLink
                  href=""
                  title={t("common:catalog")}
                  className={styles.catalogBtnInLink}
                />
              </div>
            </div>
            <div id="logoDiv" className={styles.logoDiv}>
              <div className={styles.logoContainer}>
                <Image
                  src="/img/logo.png"
                  width="154"
                  height="82"
                  alt="logo"
                  layout="responsive"
                  priority={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
