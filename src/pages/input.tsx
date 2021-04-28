import { FunctionComponent, useState } from 'react'
import Image from 'next/image'
import styles from 'styles/input.module.css'
import ReactCodeInput from 'react-verification-code-input'

const CodeInput: FunctionComponent = () => {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (value: string): void => {
    console.log(code)
    setCode(value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.input}>
          <p className={styles.description}>
            Та 6 оронтой нууц дугаараа оруулна уу.
          </p>
          <ReactCodeInput
            type='text'
            onChange={handleChange}
            loading={loading}
            onComplete={() => setLoading(true)}
          />
        </div>
        <Image src='/input.png' alt='input' width='320' height='300' />
      </div>
    </div>
  )
}
export default CodeInput
