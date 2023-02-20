/* eslint-disable react/no-unescaped-entities */
import styles from "./indexcat.module.css";
import Image from "next/image";
import NavLink from "../../components/NavLink";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { showSiteName } from "../../store/slices/generalSlice";
import Head from "next/head";
import CheckBox from "react-animated-checkbox";
import { useRouter } from "next/router";

const ProductsIn = ({ productscats, catproducts }) => {
  const siteName = useSelector(showSiteName);
  const { t } = useTranslation(["common", "products"]);
  // const router = useRouter();
  // const { id } = router.query;
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
  if (!productscats) {
    //loading or return...
    return;
  }
  return (
    <section>
      <Head>
        <meta charSet="utf-8" />
        <title>
          {siteName} | {productscats.title}
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
                  <h1>{productscats.title}</h1>
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
                      title={productscats.title}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.productsList}>
              <div className={styles.productsListIn}>
                <ul className={styles.productsListUl}>
                  {catproducts &&
                    catproducts.map((item) => {
                      return (
                        <li key={item.id}>
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
                              {item.title}
                            </div>
                            <div className={styles.productItemTextFull}>
                              <div className={styles.productItemTextFullIn}>
                                <div className={styles.productItemText2}>
                                  {item.title}
                                </div>
                                <div
                                  className={styles.productItemText2_desc}
                                  dangerouslySetInnerHTML={{
                                    __html: item.text,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
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
                <form>
                  <div className={styles.filterItemCat}>
                    <div className={styles.filterItemTitle}>Trade Name</div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className={styles.filterItemCat}>
                    <div className={styles.filterItemTitle}>Trade Name</div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className={styles.filterItemCat}>
                    <div className={styles.filterItemTitle}>Trade Name</div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className={styles.filterItemCat}>
                    <div className={styles.filterItemTitle}>Trade Name</div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                    <div className={styles.filterItemInput}>
                      <CheckBox
                        // checked={this.state.checked}
                        checked={true}
                        checkBoxStyle={{
                          checkedColor: "#004b8d",
                          size: 15,
                          unCheckedColor: "#b8b8b8",
                        }}
                        duration={400}
                        // onClick={()=>this.handleClick()}
                      />
                      <div className={styles.filterItemInputLabel}>
                        Blue Class
                      </div>
                    </div>
                  </div>
                  {/*  */}
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
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      productscats: data1?.productscats,
      catproducts: data2?.catproducts,
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
