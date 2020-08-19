import { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import '../styles/index.css';

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps,
  router,
}: AppProps) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />;
    </AnimatePresence>
  );
};

export default MyApp;
