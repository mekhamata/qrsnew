import styles from './in.module.css';
import Image from 'next/image';
import NavLink from '../../components/NavLink';
import IconComponent from '../../components/iconComponent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { forwardRef, useState } from 'react';
import { showSiteName } from '../../store/slices/generalSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';

//create floating text input
function TextInput({ type = 'text', label, name, onclick }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className={styles.coursesFormInput}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onClick={onclick}
      />
      <label className={value && styles.filled} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
//create floating select
function SelectInput({ type = 'text', label, name, onclick }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className={styles.coursesFormInput}>
      {/* <input
        type={type}
        value={value}
        onChange={handleChange}
        onClick={onclick}
      /> */}
      <select onClick={onclick} onChange={handleChange}>
        <option selected value=''></option>
        <option value='1'>asdasdasdasd</option>
        <option value='2'>asdasdasdasd</option>
        <option value='3'>asdasdasdasd</option>
      </select>
      <label className={value && styles.filled}>{label}</label>
    </div>
  );
}
//date picker custom input
// eslint-disable-next-line react/display-name
const FloatingDatePicker = forwardRef(
  ({ value, onClick, name, label, type = 'text' }, ref) => (
    <div className={styles.coursesFormInput}>
      <input type={type} value={value} onClick={onClick} />
      <label className={value && styles.filled} htmlFor={name}>
        {label}
      </label>
    </div>
  )
);
const LearningIn = ({ serve }) => {
  const router = useRouter();
  const { id } = router.query;
  //datepicker state:
  const [startDate, setStartDate] = useState('');
  const siteName = useSelector(showSiteName);

  const theserve = serve.serves || '';
  return (
    <section>
      <Head>
        <meta charSet='utf-8' />
        <title>
          {siteName} | {theserve.title}
        </title>
      </Head>
      <div id='pageCover' className={styles.pageCover}>
        <Image
          alt='page cover'
          src='/img/learningcover.jpg'
          layout='fill'
          objectFit='cover'
        />
        {/* <div className={styles.coverTitle}>SERVES</div> */}
      </div>
      <div id='pageData' className={styles.pageData}>
        <div id='pageDataIn' className={styles.pageDataIn}>
          {/* <div className={styles.pageNavigator}>
            <NavLink
              href='/serves'
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title='שירותים'
            />
            /
            <NavLink
              href='/products'
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title='מוצרים'
            />
          </div> */}
          <div className={styles.pageRealData}>
            <div className={styles.pageNavigator}>
              <NavLink
                href='/'
                className={styles.navlink}
                activeClassName={styles.navlink__active}
                title='בית'
              />
              /
              <NavLink
                href='/serves'
                className={styles.navlink}
                activeClassName={styles.navlink__active}
                title='שירותים'
              />
              /
              <NavLink
                href={`/serves/${id}`}
                className={styles.navlink}
                activeClassName={styles.navlink__active}
                title={`${theserve.title}`}
              />
            </div>
            <div className={styles.contentParagraph_copy1}>
              <div className={styles.contentParagraph_copy1_text}>
                <div className={styles.contentMainTitle_copy}>
                  <div className={styles.titleIconContainer}>
                    <IconComponent
                      name='fa-sharp fa-solid fa-chalkboard-user'
                      className={styles.titleIcon}
                    />
                  </div>
                  <h1>{theserve.title}</h1>
                </div>
                <div
                  className={styles.contentText}
                  dangerouslySetInnerHTML={{ __html: theserve.text }}
                ></div>
              </div>
              <div className={styles.contentParagraph_copy1_img}>
                <Image
                  alt='page cover'
                  src='/img/servesin.png'
                  width={624}
                  height={670}
                  objectFit='scale-down'
                />
              </div>
            </div>
            {(theserve.title?.includes('courses') ||
              theserve.title?.includes('הדרכות') ||
              theserve.title?.includes('קורסים')) && (
              <div className={styles.contentParagraph_copy2}>
                <div className={styles.coursesListTitle}>
                  <h2>לרשימת הקורסים</h2>
                </div>
                <div className={styles.coursesListContainer}>
                  <div className={styles.coursesListFormContainer}>
                    <form>
                      <div className={styles.coursesListFormFullRow}>
                        <TextInput label='כתובת' name='address' />
                      </div>
                      <div className={styles.coursesListFormFullRow}>
                        <div
                          className={styles.coursesListFormHalfRow}
                          style={{ paddingInlineEnd: '10px' }}
                        >
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            customInput={
                              <FloatingDatePicker
                                name='startdate'
                                label='מתאריך'
                              />
                            }
                            dateFormat='dd/MM/yyyy'
                            // dateFormat='Pp'
                          />
                          {startDate ? (
                            <div
                              onClick={() => setStartDate('')}
                              className={styles.datePickerClearIcon}
                            >
                              <IconComponent type='fab' name='fa-solid fa-x' />
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className={styles.coursesListFormHalfRow}>
                          <div className={styles.coursesFormInput}>
                            <SelectInput name='cat' label='בחר קטגוריה' />
                          </div>
                        </div>
                        <div
                          className={styles.coursesListFormHalfRow}
                          style={{ flex: 0.7, marginInlineStart: '0.5vw' }}
                        >
                          <button
                            type='button'
                            className={styles.coursesFormButton}
                          >
                            חיפוש
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className={styles.coursesList}>
                    {/* item */}
                    <div className={styles.courseItem}>
                      <div className={styles.courseItemIn}>
                        <div className={styles.courseItemInInside}>
                          <div className={styles.courseItemInInsideImg}>
                            <NavLink
                              href='/serves/course/1'
                              className={styles.courseItemInInsideImg_link}
                              activeClassName={
                                styles.courseItemInInsideImg_link
                              }
                            >
                              לפרטים
                              <br />
                              והרשמה
                            </NavLink>
                          </div>
                          <div className={styles.courseItemInInsideText}>
                            <NavLink
                              href='/products'
                              className={styles.courseItemInInsideText_link}
                              activeClassName={
                                styles.courseItemInInsideText_link
                              }
                            >
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /item */}
                    {/* item */}
                    <div className={styles.courseItem}>
                      <div className={styles.courseItemIn2}>
                        <div className={styles.courseItemInInside2}>
                          <div className={styles.courseItemInInside2Text}>
                            <NavLink
                              href='/products'
                              className={styles.courseItemInInsideText_link}
                              activeClassName={
                                styles.courseItemInInsideText_link
                              }
                            >
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                            </NavLink>
                          </div>
                          <div className={styles.courseItemInInside2Img}>
                            <NavLink
                              href='/products'
                              className={styles.courseItemInInsideImg_link}
                              activeClassName={
                                styles.courseItemInInsideImg_link
                              }
                            >
                              לפרטים
                              <br />
                              והרשמה
                            </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className={styles.courseItemCircle}></div>
                    </div>
                    {/* /item */}
                    {/* item */}
                    <div className={styles.courseItem}>
                      <div className={styles.courseItemIn}>
                        <div className={styles.courseItemInInside}>
                          <div className={styles.courseItemInInsideImg}>
                            <NavLink
                              href='/products'
                              className={styles.courseItemInInsideImg_link}
                              activeClassName={
                                styles.courseItemInInsideImg_link
                              }
                            >
                              לפרטים
                              <br />
                              והרשמה
                            </NavLink>
                          </div>
                          <div className={styles.courseItemInInsideText}>
                            <NavLink
                              href='/products'
                              className={styles.courseItemInInsideText_link}
                              activeClassName={
                                styles.courseItemInInsideText_link
                              }
                            >
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /item */}
                    {/* item */}
                    <div className={styles.courseItem}>
                      <div className={styles.courseItemIn2}>
                        <div className={styles.courseItemInInside2}>
                          <div className={styles.courseItemInInside2Text}>
                            <NavLink
                              href='/products'
                              className={styles.courseItemInInsideText_link}
                              activeClassName={
                                styles.courseItemInInsideText_link
                              }
                            >
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                            </NavLink>
                          </div>
                          <div className={styles.courseItemInInside2Img}>
                            <NavLink
                              href='/products'
                              className={styles.courseItemInInsideImg_link}
                              activeClassName={
                                styles.courseItemInInsideImg_link
                              }
                            >
                              לפרטים
                              <br />
                              והרשמה
                            </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className={styles.courseItemCircle}></div>
                    </div>
                    {/* /item */}
                    {/* item */}
                    <div className={styles.courseItem}>
                      <div className={styles.courseItemIn}>
                        <div className={styles.courseItemInInside}>
                          <div className={styles.courseItemInInsideImg}>
                            <NavLink
                              href='/products'
                              className={styles.courseItemInInsideImg_link}
                              activeClassName={
                                styles.courseItemInInsideImg_link
                              }
                            >
                              לפרטים
                              <br />
                              והרשמה
                            </NavLink>
                          </div>
                          <div className={styles.courseItemInInsideText}>
                            <NavLink
                              href='/products'
                              className={styles.courseItemInInsideText_link}
                              activeClassName={
                                styles.courseItemInInsideText_link
                              }
                            >
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /item */}
                    {/* item */}
                    <div className={styles.courseItem}>
                      <div className={styles.courseItemIn2}>
                        <div className={styles.courseItemInInside2}>
                          <div className={styles.courseItemInInside2Text}>
                            <NavLink
                              href='/products'
                              className={styles.courseItemInInsideText_link}
                              activeClassName={
                                styles.courseItemInInsideText_link
                              }
                            >
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                              הטקסט פה פהפהפה הטקסט פה פהפהפה הטקסט פה פהפהפה
                            </NavLink>
                          </div>
                          <div className={styles.courseItemInInside2Img}>
                            <NavLink
                              href='/products'
                              className={styles.courseItemInInsideImg_link}
                              activeClassName={
                                styles.courseItemInInsideImg_link
                              }
                            >
                              לפרטים
                              <br />
                              והרשמה
                            </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className={styles.courseItemCircle}></div>
                    </div>
                    {/* /item */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://qrs-global.com/react/serves/serves.php');
  const serves = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = serves.allserves.map((serve) => ({
    params: { id: serve.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://qrs-global.com/react/serves/index.php?id=${params.id}`
  );
  const serve = await res.json();

  // Pass post data to the page via props
  return {
    props: {
      serve,
    },
  };
}
// Learning.title = 'Learning';
export default LearningIn;
