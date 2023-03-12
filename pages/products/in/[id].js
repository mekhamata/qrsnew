/* eslint-disable react/no-unescaped-entities */
import styles from "./indexid.module.css";
import Image from "next/image";
import NavLink from "../../../components/NavLink";
import { useTranslation, i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { showSiteData } from "../../../store/slices/generalSlice";
import Head from "next/head";
import CheckBox from "react-animated-checkbox";
import IconComponent from "../../../components/iconComponent";
import { Suspense } from "react";
import { whatLanguage } from "../../../utils/helperFunctions";
import { addToCart } from "../../../store/slices/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeftSide = ({ product, lang }) => {
  //the currect way to use translation!!!
  const { t } = useTranslation(["common"]);
  const [qty, setQty] = useState(1);
  const changeQuantity = (action) => {
    if (action !== "plus" && action !== "minus") return;
    action === "plus" ? setQty(qty + 1) : qty >= 2 ? setQty(qty - 1) : false;
  };
  const [radios, setRadios] = useState({});
  const [radioserrors, setRadiosErrors] = useState([]);
  const dispatch = useDispatch();
  function handleRadios(e, param) {
    if (
      radios[param] &&
      radios[param] !== "" &&
      radios[param] === e.target.value
    ) {
      const { [param]: tmp, ...rest } = radios;
      setRadios(rest);
    } else {
      setRadios({
        ...radios,
        [param]: e.target.value,
      });
    }
  }
  const notify = (msg, type) => {
    toast.dismiss();
    if (type === "success") {
      return toast.success(<div style={{ textAlign: "center" }}>{msg}</div>, {
        theme: "colored",
      });
    } else {
      return toast.error(<div style={{ textAlign: "center" }}>{msg}</div>, {
        theme: "colored",
      });
    }
  };
  const addToCartFunc = () => {
    let newerrarray = [...radioserrors];
    if (product.diameter?.length > 0) {
      if (radios["diameter"]) {
        console.log("exists diameter");
        const index = newerrarray.indexOf("diameter");
        if (index > -1) {
          // only splice array when item is found
          newerrarray.splice(index, 1); // 2nd parameter means remove one item only
        }
        setRadiosErrors(newerrarray);
      } else {
        if (!newerrarray.includes("diameter")) {
          newerrarray.push("diameter");
          setRadiosErrors(newerrarray);
        }
      }
    }
    if (product.height?.length > 0) {
      if (radios["height"]) {
        console.log("exists height");
        const index = newerrarray.indexOf("height");
        if (index > -1) {
          // only splice array when item is found
          newerrarray.splice(index, 1); // 2nd parameter means remove one item only
        }
        setRadiosErrors(newerrarray);
      } else {
        if (!newerrarray.includes("height")) {
          newerrarray.push("height");
          setRadiosErrors(newerrarray);
        }
      }
    }
    if (product.tissuelevel?.length > 0) {
      if (radios["tissuelevel"]) {
        console.log("exists tissuelevel");
        const index = newerrarray.indexOf("tissuelevel");
        if (index > -1) {
          // only splice array when item is found
          newerrarray.splice(index, 1); // 2nd parameter means remove one item only
        }
        setRadiosErrors(newerrarray);
      } else {
        if (!newerrarray.includes("tissuelevel")) {
          newerrarray.push("tissuelevel");
          setRadiosErrors(newerrarray);
        }
      }
    }

    product.product_features?.map((item) => {
      const feaname = item.featurecatname.toLowerCase().replace(/\s/g, "_");
      if (radios[feaname]) {
        const index = newerrarray.indexOf(feaname);
        if (index > -1) {
          // only splice array when item is found
          newerrarray.splice(index, 1); // 2nd parameter means remove one item only
        }
        setRadiosErrors(newerrarray);
      } else {
        if (!newerrarray.includes(feaname)) {
          newerrarray.push(feaname);
          setRadiosErrors(newerrarray);
        }
      }
    });
    if (newerrarray.length > 0) {
      notify(`${t("common:fixaddtocart")}`, "error");
    } else {
      dispatch(addToCart({ ...product, qty: qty }));
      setQty(1);
      notify(`${t("common:productaddedtocart")}`, "success");
      setRadios({});
    }

    // alert(qty);
  };
  return (
    <div className={styles.realLeftSide}>
      <div
        className={styles.realLeftSide_greyTitle}
        style={{ borderRadius: "20px 20px 0 0" }}
      >
        {t("products:productdetails")}
      </div>
      <div className={styles.realLeftSide_lines}>
        <div className={styles.realLeftSide_lines_a} style={{ flex: 3 }}>
          {t("common:category")}:
        </div>
        <div className={styles.realLeftSide_lines_b} style={{ flex: 2 }}>
          <NavLink
            href={`/products/${product.cat_data.id}`}
            className={styles.navlink__active}
            activeClassName={styles.navlink__active}
            title={whatLanguage(lang, product.cat_data, "title")}
          />
        </div>
      </div>
      <div className={styles.productItemImg}>
        <Image
          alt="page cover"
          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.pic}`}
          width={221}
          height={221}
          objectFit="scale-down"
        />
      </div>
      <div className={styles.realLeftSide_greyTitle}>
        {t("products:toorder")}
      </div>
      <div style={{ direction: "ltr" }}>
        {product.tissuelevel !== "" && (
          <div className={styles.realLeftSide_lines}>
            <div
              className={`${styles.realLeftSide_lines_a} ${
                radioserrors.includes("tissuelevel") &&
                styles.realLeftSide_lines_a_error
              }`}
            >
              <span style={{ color: "red" }}>*</span>Tissue Level
            </div>
            <div className={styles.realLeftSide_lines_b}>
              {Array.isArray(product.tissuelevel) &&
                product.tissuelevel.map((item) => {
                  return (
                    <div
                      key={item}
                      className={styles.realLeftSide_lines_a_item}
                    >
                      <div className={styles.realLeftSide_lines_b}>
                        <label>
                          <input
                            type="radio"
                            name={item}
                            value={item}
                            onClick={(event) =>
                              handleRadios(event, "tissuelevel")
                            }
                            checked={radios.tissuelevel === item}
                            readOnly
                          />
                          {item}
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {product.height !== "" && (
          <div className={styles.realLeftSide_lines}>
            <div
              className={`${styles.realLeftSide_lines_a} ${
                radioserrors.includes("height") &&
                styles.realLeftSide_lines_a_error
              }`}
            >
              <span style={{ color: "red" }}>*</span>HEIGHT
            </div>
            <div className={styles.realLeftSide_lines_b}>
              {Array.isArray(product.height) &&
                product.height.map((item) => {
                  return (
                    <div
                      key={item}
                      className={styles.realLeftSide_lines_a_item}
                    >
                      <div className={styles.realLeftSide_lines_b}>
                        <label>
                          <input
                            type="radio"
                            name={item}
                            value={item}
                            onClick={(event) => handleRadios(event, "height")}
                            checked={radios.height === item}
                            readOnly
                          />
                          {item}
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {product.diameter !== "" && (
          <div className={styles.realLeftSide_lines}>
            <div
              className={`${styles.realLeftSide_lines_a} ${
                radioserrors.includes("diameter") &&
                styles.realLeftSide_lines_a_error
              }`}
            >
              <span style={{ color: "red" }}>*</span>DIAMETER
            </div>
            <div className={styles.realLeftSide_lines_b}>
              {Array.isArray(product.diameter) &&
                product.diameter.map((item) => {
                  return (
                    <div
                      key={item}
                      className={styles.realLeftSide_lines_a_item}
                    >
                      <div className={styles.realLeftSide_lines_b}>
                        <label>
                          <input
                            type="radio"
                            name={item}
                            value={item}
                            onClick={(event) => handleRadios(event, "diameter")}
                            checked={radios.diameter === item}
                            readOnly
                          />
                          {item}
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {product.product_features !== "" && (
          <div className={styles.realLeftSide_lines}>
            {Array.isArray(product.product_features) &&
              product.product_features.map((item) => {
                return (
                  <div key={item.featurecat}>
                    <div
                      className={`${styles.realLeftSide_lines_a} ${
                        radioserrors.includes(
                          item.featurecatname.toLowerCase().replace(/\s/g, "_")
                        ) && styles.realLeftSide_lines_a_error
                      }`}
                    >
                      <span style={{ color: "red" }}>*</span>
                      {item.featurecatname}
                    </div>
                    {Array.isArray(item.features) &&
                      item.features.map((itemfeatures) => {
                        return (
                          <div
                            key={itemfeatures.featureid}
                            className={styles.realLeftSide_lines_a_item}
                          >
                            <div className={styles.realLeftSide_lines_b}>
                              <label>
                                <input
                                  type="radio"
                                  name={itemfeatures.featurename}
                                  value={itemfeatures.featureid}
                                  onClick={(event) =>
                                    handleRadios(
                                      event,
                                      item.featurecatname
                                        .toLowerCase()
                                        .replace(/\s/g, "_")
                                    )
                                  }
                                  checked={
                                    radios[
                                      item.featurecatname
                                        .toLowerCase()
                                        .replace(/\s/g, "_")
                                    ] === itemfeatures.featureid
                                  }
                                  readOnly
                                />
                                {itemfeatures.featurename}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        )}
        {/* <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>DIAMETER</div>
          <div className={styles.realLeftSide_lines_b}>3.4 mm</div>
        </div> */}
      </div>
      <form>
        <div className={styles.realLeftSide_form_input}>
          <div
            className={styles.realLeftSide_form_input_opp}
            onClick={() => {
              changeQuantity("plus");
            }}
          >
            <div className={styles.realLeftSide_form_input_opp_in}>+</div>
          </div>
          <div className={styles.realLeftSide_form_input_opp_number}>
            <input type="number" value={qty} disabled />
          </div>
          <div
            className={styles.realLeftSide_form_input_opp}
            onClick={() => {
              changeQuantity("minus");
            }}
          >
            <div className={styles.realLeftSide_form_input_opp_in}>-</div>
          </div>
        </div>
        <input type="hidden" name="productData" />
        <div className={styles.realLeftSide_form_button}>
          <button type="button" onClick={() => addToCartFunc()}>
            {t("products:addtocart")}
          </button>
        </div>
      </form>
    </div>
  );
};
const ProductsInId = ({ product, lang }) => {
  const siteData = useSelector(showSiteData);
  const { t } = useTranslation(["common"]);
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
        <meta charSet="utf-8" />
        <title>
          {siteData["Title"]} | {whatLanguage(lang, product, "title")}
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
        <div id="pageDataIn" className={styles.pageDataInContainer}>
          <div id="pageDataIn" className={styles.pageDataIn}>
            <div className={styles.productsContainer}>
              <div className={styles.productsHeader}>
                <div className={styles.productsHeaderActive}>
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
                      href={`/products/${product.cat_data.id}`}
                      className={styles.navlink}
                      activeClassName={styles.navlink__active}
                      title={whatLanguage(lang, product.cat_data, "title")}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.productsList}>
                <div className={styles.productsListIn}>
                  <div className={styles.productsListUl}>
                    <div className={styles.productContentLine}>
                      <h1>{whatLanguage(lang, product, "title")}</h1>
                    </div>
                    <div className={styles.productContentLine}>
                      <div className={styles.productContentLine_a}>
                        <h2>{t("products:description")}</h2>
                      </div>
                      <div
                        className={styles.productContentLine_b}
                        dangerouslySetInnerHTML={{
                          __html: whatLanguage(lang, product, "text"),
                        }}
                      ></div>
                    </div>
                    <div className={styles.productContentLine}>
                      <div className={styles.productContentLine_a}>
                        <h2>{t("products:features")}</h2>
                      </div>
                      <div
                        className={styles.productContentLine_b}
                        dangerouslySetInnerHTML={{
                          __html: whatLanguage(lang, product, "features"),
                        }}
                      ></div>
                    </div>
                    <div className={styles.productContentLine}>
                      <div className={styles.productContentLine_a}>
                        <h2>{t("products:techinfo")}</h2>
                      </div>
                      <div
                        className={styles.productContentLine_b}
                        dangerouslySetInnerHTML={{
                          __html: whatLanguage(lang, product, "techinfo"),
                        }}
                      ></div>
                    </div>
                    {(product.file !== "" || product.file_en !== "") && (
                      <div className={styles.productContentLine}>
                        <div className={styles.productContentLine_a}>
                          <NavLink
                            target="_blank"
                            href={`${
                              lang === "he"
                                ? product.file !== ""
                                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.file}`
                                  : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.file_en}`
                                : product.file_en !== ""
                                ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.file_en}`
                                : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.file}`
                            }`}
                            className={styles.downloadLink}
                            aClass={styles.downloadLink}
                            activeClassName={styles.downloadLink}
                          >
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <IconComponent
                                type="fab"
                                name="fa fa-cloud-download"
                              />{" "}
                              <h2
                                style={{
                                  marginTop: "-5px",
                                  marginInlineStart: "5px",
                                }}
                              >
                                {t("products:usermanual")}
                              </h2>
                            </div>
                          </NavLink>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.filterContainer}>
              <div className={styles.filterContainerIn}>
                <div className={styles.filterItemsContainer}>
                  <LeftSide product={product} lang={lang} />
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

export async function getServerSideProps({ locale, params }) {
  const res1 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/react/products/product.php?id=${params.id}`
  );
  const data1 = await res1.json();
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      product: data1?.product,
      lang: locale ?? "he",
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
