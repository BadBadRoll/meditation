import { FunctionComponent, useEffect, useState } from 'react'
import { HiOutlineBackspace } from 'react-icons/hi'
import { useRouter } from 'next/router'

import styles from 'styles/input.module.css'
import { Spin } from 'antd'

const CodeInput: FunctionComponent = () => {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (code.length === 6) {
      setLoading(true)
    }
  }, [code])

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        router.push({
          pathname: '/success'
        }).catch(e => console.error(e))
      }, 3000)
    }
  }, [loading])

  const onChange = (input: string): void => {
    if (loading) {
      return
    }
    if (code.length < 6) {
      setFailed(false)
      setCode(code + input)
    }
  }

  const onKeyPress = (button: string): void => {
    if (!loading) {
      setCode(code.slice(0, -1))
    }
  }

  const renderCode = (idx: number): any => {
    if (loading) {
      return <Spin size='large' />
    } else {
      if (code[idx + 1] !== undefined) {
        return '*'
      } else {
        return code[idx]
      }
    }
  }

  const handleSuccess = (): void => {
    router.push({
      pathname: '/success'
    }).catch(e => console.error(e))
  }

  const handleFail = (): void => {
    setCode('')
    setLoading(false)
    setFailed(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img src='/input.png' alt='input' width='500' />
        <div className={styles.input}>
          {
            failed ? (
              <p className={styles.error}>
                Амжилтгүй.<br />Та нууц дугаараа дахин оруулна уу.
              </p>
            ) : (
              <p className={styles.description}>
                Та 6 оронтой нууц дугаараа оруулна уу.
              </p>
            )
          }
          <div className={styles.confirmationCode}>
            <button className={styles.codeBox}>{renderCode(0)}</button>
            <button className={styles.codeBox}>{renderCode(1)}</button>
            <button className={styles.codeBox}>{renderCode(2)}</button>
            <button className={styles.codeBox}>{renderCode(3)}</button>
            <button className={styles.codeBox}>{renderCode(4)}</button>
            <button className={styles.codeBox}>{loading ? <Spin size='large' /> : code[5]}</button>
          </div>
          <div className={styles.keyboard}>
            <div className={styles.keyboardRow}>
              <Key label='1' onChange={onChange} />
              <Key label='2' onChange={onChange} />
              <Key label='3' onChange={onChange} />
            </div>
            <div className={styles.keyboardRow}>
              <Key label='4' onChange={onChange} />
              <Key label='5' onChange={onChange} />
              <Key label='6' onChange={onChange} />
            </div>
            <div className={styles.keyboardRow}>
              <Key label='7' onChange={onChange} />
              <Key label='8' onChange={onChange} />
              <Key label='9' onChange={onChange} />
            </div>
            <div className={styles.keyboardRow}>
              <span
                style={{ backgroundColor: '#efefef' }}
                className={styles.keyButton}
                onClick={handleSuccess}
              />
              <Key label='0' onChange={onChange} />
              <span
                className={styles.keyButton}
                style={{ color: 'red' }}
                onClick={() => onKeyPress('del')}
              >
                <HiOutlineBackspace />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.confirmationCode}>
          <button onClick={handleSuccess}>success</button>
          <button onClick={handleFail}>fail</button>
        </div>
      </div>
    </div>
  )
}
interface KeyProp{
  label: string
  onChange: (key: string) => void
}
const Key: FunctionComponent<KeyProp> = (props) => {
  return <span className={styles.keyButton} onClick={() => props.onChange(props.label)}>{props.label}</span>
}

export default CodeInput
