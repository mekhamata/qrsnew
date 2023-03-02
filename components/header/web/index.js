import Link from "next/link";
import NavLink from "../../NavLink";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useHEADER } from "../../contexts/HeaderContext";
import { whatLanguage } from "../../../utils/helperFunctions";
import IconComponent from "../../iconComponent";
import { useSelector, useDispatch } from "react-redux";
const WebHeader = () => {
  const router = useRouter();
  const { t } = useTranslation(["common"]);
  const { serves } = useHEADER();
  const cartItemsNumber = useSelector((state) => state.cart.cart).length | 0;
  return (
    <ul id="headerUlComponent" className={styles.headerUlComponent}>
      <li key={1}>
        {/* <NavLink
          title='EN'
          href=''
          clickEvent={() => {
            alert('hi');
          }}
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        /> */}
        <Link
          href={router.asPath}
          locale={router.locale === "he" ? "en" : "he"}
        >
          <a className={styles.navlink}>
            {router.locale === "he" ? "EN" : "עב"}
          </a>
        </Link>
      </li>
      <li key={2}>
        <NavLink
          title={t("common:main")}
          href="/"
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        />
      </li>
      <li key={3}>
        <NavLink
          title={t("common:about")}
          href="/about"
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        />
      </li>
      <li key={4}>
        <NavLink
          title={t("common:serves")}
          href="/serves"
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        >
          <div className={styles.subUl}>
            <div className={styles.subUlRelative}>
              <ul>
                {serves?.map((item) => {
                  return (
                    <li key={item.id}>
                      <NavLink
                        title={whatLanguage(router.locale, item, "title")}
                        href={`/serves/${item.id}`}
                        className={styles.subMenuLink}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </NavLink>
      </li>
      <li key={5}>
        <NavLink
          title={t("common:products")}
          href="/products"
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        />
      </li>
      <li key={6}>
        <NavLink
          title={t("common:contactus")}
          href="/contact"
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        />
      </li>
      <li key={7}>
        <NavLink
          href="/cart"
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        >
          <IconComponent type="fab" name="fa-shopping-cart" />{" "}
          {cartItemsNumber > 0 && <>({cartItemsNumber})</>}
        </NavLink>
      </li>
    </ul>
  );
};
export default WebHeader;
