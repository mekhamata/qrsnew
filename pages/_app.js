import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import '../styles/globals.css';
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import store from '../store/index';


function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleCompelete = (url) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 2000);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleCompelete);
    router.events.on('routeChangeError', handleCompelete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleCompelete);
      router.events.off('routeChangeError', handleCompelete);
    };
  });

  return (
    loading && (
      <div className='spinner-wrapper'>
        <div className='spinner'></div>
      </div>
    )
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Loading />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp);
