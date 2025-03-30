import { Suspense, useEffect } from 'react';
import { useMatches } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../Header/Header.jsx';
import { AppLoader } from 'components/UI';
import { getSeo } from '../../seo';
import { useState } from 'react';
import Footer from '../Footer/Footer.jsx';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const AppLayout = ({ children }) => {
  const matches = useMatches();
  const currentRouteName = matches.find(match => match.handle)?.handle.routeName;

  const [seo, setSeo] = useState({});
  const { pathname } = useLocation();
  useEffect(() => {
    const t = getSeo(currentRouteName);
    setSeo(t);
  }, [currentRouteName]);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        {seo.meta?.map(({ name, content }, index) => (
          <meta key={index} name={name} content={content} />
        ))}
      </Helmet>
      <Header className={['/'].includes(pathname) ? 'home' : ''} />
      <main>
        <Suspense fallback={<AppLoader visible={true} />}>{children}</Suspense>
      </main>
      <Footer />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default AppLayout;
