/* eslint-disable react/no-unescaped-entities */
import styles from "./indexcat.module.css";
import Image from "next/image";
import NavLink from "../../components/NavLink";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { showSiteName } from "../../store/slices/generalSlice";
import Head from "next/head";
import CheckBox from "react-animated-checkbox";

const ProductsIn = () => {
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
        <meta charSet="utf-8" />
        <title>{siteName} | Products In</title>
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
                  <h1>Implants</h1>
                </div>
                <div className={styles.productsHeaderActiveNav}>
                  <div className={styles.pageNavigator}>
                    <NavLink
                      href="/"
                      className={styles.navlink}
                      activeClassName={styles.navlink__active}
                      title="בית"
                    />
                    /
                    <NavLink
                      href="/products"
                      className={styles.navlink}
                      activeClassName={styles.navlink__active}
                      title="מוצרים"
                    />
                    /
                    <NavLink
                      href="/products/in"
                      className={styles.navlink}
                      activeClassName={styles.navlink__active}
                      title="Implants"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.productsList}>
              <div className={styles.productsListIn}>
                <ul className={styles.productsListUl}>
                  <li>
                    <div className={styles.productItemContainer}>
                      <div className={`${styles.layer}`}></div>
                      <div className={styles.productItemImg}>
                        <Image
                          alt="page cover"
                          src="/img/prod2.png"
                          width={221}
                          height={221}
                          objectFit="scale-down"
                        />
                      </div>
                      <div className={styles.productItemText}>
                        Blue Class implant One Piece. Dia 3.75mm L 10mm
                      </div>
                      <div className={styles.productItemTextFull}>
                        <div className={styles.productItemTextFullIn}>
                          <div className={styles.productItemText2}>
                            Blue Class implant One Piece. Dia 3.75mm L 10mm
                          </div>
                          <div className={styles.productItemText2_desc}>
                            here wil be desc
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.productItemContainer}>
                      <div className={`${styles.layer}`}></div>
                      <div className={styles.productItemImg}>
                        <Image
                          alt="page cover"
                          src="/img/prod2.png"
                          width={221}
                          height={221}
                          objectFit="scale-down"
                        />
                      </div>
                      <div className={styles.productItemText}>
                        Blue Class implant One Piece. Dia 3.75mm L 10mm
                      </div>
                      <div className={styles.productItemTextFull}>
                        <div className={styles.productItemTextFullIn}>
                          <div className={styles.productItemText2}>
                            Blue Class implant One Piece. Dia 3.75mm L 10mm
                          </div>
                          <div className={styles.productItemText2_desc}>
                            here wil be desc
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.productItemContainer}>
                      <div className={`${styles.layer}`}></div>
                      <div className={styles.productItemImg}>
                        <Image
                          alt="page cover"
                          src="/img/prod1.png"
                          width={221}
                          height={221}
                          objectFit="scale-down"
                        />
                      </div>
                      <div className={styles.productItemText}>
                        Blue Class implant One Piece. Dia 3.75mm L 10mm
                      </div>
                      <div className={styles.productItemTextFull}>
                        <div className={styles.productItemTextFullIn}>
                          <div className={styles.productItemText2}>
                            Blue Class implant One Piece. Dia 3.75mm L 10mm
                          </div>
                          <div className={styles.productItemText2_desc}>
                            here wil be desc
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.productItemContainer}>
                      <div className={`${styles.layer}`}></div>
                      <div className={styles.productItemImg}>
                        <Image
                          alt="page cover"
                          src="/img/prod2.png"
                          width={221}
                          height={221}
                          objectFit="scale-down"
                        />
                      </div>
                      <div className={styles.productItemText}>
                        Blue Class implant One Piece. Dia 3.75mm L 10mm
                      </div>
                      <div className={styles.productItemTextFull}>
                        <div className={styles.productItemTextFullIn}>
                          <div className={styles.productItemText2}>
                            Blue Class implant One Piece. Dia 3.75mm L 10mm
                          </div>
                          <div className={styles.productItemText2_desc}>
                            here wil be desc
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.productItemContainer}>
                      <div className={`${styles.layer}`}></div>
                      <div className={styles.productItemImg}>
                        <Image
                          alt="page cover"
                          src="/img/prod1.png"
                          width={221}
                          height={221}
                          objectFit="scale-down"
                        />
                      </div>
                      <div className={styles.productItemText}>
                        Blue Class implant One Piece. Dia 3.75mm L 10mm
                      </div>
                      <div className={styles.productItemTextFull}>
                        <div className={styles.productItemTextFullIn}>
                          <div className={styles.productItemText2}>
                            Blue Class implant One Piece. Dia 3.75mm L 10mm
                          </div>
                          <div className={styles.productItemText2_desc}>
                            here wil be desc
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.productItemContainer}>
                      <div className={`${styles.layer}`}></div>
                      <div className={styles.productItemImg}>
                        <Image
                          alt="page cover"
                          src="/img/prod2.png"
                          width={221}
                          height={221}
                          objectFit="scale-down"
                        />
                      </div>
                      <div className={styles.productItemText}>
                        Blue Class implant One Piece. Dia 3.75mm L 10mm
                      </div>
                      <div className={styles.productItemTextFull}>
                        <div className={styles.productItemTextFullIn}>
                          <div className={styles.productItemText2}>
                            Blue Class implant One Piece. Dia 3.75mm L 10mm
                          </div>
                          <div className={styles.productItemText2_desc}>
                            here wil be desc
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.productItemContainer}>
                      <div className={`${styles.layer}`}></div>
                      <div className={styles.productItemImg}>
                        <Image
                          alt="page cover"
                          src="/img/prod2.png"
                          width={221}
                          height={221}
                          objectFit="scale-down"
                        />
                      </div>
                      <div className={styles.productItemText}>
                        Blue Class implant One Piece. Dia 3.75mm L 10mm
                      </div>
                      <div className={styles.productItemTextFull}>
                        <div className={styles.productItemTextFullIn}>
                          <div className={styles.productItemText2}>
                            Blue Class implant One Piece. Dia 3.75mm L 10mm
                          </div>
                          <div className={styles.productItemText2_desc}>
                            here wil be desc
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.filterContainer}>
            <div className={styles.filterContainerIn}>
              <div className={styles.filterImg}>
                <Image
                  alt="page cover"
                  src="/img/filterimg.png"
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
