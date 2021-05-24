import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useRouter } from 'next/router'

import { FunctionComponent } from 'react'

const Home: FunctionComponent = () => {
  const router = useRouter()

  const handlePush = async (): Promise<void> => {
    router.push({
      pathname: 'input'
    }).catch(e => console.error(e))
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Stora locker</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main} onClick={handlePush}>
        <h1 className={styles.title}>
          Welcome to <a>STORABOX!</a>
        </h1>

        <p className={styles.description}>
          Та захиалсан бараагаа авах бол энд дарна уу.
        </p>

        <a className={styles.card}>
          <h3>Ашиглах заавар &rarr;</h3>
          <p>Танилцуулга видео энд байрлана.</p>
        </a>
      </main>
    </div>
  )
}
export default Home
