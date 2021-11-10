import { FunctionComponent } from 'react'
import Head from 'next/head'

import { RegisterForm } from '@/components/page-components/forms'

const RegisterPage: FunctionComponent = () => {
  return (
    <>
      <Head>
        <title>Meditation | Register</title>
      </Head>
      <div className='flex flex-col justify-center items-center min-w-max h-screen bg-white bg-opacity-30'>
        <RegisterForm
          onRegister={() => console.log('register')}
          className='text-gray-500'
        />
      </div>
    </>
  )
}

export default RegisterPage
