import { FunctionComponent, useEffect } from 'react'
import styles from '../styles/success.module.css'
import { useRouter } from 'next/router'

const Success: FunctionComponent = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push({
        pathname: '/thank-you'
      }).catch(e => console.error(e))
    }, 5000)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img src='/success.png' width='500' />
        <span className={styles.title}>Та онгойсон хайрцгаас бараагаа авна уу.</span>
        <span className={styles.description}>Хайрцгаа хаахаа битгий мартаарай.</span>
      </div>
    </div>
  )
}

export default Success
