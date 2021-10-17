import Head from 'next/head'

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
    <div>
      <Head>
        <title>Meditation | Admin</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main onClick={handlePush}>
        <h1>
          Welcome to <a>STORABOX!</a>
        </h1>
        <p>
          Та захиалсан бараагаа авах бол энд дарна уу.
        </p>
        <a>
          <h3>Ашиглах заавар &rarr;</h3>
          <p>Танилцуулга видео энд байрлана.</p>
        </a>
      </main>
    </div>
  )
}
export default Home
