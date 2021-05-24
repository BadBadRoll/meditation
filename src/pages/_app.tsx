import '../styles/globals.css'
import { FunctionComponent } from 'react'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
