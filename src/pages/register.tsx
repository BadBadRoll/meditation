import { FunctionComponent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Tab, Tabs } from '@material-ui/core'

import { useToast } from '@/context/toast'
import { RegisterForm, RegisterFields } from '@/components/page-components/forms'

enum LoginTab {
  LOGIN = '/account/login',
  SIGN_UP = '/account/register'
}

const RegisterPage: FunctionComponent = () => {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [verification, setVerification] = useState<{ verificationId: string, phone: string } | null>(null)

  return (
    <div className='md:my-8 w-full flex flex-col justify-center items-center p-6'>
      <div className='bg-white'>
            <div className='w-full p-6 md:p-10 my-2 md:my-0 flex flex-col items-start relative'>
              <Tabs
                value={LoginTab.SIGN_UP}
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
                  classes={{
                    root: 'border-b border-gray-300 border-solid'
                  }}
                />
                <Tab
                  label={<h2 className='text-xl'>Бүртгүүлэх</h2>}
                  value={LoginTab.SIGN_UP}
                />
              </Tabs>
              <RegisterForm
                loading={loading}
                onRegister={() => console.log('register')}
              />
            </div>
      </div>
    </div>
  )
}

export default RegisterPage
