import { AppProps } from 'next/app';
import { motion } from 'framer-motion';
import '../styles/index.css';

const MyApp: React.FC<AppProps> = ({
  Component,
  pageProps,
  router,
}: AppProps) => {
  return (
    <motion.div
      key={router.route}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0,
          y: 40,
        },
        pageAnimate: {
          opacity: 1,
          y: 0,
        },
      }}
    >
      <Component {...pageProps} />
    </motion.div>
  );
};

export default MyApp;
