import '../styles/globals.css'
import { FunctionComponent } from 'react'
import type { AppProps } from 'next/app'

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
