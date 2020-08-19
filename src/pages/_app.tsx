import { AppProps } from 'next/app';
import '../styles/index.css';

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps,
  router,
}: AppProps) => {
  return <Component {...pageProps} key={router.route} />;
};

export default MyApp;
