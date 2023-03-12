import styles from "./index.module.css";
import Image from "next/image";
import NavLink from "../../components/NavLink";
import Head from "next/head";
import { showSiteData } from "../../store/slices/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, i18n } from "next-i18next";
import { getSiteDataAsync } from "../../store/slices/generalSlice";
import IconComponent from "../../components/iconComponent";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import validator from "validator";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";
import { whatLanguage } from "../../utils/helperFunctions";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  emptyCart,
} from "../../store/slices/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function TextInput({
  type = "text",
  label,
  name,
  required = false,
  value,
  setter,
}) {
  // const [value, setValue] = useState("");

  function handleChange(e) {
    setter(e.target.value);
  }

  return (
    <div className={styles.footerFormInput}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        name={name}
        required={required}
      />
      <label className={value && styles.filled} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
const Cart = ({ lang }) => {
  const router = useRouter();
  const { t } = useTranslation(["common", "contact"]);
  const cart = useSelector((state) => state.cart.cart);
  const form = useRef();
  const table = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteDataAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const siteData = useSelector(showSiteData);

  //all serves <--start-->
  const myLoader = ({ src, width, quality }) => {
    return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${src}?w=${width}&q=${
      quality || 75
    }`;
  };
  const [from_email, setFromEmail] = useState("");
  const [full_name, setFull_name] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [sendStatus, setSendStatus] = useState(false);
  const thetable = table?.current?.innerHTML | "";
  const changeQuantity = (action, itemindex, theqty, dispatch) => {
    if (action !== "plus" && action !== "minus" && action !== "manual") return;
    let newarr = [...cart];

    let newqty = 0;

    if (action === "plus") {
      newqty = newarr[itemindex].qty + theqty;
    }
    if (action === "minus") {
      newqty = newarr[itemindex].qty - theqty;
    }
    // if (action === "manual") {
    //   newarr[itemindex].qty = theqty;
    // }
    dispatch(
      setQuantity({ id: newarr[itemindex].id, qty: newqty <= 0 ? 1 : newqty })
    );
  };
  //all serves <--end-->
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
  const sendEmail = async (e, cart) => {
    e.preventDefault();

    setSendStatus(true);
    const inputData = e.target.elements;
    if (inputData.from_email) {
      if (validator.isEmail(inputData.from_email.value)) {
        console.log("valid email");
      } else {
        // alert("Enter valid Email!");
        notify(`${t("contact:emailerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }

    if (inputData.full_name) {
      if (
        validator.isAlpha(inputData.full_name.value, ["he"], {
          ignore: " ",
        }) ||
        validator.isAlpha(inputData.full_name.value, ["en-US"], {
          ignore: " ",
        })
      ) {
        console.log("valid name");
      } else {
        notify(`${t("contact:fullnameerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }
    if (inputData.phone && inputData.phone.value.trim() !== "") {
      if (validator.isMobilePhone(inputData.phone.value, ["he-IL"])) {
        console.log("valid phone");
      } else {
        notify(`${t("contact:phoneerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }
    if (inputData.message && inputData.message.value.trim() !== "") {
      if (
        validator.isAlphanumeric(inputData.message.value, ["he"], {
          ignore: " ,.?:@()[]-_",
        }) ||
        validator.isAlphanumeric(inputData.message.value, ["en-US"], {
          ignore: " ,.?:@()[]-_",
        })
      ) {
        console.log("valid message");
      } else {
        notify(`${t("contact:messageerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }
    if (inputData.company && inputData.company.value.trim() !== "") {
      if (
        validator.isAlphanumeric(inputData.company.value, ["he"], {
          ignore: " ()-_",
        }) ||
        validator.isAlphanumeric(inputData.company.value, ["en-US"], {
          ignore: " ()-_",
        })
      ) {
        console.log("valid company");
      } else {
        notify(`${t("contact:companyerror")}`, "error");
        setSendStatus(false);
        return;
      }
    }
    // create a new dov container
    let div = document.createElement("div");

    // assing your HTML to div's innerHTML
    div.innerHTML = document.getElementById("mytable").innerHTML;

    // get all <a> elements from div
    let elements = div.getElementsByTagName("button");

    // remove all <a> elements
    while (elements[0]) elements[0].parentNode.removeChild(elements[0]);

    // get div's innerHTML into a new variable
    const repl = div.innerHTML;
    const templateParams = {
      full_name: inputData.full_name.value,
      phone: inputData.phone.value,
      company: inputData.company.value,
      from_email: inputData.from_email.value,
      message: inputData.message.value + "<br />" + repl,
    };
    emailjs
      .send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        // form.current,
        templateParams,
        process.env.EMAILJS_USER_ID
      )
      .then(
        (result) => {
          notify(`${t("contact:formsuccess")}`, "success");
          setFromEmail("");
          setFull_name("");
          setPhone("");
          setCompany("");
          setMessage("");
          setSendStatus(false);
          dispatch(emptyCart());
          // inputData.from_email.value = "";
          // inputData.full_name.value = "";
          // inputData.phone.value = "";
          // inputData.company.value = "";
          // inputData.message.value = "";
        },
        (error) => {
          setSendStatus(false);
          notify(`${t("contact:formerror")}`, "error");
        }
      );
  };
  return (
    <section>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Head>
        <meta charSet="utf-8" />
        <title>
          {siteData?.["Title"]} | {t("common:shoppingcart")}
        </title>
      </Head>
      <div id="pageCover" className={styles.pageCover}>
        <Image
          alt="page cover"
          src="/img/contactcover.png"
          layout="fill"
          objectFit="cover"
        />
        {/* <div className={styles.coverTitle}>SERVES</div> */}
      </div>
      <div id="pageData" className={styles.pageData}>
        <div id="pageDataIn" className={styles.pageDataIn}>
          <div className={styles.pageNavigator}>
            <NavLink
              href="/"
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title={t("common:home")}
            />
            /
            <NavLink
              href="/cart"
              className={styles.navlink}
              activeClassName={styles.navlink__active}
              title={t("common:shoppingcart")}
            />
          </div>
          <div className={styles.pageRealData}>
            <div className={styles.contentParagraph}>
              {cart.length === 0 ? (
                <div style={{ fontSize: "20px" }}>{t("common:cartempty")}</div>
              ) : (
                <div>
                  <div className={styles.formAndText}>
                    <div
                      id="footerContainer_in"
                      className={styles.footerContainer_in}
                    >
                      <div id="footerForm" className={styles.footerForm}>
                        <div className={styles.footerTitles}>
                          <h1>{t("common:shoppingcart")}</h1>
                        </div>
                        <div
                          className={styles.tableContainer}
                          ref={table}
                          id="mytable"
                        >
                          <table>
                            <tr>
                              <th>{t("common:cartproduct")}</th>
                              <th width="25%">{t("common:quantity")}</th>
                              <th width="10%"></th>
                            </tr>
                            {cart?.map((item, index) => {
                              return (
                                <>
                                  <tr key={index} className={styles.spacing}>
                                    <td>
                                      <div className={styles.tableTitle}>
                                        {item.title}
                                      </div>
                                    </td>
                                    <td>
                                      <div className={styles.qtyContainer}>
                                        <div className={styles.qtyBtn}>
                                          <button
                                            onClick={() =>
                                              changeQuantity(
                                                "plus",
                                                index,
                                                1,
                                                dispatch
                                              )
                                            }
                                          >
                                            +
                                          </button>
                                        </div>
                                        <div className={styles.qtyInput}>
                                          <input
                                            type="number"
                                            min="1"
                                            max="9"
                                            step="1"
                                            value={item.qty}
                                            disabled
                                          />
                                        </div>
                                        <div className={styles.qtyBtn}>
                                          <button
                                            onClick={() => {
                                              changeQuantity(
                                                "minus",
                                                index,
                                                1,
                                                dispatch
                                              );
                                            }}
                                          >
                                            -
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        onClick={() =>
                                          dispatch(removeItem(item.id))
                                        }
                                      >
                                        <IconComponent
                                          type="fab"
                                          name="fa-trash"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </table>
                        </div>
                      </div>
                      <div id="footerText" className={styles.footerText}>
                        <div className={styles.footerTitles}>
                          <h1>{t("common:order")}</h1>
                        </div>
                        <div className={styles.footerInfo}>
                          <form ref={form} onSubmit={(e) => sendEmail(e, cart)}>
                            <div className={styles.footerFormRow}>
                              <TextInput
                                type="input"
                                label={t("common:email")}
                                name="from_email"
                                setter={setFromEmail}
                                value={from_email}
                              />
                              <TextInput
                                type="input"
                                label={t("common:fullname")}
                                name="full_name"
                                setter={setFull_name}
                                value={full_name}
                              />
                            </div>
                            <div className={styles.footerFormRow}>
                              <TextInput
                                label={t("common:cellphone")}
                                name="phone"
                                setter={setPhone}
                                value={phone}
                              />
                              <TextInput
                                label={t("common:company")}
                                name="company"
                                setter={setCompany}
                                value={company}
                              />
                            </div>
                            <div
                              className={styles.footerFormRow}
                              style={{ flexDirection: "column" }}
                            >
                              <div className={styles.footerFormTextAreaTitle}>
                                {t("common:message")}
                              </div>
                              <div className={styles.footerFormTextArea}>
                                <textarea
                                  placeholder=""
                                  name="message"
                                  onChange={(e) => setMessage(e.target.value)}
                                  value={message}
                                ></textarea>
                              </div>
                            </div>
                            <div className={styles.footerFormRow}>
                              <div className={styles.formSubmit}>
                                <input
                                  type="hidden"
                                  name="thetable"
                                  value={thetable}
                                />
                                <button disabled={sendStatus}>
                                  {sendStatus ? (
                                    <BeatLoader
                                      color="#ffffff"
                                      size={15}
                                      aria-label="Loading Spinner"
                                      data-testid="loader"
                                    />
                                  ) : (
                                    t("common:send")
                                  )}
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
export async function getServerSideProps({ locale }) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "he")),
      lang: locale ?? "he",
      // Will be passed to the page component as props
    },
  };
}
export default Cart;
