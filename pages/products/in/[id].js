/* eslint-disable react/no-unescaped-entities */
import styles from './indexid.module.css';
import Image from 'next/image';
import NavLink from '../../../components/NavLink';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { showSiteName } from '../../../store/slices/generalSlice';
import Head from 'next/head';
import CheckBox from 'react-animated-checkbox';
import IconComponent from '../../../components/iconComponent';
import { Suspense } from "react";

const LeftSide = () =>{
  //the currect way to use translation!!!
  const { t } = useTranslation(['common', 'products']);
  const [qty,setQty] = useState(1);
  const changeQuantity = (action) =>{
    if(action!=="plus" && action!=="minus")
      return;
    action==="plus"?setQty(qty+1):qty>=1?setQty(qty-1):false
  }
  return(
    <div className={styles.realLeftSide}>
      <div className={styles.realLeftSide_greyTitle} style={{borderRadius:'20px 20px 0 0'}}>{t('products:productdetails')}</div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a} style={{flex:3}}>{t('common:category')}:</div>
        <div className={styles.realLeftSide_lines_b} style={{flex:2}}>
          <NavLink
            href='/'
            className={styles.navlink__active}
            activeClassName={styles.navlink__active}
            title='רגולציה'
          />
        </div>
      </div>
      <div className={styles.productItemImg}>
        <Image
          alt='page cover'
          src='/img/prod2.png'
          width={221}
          height={221}
          objectFit='scale-down'
        />
      </div>
      <div className={styles.realLeftSide_greyTitle}>{t('products:toorder')}</div>
      <div style={{direction:'ltr'}}>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>HEIGHT</div>
          <div className={styles.realLeftSide_lines_b}>
            11.5 mm
          </div>
        </div>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>DIAMETER</div>
          <div className={styles.realLeftSide_lines_b}>
            3.4 mm
          </div>
        </div>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>DIAMETER</div>
          <div className={styles.realLeftSide_lines_b}>
            3.4 mm
          </div>
        </div>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>DIAMETER</div>
          <div className={styles.realLeftSide_lines_b}>
            3.4 mm
          </div>
        </div>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>DIAMETER</div>
          <div className={styles.realLeftSide_lines_b}>
            3.4 mm
          </div>
        </div>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>TYPE</div>
          <div className={styles.realLeftSide_lines_b}>
            Two Thread Start
          </div>
        </div>
      </div>
      <form>
        <div className={styles.realLeftSide_form_input}>
          <div className={styles.realLeftSide_form_input_opp} onClick={()=>{changeQuantity('plus')}}>
            <div className={styles.realLeftSide_form_input_opp_in} unselectable="on" onselectstart="return false;" onmousedown="return false;">+</div>
          </div>
          <div><input type="number" value={qty} /></div>
          <div className={styles.realLeftSide_form_input_opp} onClick={()=>{changeQuantity('minus')}}>
            <div className={styles.realLeftSide_form_input_opp_in} unselectable="on" onselectstart="return false;" onmousedown="return false;">-</div>
          </div>
        </div>
        <input type='hidden' name='productData' />
        <div className={styles.realLeftSide_form_button}><button type='button'>הוספה לסל</button></div>
      </form>
    </div>
  )
}
const ProductsInId = () => {
  const siteName = useSelector(showSiteName);
  //dispacher example to update states

  // const dispatcher = useDispatch();
  // useEffect(() => {
  //   name.name === 'mikha'
  //     ? dispatcher(nameAction.nameSamar())
  //     : dispatcher(nameAction.nameMikha());
  // }, []);

  //useSelector example to read states

  // let icon = useSelector((state) => state.icon);
  // let name = useSelector((state) => state.name);
  return (
    <section>
      <Head>
        <meta charSet='utf-8' />
        <title>{siteName} | Course data</title>
      </Head>
      {/* {icon.icon}
      {name.name} */}
      <div id='pageCover' className={styles.pageCover}>
        <Image
          alt='page cover'
          src='/img/productscover.png'
          layout='fill'
          objectFit='cover'
        />
      </div>
      <div id='pageData' className={styles.pageData}>
        <div id='pageDataIn' className={styles.pageDataInContainer}>
          <div id='pageDataIn' className={styles.pageDataIn}>
            <div className={styles.productsContainer}>
              <div className={styles.productsHeader}>
                <div className={styles.productsHeaderActive}>
                  <div className={styles.pageNavigator}>
                    <NavLink
                      href='/'
                      className={styles.navlink}
                      activeClassName={styles.navlink__active}
                      title='בית'
                    />
                    /
                    <NavLink
                      href='/products'
                      className={styles.navlink}
                      activeClassName={styles.navlink__active}
                      title='מוצרים'
                    />
                    /
                    <NavLink
                      href='/products/in/1'
                      className={styles.navlink}
                      activeClassName={styles.navlink__active}
                      title='Implants'
                    />
                  </div>
                </div>
              </div>
              <div className={styles.productsList}>
                <div className={styles.productsListIn}>
                  <div className={styles.productsListUl}>
                    <div className={styles.productContentLine}>
                      <h1>Blue Class implant Int. Hex. Dia 3.4mm L 11.5mm</h1>
                    </div>
                    <div className={styles.productContentLine}>
                      <div className={styles.productContentLine_a}><h2>תיאור</h2></div>
                      <div className={styles.productContentLine_b}>
                      Blue Class implant NP Int. Hex. Dia 3.4mm L 11.5mm
                      </div>
                    </div>
                    <div className={styles.productContentLine}>
                      <div className={styles.productContentLine_a}><h2>מאפיינים</h2></div>
                      <div className={styles.productContentLine_b}>
                      Narrow
                      </div>
                    </div>
                    <div className={styles.productContentLine}>
                      <div className={styles.productContentLine_a}><h2>פרטים טכניים</h2></div>
                      <div className={styles.productContentLine_b}>
                      Dimensions: Ø3.4mm  11.5mm<br/>
                      Platform: Internal Hex<br/>
                      ID Number: QBH-33011
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.filterContainer}>
              <div className={styles.filterContainerIn}>
                <div className={styles.filterItemsContainer}>
                  <LeftSide/>
                </div>
              </div>
              <div className={styles.filterCircle}>
                <div className={styles.filterCircleIn}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
// ProductsIn.title = `Products`;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale??"he")),
      // Will be passed to the page component as props
    },
  };
}
export default ProductsInId;
// import connectMongo from '../../utils/dbConnect';
// import Samar from '../../models/toursModel';
// const About = ({ samars }) => {
//   return (
//     <div>
//       {samars.map((samars) => (
//         <div key={samars._id}>{samars.name}</div>
//       ))}
//     </div>
//   );
// };
// About.title = 'About';

// export const getServerSideProps = async () => {
//   try {
//     console.log('connecting to mongo');
//     await connectMongo();
//     console.log('connected to mongo');
//     console.log('Fetching documents');
//     const samars = await Samar.find();
//     console.log('fetched documents');

//     return {
//       props: {
//         samars: JSON.parse(JSON.stringify(samars)),
//       },
//     };
//   } catch (err) {
//     return {
//       notFound: true,
//     };
//   }
// };

// export default About;
