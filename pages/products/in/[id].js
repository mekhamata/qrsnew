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

const LeftSide = ({ product }) => {
  //the currect way to use translation!!!
  const { t } = useTranslation(["common"]);
  const [qty, setQty] = useState(1);
  const changeQuantity = (action) => {
    if (action !== "plus" && action !== "minus") return;
    action === "plus" ? setQty(qty + 1) : qty >= 1 ? setQty(qty - 1) : false;
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
            title={product.cat_data.title}
          />
        </div>
      </div>
      <div className={styles.productItemImg}>
        <Image
          alt="page cover"
          src={`https://qrs-global.com/uploads/${product.pic}`}
          width={221}
          height={221}
          objectFit="scale-down"
        />
      </div>
      <div className={styles.realLeftSide_greyTitle}>
        {t("products:toorder")}
      </div>
      <div style={{ direction: "ltr" }}>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>HEIGHT</div>
          <div className={styles.realLeftSide_lines_b}>11.5 mm</div>
        </div>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>DIAMETER</div>
          <div className={styles.realLeftSide_lines_b}>3.4 mm</div>
        </div>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>DIAMETER</div>
          <div className={styles.realLeftSide_lines_b}>3.4 mm</div>
        </div>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>DIAMETER</div>
          <div className={styles.realLeftSide_lines_b}>3.4 mm</div>
        </div>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>DIAMETER</div>
          <div className={styles.realLeftSide_lines_b}>3.4 mm</div>
        </div>
        <div className={styles.realLeftSide_lines}>
          <div className={styles.realLeftSide_lines_a}>TYPE</div>
          <div className={styles.realLeftSide_lines_b}>Two Thread Start</div>
        </div>
      </div>
      <form>
        <div className={styles.realLeftSide_form_input}>
          <div
            className={styles.realLeftSide_form_input_opp}
            onClick={() => {
              changeQuantity("plus");
            }}
          >
            <div
              className={styles.realLeftSide_form_input_opp_in}
              unselectable="on"
              onselectstart="return false;"
              onmousedown="return false;"
            >
              +
            </div>
          </div>
          <div>
            <input type="number" value={qty} />
          </div>
          <div
            className={styles.realLeftSide_form_input_opp}
            onClick={() => {
              changeQuantity("minus");
            }}
          >
            <div
              className={styles.realLeftSide_form_input_opp_in}
              unselectable="on"
              onselectstart="return false;"
              onmousedown="return false;"
            >
              -
            </div>
          </div>
        </div>
        <input type="hidden" name="productData" />
        <div className={styles.realLeftSide_form_button}>
          <button type="button">{t("products:addtocart")}</button>
        </div>
      </form>
    </div>
  );
};
const ProductsInId = ({ product }) => {
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
          {siteData["Title"]} | {product.title}
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
                      title={product.cat_data.title}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.productsList}>
                <div className={styles.productsListIn}>
                  <div className={styles.productsListUl}>
                    <div className={styles.productContentLine}>
                      <h1>{product.title}</h1>
                    </div>
                    <div className={styles.productContentLine}>
                      <div className={styles.productContentLine_a}>
                        <h2>{t("products:description")}</h2>
                      </div>
                      <div
                        className={styles.productContentLine_b}
                        dangerouslySetInnerHTML={{
                          __html: product.text,
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
                          __html: product.features,
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
                          __html: product.techinfo,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.filterContainer}>
              <div className={styles.filterContainerIn}>
                <div className={styles.filterItemsContainer}>
                  <LeftSide product={product} />
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
    `https://qrs-global.com/react/products/product.php?id=${params.id}`
  );
  const data1 = await res1.json();
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      product: data1?.product,
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
