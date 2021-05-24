import { FunctionComponent } from 'react'
import styles from '../styles/success.module.css'

const Success: FunctionComponent = () => {
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