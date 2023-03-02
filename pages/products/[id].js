/* eslint-disable react/no-unescaped-entities */
import styles from "./indexcat.module.css";
import Image from "next/image";
import NavLink from "../../components/NavLink";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation, i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect, useRef } from "react";
import { showSiteData } from "../../store/slices/generalSlice";
import Head from "next/head";
// import CheckBox from "react-animated-checkbox";
import { useRouter } from "next/router";
import { Checkbox, useCheckboxState } from "ariakit/checkbox";
import { Group, GroupLabel } from "ariakit/group";
import BeatLoader from "react-spinners/BeatLoader";
import { whatLanguage } from "../../utils/helperFunctions";

const ProductsIn = ({ productscats, catproducts, features, lang }) => {
  const siteData = useSelector(showSiteData);
  const { t } = useTranslation(["common", "products"]);
  const form = useRef();
  const checkbox = useCheckboxState({ defaultValue: [] });
  //may i need to use later...
  const [checkboxes, setCheckboxes] = useState(checkbox.value);
  const [products, setProducts] = useState(catproducts);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    setProducts(catproducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const updateProducts = async (evt) => {
    setLoadingProducts(true);
    let newarr = [...checkbox.value];
    const value = evt.target.value;
    if (newarr.includes(value)) {
      //remove
      const index = newarr.indexOf(value);
      if (index > -1) {
        // only splice array when item is found
        newarr.splice(index, 1); // 2nd parameter means remove one item only
      }
    } else {
      //add
      newarr.push(value);
    }
    setCheckboxes(newarr);
    console.log(JSON.stringify(newarr), "zz");
    const res2 = await fetch(
      typeof newarr !== undefined && newarr.length > 0
        ? `https://qrs-global.com/react/productscats/catproducts.php?id=${id}&features=${JSON.stringify(
            newarr
          )}`
        : `https://qrs-global.com/react/productscats/catproducts.php?id=${id}`
    );
    const data2 = await res2.json();
    setProducts([]);
    data2 && setProducts(data2.catproducts);
    setLoadingProducts(false);
  };

  if (!products) {
    //loading or return...
    return;
  }
  return (
    <section>
      <Head>
        <meta charSet="utf-8" />
        <title>
          {siteData["Title"]} | {whatLanguage(lang, productscats, "title")}
        </title>
      </Head>
      {/* {icon.icon}
      {name.name} */}
      <div id="pageCover" className={styles.pageCover}>
        <Image
          alt="page cover"
          src="/img/productscover.png"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div id="pageData" className={styles.pageData}>
        <div id="pageDataIn" className={styles.pageDataIn}>
          <div className={styles.productsContainer}>
            <div className={styles.productsHeader}>
              <div className={styles.productsHeaderDead}>
                {/* DEAD SPACE! */}
              </div>
              <div className={styles.productsHeaderActive}>
                <div className={styles.productsHeaderActiveTitle}>
                  <h1>{whatLanguage(lang, productscats, "title")}</h1>
                </div>
                <div className={styles.productsHeaderActiveNav}>
                  <div className={styles.pageNavigator}>
                    <NavLink
                      href="/"
                      className={styles.navlink}
                      activeClassName={styles.navlink__active}
                      title={t("common:home")}
                    />
                    /
                    <NavLink
                      href="/products"
                      className={styles.navlink}
                      activeClassName={styles.navlink__active}
                      title={t("common:products")}
                    />
                    /
                    <NavLink
                      href={`/products/${productscats.id}`}
                      className={styles.navlink}
                      activeClassName={styles.navlink__active}
                      title={whatLanguage(lang, productscats, "title")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.productsList}>
              <div className={styles.productsListIn}>
                <ul className={styles.productsListUl}>
                  {!loadingProducts && products ? (
                    products.map((item) => {
                      return (
                        <li key={item.id}>
                          <NavLink
                            href={`/products/in/${item.id}`}
                            className=""
                          >
                            <div className={styles.productItemContainer}>
                              <div className={`${styles.layer}`}></div>
                              <div className={styles.productItemImg}>
                                <Image
                                  alt="page cover"
                                  src={`https://qrs-global.com/uploads/${item.pic}`}
                                  width={221}
                                  height={221}
                                  objectFit="scale-down"
                                />
                              </div>
                              <div className={styles.productItemText}>
                                {whatLanguage(lang, item, "title")}
                              </div>
                              <div className={styles.productItemTextFull}>
                                <div className={styles.productItemTextFullIn}>
                                  <div className={styles.productItemText2}>
                                    {whatLanguage(lang, item, "title")}
                                  </div>
                                  <div
                                    className={styles.productItemText2_desc}
                                    dangerouslySetInnerHTML={{
                                      __html: whatLanguage(lang, item, "text"),
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </li>
                      );
                    })
                  ) : (
                    <div className={styles.loader}>
                      <BeatLoader
                        color="#004b8d"
                        size={15}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.filterContainer}>
            <div className={styles.filterContainerIn}>
              <div className={styles.filterImg}>
                <Image
                  alt="page cover"
                  src={`https://qrs-global.com/uploads/${productscats.pic}`}
                  width={218}
                  height={171}
                  objectFit="scale-down"
                />
              </div>
              <div className={styles.filterItemsContainer}>
                <form ref={form}>
                  {features?.map((item) => {
                    return (
                      <div
                        className={styles.filterItemCat}
                        key={item.cat_data.id}
                      >
                        {item.cat_items.length > 0 && (
                          <Group className="wrapper">
                            <div className={styles.filterItemTitle}>
                              <GroupLabel>
                                {whatLanguage(lang, item.cat_data, "title")}
                              </GroupLabel>
                            </div>
                            {item.cat_items.map((catitem) => {
                              return (
                                <div
                                  className={styles.filterItemInput}
                                  key={catitem.id}
                                >
                                  {/* <input
                                  type="checkbox"
                                  id={`option${catitem.id}`}
                                  name={`option${catitem.id}`}
                                  checked={isChecked?.[`option${catitem.id}`]}
                                  value={isChecked[`option${catitem.id}`]}
                                  onClick={toggle}
                                />
                                <div className={styles.filterItemInputLabel}>
                                  {catitem.title}
                                </div> */}
                                  <label className={styles.container}>
                                    <Checkbox
                                      state={checkbox}
                                      value={catitem.id}
                                      className={styles.checkbox}
                                      onChange={updateProducts}
                                    />{" "}
                                    {whatLanguage(lang, catitem, "title")}
                                  </label>
                                </div>
                              );
                            })}
                          </Group>
                        )}
                      </div>
                    );
                  })}
                </form>
              </div>
            </div>
            <div className={styles.filterCircle}>
              <div className={styles.filterCircleIn}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
// ProductsIn.title = `Products`;
export async function getServerSideProps({ locale, params }) {
  const res1 = await fetch(
    `https://qrs-global.com/react/productscats/index.php?id=${params.id}`
  );
  const data1 = await res1.json();

  const res2 = await fetch(
    `https://qrs-global.com/react/productscats/catproducts.php?id=${params.id}`
  );
  const data2 = await res2.json();

  const res3 = await fetch(
    `https://qrs-global.com/react/products/features.php`
  );
  const data3 = await res3.json();

  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      productscats: data1?.productscats,
      catproducts: data2?.catproducts,
      features: data3?.productsfeatures,
      lang: locale ?? "he",
      // Will be passed to the page component as props
    },
  };
}
export default ProductsIn;
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
