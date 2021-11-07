import { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useToast } from '@/context/toast'
import { LoginForm } from '@/components/page-components/forms'

const LoginPage: FunctionComponent = () => {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
      <Head>
        <title>Meditation | Login</title>
      </Head>
      <div className='flex flex-col justify-center items-center min-w-max h-screen bg-white bg-opacity-30'>
        {/* <h1 className='text-2xl my-4 md:my-12'> {translate('auth.login.alreadyRegistered')}</h1> */}
        <LoginForm
          loading={loading}
          onLogin={() => console.log('login')}
          className='text-gray-500'
        />
      </div>
    </>
  )
}

export default LoginPage
