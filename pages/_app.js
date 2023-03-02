import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import "../styles/globals.css";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";
import { store, persistor } from "../store/index";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { NextProgressbarSpinner } from "nextjs-progressbar-spinner";
import { HEADERContextProvider } from "../components/contexts/HeaderContext";

// function Loading() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const handleStart = (url) => url !== router.asPath && setLoading(true);
//     const handleCompelete = (url) =>
//       url === router.asPath &&
//       setTimeout(() => {
//         setLoading(false);
//       }, 2000);

//     router.events.on("routeChangeStart", handleStart);
//     router.events.on("routeChangeComplete", handleCompelete);
//     router.events.on("routeChangeError", handleCompelete);

//     return () => {
//       router.events.off("routeChangeStart", handleStart);
//       router.events.off("routeChangeComplete", handleCompelete);
//       router.events.off("routeChangeError", handleCompelete);
//     };
//   });

//   return (
//     loading && (
//       <div className="spinner-wrapper" style={{ zIndex: 5 }}>
//         <div className="spinner"></div>
//       </div>
//     )
//   );
// }
// let persistor = persistStore(store);
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    router.isReady && setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HEADERContextProvider>
            <Layout>
              <>
                {loading ? (
                  <>
                    <div className="spinner-wrapper" style={{ zIndex: 5 }}>
                      <NextProgressbarSpinner
                        NextNProgressProps={{
                          color: "#61DCFB",
                          progressBarVisibility: "hidden",
                          startPosition: 0.3,
                          stopDelayMs: 200,
                          height: 1,
                          showOnShallow: true,
                          options: { showSpinner: true },
                        }}
                        spinnerType="CircleLoader"
                        spinnerProps={{
                          size: "2rem",
                          color: "#61DCFB",
                          // cssOverride: {},
                          // speedMultiplier: 2.5,
                          // height: 5,
                          // width: 5,
                          // radius: 5,
                          // margin: 5,
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <Component {...pageProps} />
                )}
              </>
            </Layout>
          </HEADERContextProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
export default appWithTranslation(MyApp);
