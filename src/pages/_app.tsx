import '../styles/globals.css'
import { FunctionComponent, useEffect, useReducer } from 'react'
import type { AppProps } from 'next/app'
import AuthLayout from 'layouts/auth'
import AdminLayout from 'layouts/admin'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { loadState, removeState, saveState } from '@/misc/localStorage'
dayjs.extend(relativeTime)

interface StateType {
  loaded?: boolean
  token?: string | null
}

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps, router }) => {
  const [state, setState] = useReducer(
    (state: StateType, newState: StateType) => ({ ...state, ...newState }),
    {
      loaded: false,
      token: null
    }
  )

  const init = async (): Promise<void> => {
    const token: string | undefined | null = loadState('token')
    setState({
      token
    })
  }

  useEffect(() => {
    init().catch(err => console.log(err))
  }, [state.token])

  const isAuthPath = router.pathname === '/login' || router.pathname === '/register'

  if ((state.token === undefined || state.token === null) && !isAuthPath && typeof window !== 'undefined') {
    saveState('redirectPath', router.asPath)
    router.push('/login').catch(err => console.log(err))
    return <div />
  }

  if ((state.token !== undefined && state.token !== null) && isAuthPath) {
    const redirectPath = loadState('redirectPath')
    if (redirectPath !== undefined && redirectPath !== null) {
      removeState('redirectPath')
      router.push(redirectPath).catch(err => console.log(err))
    } else {
      router.push('/').catch(err => console.log(err))
    }
    return <div />
  }

  return (
    // <AppProvider.Provider value={{
    //   token: state.token,
    //   handleLogin,
    //   showNotification
    // }}>
    <>
      {
        isAuthPath ? (
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        ) : (
          <AdminLayout token={state.token}>
            <Component {...pageProps} />
          </AdminLayout>
        )
      }
      {/* <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={state.notification.open}
        autoHideDuration={5000}
        onClose={() => {
          setState({
            notification: update(state.notification, { open: { $set: false } })
          })
        }}
      >
        <Alert style={{ minWidth: 300, maxWidth: 500 }} severity={state.notification.color}>
          {state.notification.text}
        </Alert>
      </Snackbar> */}
    </>
    // </AppProvider.Provider>
  )
}

export default MyApp
