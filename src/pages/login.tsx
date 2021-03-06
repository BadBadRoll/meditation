import { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { LoginFields, LoginForm } from '@/components/page-components/forms'
import instance from '@/service/axios/axiosConfig'
import { loadState, saveState } from '@/misc/localStorage'

const LoginPage: FunctionComponent = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async ({ email, password }: LoginFields): Promise<void> => {
    if (loading) {
      return
    }
    setLoading(true)
    try {
      const body = {
        email: email,
        password: password
      }
      await instance.post('/user/token/auth', body).then(res => {
        const token = res.data.data.token
        saveState('token', token)
      })
    } catch (err: any) {
      console.error(err.message)
    } finally {
      const routePath = loadState('redirectPath')
      router.push((routePath !== undefined && routePath !== null) ? routePath : '/').catch(err => console.log(err))
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Meditation | Login</title>
      </Head>
      <div className='flex flex-col justify-center items-center min-w-max h-screen bg-white bg-opacity-30 shadow-2xl'>
        <LoginForm
          loading={loading}
          onLogin={handleLogin}
          className='text-gray-500'
        />
      </div>
    </>
  )
}

export default LoginPage
