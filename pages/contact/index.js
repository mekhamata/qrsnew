import styles from './index.module.css';
import Image from 'next/image';
import NavLink from '../../components/NavLink';
import Head from 'next/head';
import { showSiteName } from '../../store/slices/generalSlice';
import { useSelector } from 'react-redux';
import {
  showSiteMail,
  showSitePhone,
  showSitePhone2,
  showSiteTelePhone,
  showSiteAddress,
} from '../../store/slices/generalSlice';
import IconComponent from '../../components/iconComponent';
import { useState } from 'react';
function TextInput({ type = 'text', label, name }) {
  const [value, setValue] = useState('');

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
const Contact = () => {
  const siteName = useSelector(showSiteName);
  const siteMail = useSelector(showSiteMail);
  const siteTelephone = useSelector(showSiteTelePhone);
  const sitePhone = useSelector(showSitePhone);
  const sitePhone2 = useSelector(showSitePhone2);
  const siteAddress = useSelector(showSiteAddress);
  //all serves <--start-->
  const myLoader = ({ src, width, quality }) => {
    return `https://qrs-global.com/uploads/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  //all serves <--end-->
  return (
    <section>
      <Head>
        <meta charSet='utf-8' />
        <title>
          {siteName} | Contact
        </title>
      </Head>
      <div id='pageCover' className={styles.pageCover}>
        <Image
          alt='page cover'
          src='/img/contactcover.png'
          layout='fill'
          objectFit='cover'
        />
        {/* <div className={styles.coverTitle}>SERVES</div> */}
      </div>
      <div id='pageData' className={styles.pageData}>
        <div id='pageDataIn' className={styles.pageDataIn}>
          <div className={styles.pageNavigator}>
            <NavLink
              href='/'
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title='בית'
            />
            /
            <NavLink
              href='/contact'
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title='צור קשר'
            />
          </div>
          <div className={styles.pageRealData}>
            
            <div className={styles.contentParagraph}>
              <div
                id='homeCircleContainer'
                className={styles.homeCircleContainer}
              >
                <div id='homeCircleCenter' className={styles.homeCircleCenter}>
                  <div className={styles.contactCirclesContainer}>
                    <ul className={styles.contactCirclesItemUL}>
                    <li className={styles.contactCirclesItem}>
                      <NavLink
                        href='/serves/course/1'
                        className=''
                        activeClassName=''
                      >
                        <div className={styles.contactCirclesItemIcon}>
                          <div className={styles.contactCirclesItemIconOut}>
                            <div className={styles.contactCirclesItemIconIn}>
                              <IconComponent type='fab' name='fa-solid fa-phone-volume' className={styles.contactCirclesItemIconClass} />
                            </div>
                          </div>
                        </div>
                        <div className={styles.contactCirclesItemText}>0547379277</div>
                      </NavLink>
                    </li>
                    <li className={styles.contactCirclesItem}>
                      <NavLink
                        href='/serves/course/1'
                        className=''
                        activeClassName=''
                      >
                        <div className={styles.contactCirclesItemIcon}>
                          <div className={styles.contactCirclesItemIconOut}>
                            <div className={styles.contactCirclesItemIconIn}>
                              <IconComponent type='fab' name='fa-solid fa-phone-volume' className={styles.contactCirclesItemIconClass} />
                            </div>
                          </div>
                        </div>
                        <div className={styles.contactCirclesItemText}>0547379277</div>
                      </NavLink>
                    </li>
                    <li className={styles.contactCirclesItem}>
                      <NavLink
                        href='/serves/course/1'
                        className=''
                        activeClassName=''
                      >
                        <div className={styles.contactCirclesItemIcon}>
                          <div className={styles.contactCirclesItemIconOut}>
                            <div className={styles.contactCirclesItemIconIn}>
                              <IconComponent type='fab' name='fa-solid fa-phone-volume' className={styles.contactCirclesItemIconClass} />
                            </div>
                          </div>
                        </div>
                        <div className={styles.contactCirclesItemText}>0547379277</div>
                      </NavLink>
                    </li>
                    <li className={styles.contactCirclesItem}>
                      <NavLink
                        href='/serves/course/1'
                        className=''
                        activeClassName=''
                      >
                        <div className={styles.contactCirclesItemIcon}>
                          <div className={styles.contactCirclesItemIconOut}>
                            <div className={styles.contactCirclesItemIconIn}>
                              <IconComponent type='fab' name='fa-solid fa-envelope-open' className={styles.contactCirclesItemIconClass} />
                            </div>
                          </div>
                        </div>
                        <div className={styles.contactCirclesItemText}>info@qrs-gloal.com</div>
                      </NavLink>
                    </li>
                    </ul>
                  </div>
                  <div className={styles.formAndText}>
                    <div id='footerContainer_in' className={styles.footerContainer_in}>
                        <div id='footerForm' className={styles.footerForm}>
                          <div className={styles.footerTitles}><h1>צור קשר</h1></div>
                          <div className={styles.footerFormRow}>
                            <TextInput label='כתובת' name='address' />
                            <TextInput label='שם מלא' name='fullname' />
                          </div>
                          <div className={styles.footerFormRow}>
                            <TextInput label='טלפון' name='phone' />
                            <TextInput label='חברה' name='company' />
                          </div>
                          <div
                            className={styles.footerFormRow}
                            style={{ flexDirection: 'column' }}
                          >
                            <div className={styles.footerFormTextAreaTitle}>הודעה</div>
                            <div className={styles.footerFormTextArea}>
                              <textarea placeholder=''></textarea>
                            </div>
                          </div>
                          <div className={styles.footerFormRow}>
                            <div className={styles.formSubscription}>
                              <label>
                                {' '}
                                <input type='checkbox' />
                                כן, אני מעוניין לקבל מייל
                              </label>
                            </div>
                            <div className={styles.formSubmit}>
                              <button>שלח</button>
                            </div>
                          </div>
                        </div>
                        <div id='footerText' className={styles.footerText}>
                          <div className={styles.footerTitles}>קיו אר אס מדיקל</div>
                          <div className={styles.footerInfo}>
                            <ul>
                              <li>
                                <NavLink
                                  href=''
                                  title={siteAddress}
                                  className={styles.footerInfoLink}
                                />
                              </li>
                              <li>
                                טל.{' '}
                                <NavLink
                                  href=''
                                  title={siteTelephone}
                                  className={styles.footerInfoLink}
                                />
                              </li>
                              <li>
                                נייד.{' '}
                                <NavLink
                                  href=''
                                  title={sitePhone}
                                  className={styles.footerInfoLink}
                                />
                              </li>
                              <li>
                                נייד.{' '}
                                <NavLink
                                  href=''
                                  title={sitePhone2}
                                  className={styles.footerInfoLink}
                                />
                              </li>
                              <li>
                                <NavLink
                                  href=''
                                  title={siteMail}
                                  className={styles.footerInfoLink}
                                />
                              </li>
                            </ul>
                          </div>
                          <div className={styles.footerSocial}>
                            <ul>
                              <li>
                                <NavLink href='' className={styles.socialIcons}>
                                  <IconComponent type='fab' name='fa-brands fa-twitter' />
                                </NavLink>
                              </li>
                              <li>
                                <NavLink href='' className={styles.socialIcons}>
                                  <IconComponent
                                    type='fab'
                                    name='fa-brands fa-square-facebook'
                                  />
                                </NavLink>
                              </li>
                              <li>
                                <NavLink href='' className={styles.socialIcons}>
                                  <IconComponent type='fab' name='fa-brands fa-youtube' />
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className={styles.contactMap}>
                    <div className={styles.contactMapTitle}>מפת הגעה</div>
                    <div className={styles.contactMapFrame}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.47031753989!2d35.27621428445091!3d33.017737578978775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c2dec8ec81c1d%3A0x928a13de582e4400!2sQrs%20global!5e0!3m2!1siw!2sil!4v1675347873797!5m2!1siw!2sil" style={{border:0,width:'100%',height:'100%'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
export default Contact;
