import { FunctionComponent } from 'react'
import styles from '../styles/success.module.css'

const Thankyou: FunctionComponent = () => {
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
