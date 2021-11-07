import { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useToast } from '@/context/toast'
import { RegisterForm } from '@/components/page-components/forms'

const RegisterPage: FunctionComponent = () => {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
      <Head>
        <title>Meditation | Register</title>
      </Head>
      <div className='flex flex-col justify-center items-center min-w-max h-screen bg-white bg-opacity-30'>
        <RegisterForm
          loading={loading}
          onRegister={() => console.log('register')}
          className='text-gray-500'
        />
      </div>
    </>
  )
}

export default RegisterPage
