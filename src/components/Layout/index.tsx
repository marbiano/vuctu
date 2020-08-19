import { motion } from 'framer-motion';
import Sidebar from '../Sidebar';

const Layout: React.FC = ({ children }) => {
  return (
    <div
      className="border-solid border-oranged-black"
      style={{ borderTopWidth: '40px' }}
    >
      <div className="container mx-auto grid grid-cols-12 gap-8 text-oranged-black antialiased">
        <div className="col-span-9 mb-32">
          <motion.div
            transition={{ duration: 0.15, ease: 'easeOut' }}
            initial="pageInitial"
            animate="pageAnimate"
            variants={{
              pageInitial: {
                opacity: 0,
                y: 30,
              },
              pageAnimate: {
                opacity: 1,
                y: 0,
              },
            }}
          >
            {children}
          </motion.div>
        </div>
        <div className="col-start-11 col-span-2 mt-16">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
