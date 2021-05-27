import { FunctionComponent, useEffect } from 'react'
import styles from '../styles/success.module.css'
import { useRouter } from 'next/router'

const Thankyou: FunctionComponent = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push({
        pathname: '/'
      }).catch(e => console.error(e))
    }, 5000)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img src='/success.png' width='500' />
        <span className={styles.title}>Танд баярлалаа. Манайхаар дахин үйлчлүүлээрэй.</span>
      </div>
    </div>
  )
}

export default Thankyou
