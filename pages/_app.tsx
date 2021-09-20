import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { appHeight } from '../lib/style-lib';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    // Loaded?
    window.addEventListener('resize', appHeight);
    appHeight();
  }, []);

  return <Component {...pageProps} />
}
export default MyApp
