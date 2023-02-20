import Link from 'next/link';
import NavLink from '../../NavLink';
import styles from './index.module.css';
import { useRouter } from 'next/router';
const WebHeader = () => {
  const router = useRouter();
  return (
    <ul id='headerUlComponent' className={styles.headerUlComponent}>
      <li>
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
          locale={router.locale === 'he' ? 'en' : 'he'}
        >
          <a className={styles.navlink}>
            {router.locale === 'he' ? 'EN' : 'עב'}
          </a>
        </Link>
      </li>
      <li>
        <NavLink
          title='ראשי'
          href='/'
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        />
      </li>
      <li>
        <NavLink
          title='אודות'
          href='/about'
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        />
      </li>
      <li>
        <NavLink
          title='שירותים'
          href='/serves'
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        >
          <div className={styles.subUl}>
            <div className={styles.subUlRelative}>
              <ul>
                <li>
                  <NavLink
                    title='ייצור'
                    href='/'
                    className={styles.subMenuLink}
                  />
                </li>
                <li>
                  <NavLink
                    title='ריגולציה'
                    href='/'
                    className={styles.subMenuLink}
                  />
                </li>
                <li>
                  <NavLink
                    title='איכות'
                    href='/'
                    className={styles.subMenuLink}
                  />
                </li>
                <li>
                  <NavLink
                    title='הדרכות'
                    href='/'
                    className={styles.subMenuLink}
                  />
                </li>
              </ul>
            </div>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          title='מוצרים'
          href='/products'
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        />
      </li>
      <li>
        <NavLink
          title='צור קשר'
          href='/contact'
          className={styles.navlink}
          activeClassName={styles.navlink_active}
        />
      </li>
    </ul>
  );
};
export default WebHeader;
