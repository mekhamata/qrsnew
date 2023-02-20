import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const MobHeader = () => {
  const [showNav, setShowNav] = useState(false);
  let classlist = 'classlist';
  const toggleMenu = () => {
    setShowNav(!showNav);
  };
  return (
    <div id='container' className={styles.container}>
      <div id='mobileMenuOpener' className={styles.mobileMenuOpener}>
        <div id='menuOpenerBars' className={styles.menuOpenerBars}>
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
        <div id='menuOpenerLogo' className={styles.menuOpenerLogo}>
          <div id='logoDiv' className={styles.logoDiv}>
            <div id='catalogBtn' className={styles.catalogBtn}>
              <div id='catalogBtnIn' className={styles.catalogBtnIn}>
                <a href='' alt='' title=''>
                  קטלוג
                </a>
              </div>
            </div>
            <div className={styles.logoContainer}>
              <Image
                src={'/img/logo.png'}
                width='154'
                height='82'
                alt='logo'
                layout='responsive'
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id='headerUlComponentContainer'
        className={`${
          showNav
            ? styles.headerUlComponentContainer_opened
            : styles.headerUlComponentContainer
        }`}
      >
        <ul id='headerUlComponent' className={styles.headerUlComponent}>
          <li>
            <Link href='/en'>
              <a className={styles.navlink}>EN</a>
            </Link>
          </li>
          <li>
            <Link href='/'>
              <a className={styles.navlink}>ראשי</a>
            </Link>
          </li>
          <li>
            <Link href='/about'>
              <a className={styles.navlink}>אודות</a>
            </Link>
          </li>
          <li>
            <Link href='/serves'>
              <a className={styles.navlink}>שירותים</a>
            </Link>
          </li>
          <li>
            <Link href='/products'>
              <a className={styles.navlink}>מוצרים</a>
            </Link>
          </li>
          <li>
            <Link href='/contact'>
              <a className={styles.navlink}>צור קשר</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MobHeader;
