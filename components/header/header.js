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
  // getServesAsync,
  showServesData,
} from "../../store/slices/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { whatLanguage } from "../../utils/helperFunctions";
import IconComponent from "../iconComponent";

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
    // dispatch(getServesAsync());
  }, []);
  const router = useRouter();
  const [mobileView, setMobileView] = useState(false);
  const [width, height] = useWindowSize();
  useLayoutEffect(() => {
    setMobileView(width <= 991);
  }, [width, mobileView]);
  const siteData = useSelector(showSiteData);
  // const servesData = useSelector(showServesData);
  const { t } = useTranslation(["common"]);
  return (
    <header>
      <div id="headerPass" className={styles.headerPass}>
        <div id="headerBlue" className={styles.headerBlue}>
          <div id="headerBlueIn" className={styles.headerBlueIn}>
            <div id="headerAddress" className={styles.headerAddress}>
              <NavLink
                href={`tel:${siteData?.["phone"]}`}
                className={styles.headerAddressLink}
                activeClassName={styles.navlink_active}
              >
                <div className={styles.headerBarText}>
                  {siteData?.["phone"]}{" "}
                  <span className={styles.headerAddressSpan}>|</span>
                </div>
                <div className={styles.headerBarIcons}>
                  <IconComponent type="fab" name="fa-solid fa-phone" />
                </div>
              </NavLink>
              <NavLink
                href={`tel:${siteData?.["phone2"]}`}
                className={styles.headerAddressLink}
                activeClassName={styles.navlink_active}
              >
                <div className={styles.headerBarText}>
                  {siteData?.["phone2"]}{" "}
                  <span className={styles.headerAddressSpan}>|</span>
                </div>
                <div className={styles.headerBarIcons}>
                  <IconComponent type="fab" name="fa-solid fa-mobile" />
                </div>
              </NavLink>
              <NavLink
                href={`tel:${siteData?.["phone3"]}`}
                className={styles.headerAddressLink}
                activeClassName={styles.navlink_active}
              >
                <div className={styles.headerBarText}>
                  {siteData?.["phone3"]}{" "}
                  <span className={styles.headerAddressSpan}>|</span>
                </div>
                <div className={styles.headerBarIcons}>
                  <IconComponent type="fab" name="fa-solid fa-mobile" />
                </div>
              </NavLink>
              <NavLink
                href={`mailto:${siteData?.["email"]}`}
                className={styles.headerAddressLink}
                activeClassName={styles.navlink_active}
              >
                <div className={styles.headerBarText}>
                  {siteData?.["email"] + " "}
                  <span className={styles.headerAddressSpan}>|</span>
                </div>
                <div className={styles.headerBarIcons}>
                  <IconComponent type="fab" name="fa-solid fa-envelope" />
                </div>
              </NavLink>
              <NavLink
                target="_blank"
                href={siteData?.["wazelink"]}
                className={styles.headerAddressLink}
                activeClassName={styles.navlink_active}
              >
                {whatLanguage(router.locale, siteData, "address")}
              </NavLink>
            </div>
          </div>
          <div id="menuUl" className={styles.menuUl}>
            {/* <navigation-web v-if="!mobileView" />
          <navigation-mob v-if="mobileView" /> */}
            {mobileView ? (
              // <MobHeader header_allserves={servesData} />
              <MobHeader />
            ) : (
              // <WebHeader header_allserves={servesData} />
              <WebHeader />
            )}
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
