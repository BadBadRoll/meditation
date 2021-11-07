import { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Tab, Tabs } from '@material-ui/core'

import { useToast } from '@/context/toast'
import { LoginForm } from '@/components/page-components/forms'

enum LoginTab {
  LOGIN = '/login',
  SIGN_UP = '/register'
}

const LoginPage: FunctionComponent = () => {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
      <Head>
        <title>Meditation | Login</title>
      </Head>
      <div className='md:my-8 flex flex-col justify-center items-center p-6 min-w-max'>
        {/* <h1 className='text-2xl my-4 md:my-12'> {translate('auth.login.alreadyRegistered')}</h1> */}
        <div className='bg-white bg-opacity-30 flex-1 p-6 md:p-10 my-2 md:my-0 flex flex-col items-start relative rounded-2xl'>
          <Tabs
            value={LoginTab.LOGIN}
            centered
            onChange={async (_e, value: LoginTab) => {
              if (Object.values(LoginTab).includes(value)) {
                await router.push({
                  pathname: value
                })
              }
            }}
            classes={{
              root: 'w-full'
            }}
            variant='fullWidth'
          >
            <Tab
              label={<h2 className='text-xl'>Нэвтрэх</h2>}
              value={LoginTab.LOGIN}
            />
            <Tab
              label={<h2 className='text-xl'>Бүртгүүлэх</h2>}
              value={LoginTab.SIGN_UP}
              classes={{
                root: 'border-b border-gray-300 border-solid'
              }}
            />
          </Tabs>
          <LoginForm
            loading={loading}
            onLogin={() => console.log('login')}
          />
        </div>
      </div>
    </>
  )
}

export default LoginPage
