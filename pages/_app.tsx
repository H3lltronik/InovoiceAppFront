import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { appHeight } from '../lib/style-lib';
import { AnimatePresence, motion } from 'framer-motion';

function MyApp({ Component, pageProps, router }: AppProps) {

  useEffect(() => {
    window.addEventListener('resize', appHeight);
    appHeight();
  }, []);

  return <AnimatePresence>
    <motion.div className="overflow-hidden" key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
      pageInitial: {
        opacity: 0,
      },
      pageAnimate: {
        opacity: 1,
      },
    }}>
      <Component {...pageProps} />
    </motion.div>
  </AnimatePresence>
}
export default MyApp
