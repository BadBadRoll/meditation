import '../styles/globals.css'
import { FunctionComponent } from 'react'
import type { AppProps } from 'next/app'
import AuthLayout from 'layouts/auth'
import AdminLayout from 'layouts/admin'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps, router }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('_token') : undefined

  const isAuthPath = router.pathname === '/login' || router.pathname === '/register'

  if ((token === undefined || token === null) && !isAuthPath) {
    if (typeof window !== 'undefined') {
    localStorage.setItem('redirectPath', router.asPath);
  }
    router.push('/login')
  }

  if ((token !== undefined && token !== null) && isAuthPath) {
    const redirectPath = localStorage.getItem('redirectPath')
    if (redirectPath !== undefined && redirectPath !== null) {
localStorage.removeItem('redirectPath')
      router.push(redirectPath)
    } else {
      router.push('/')
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
          <AdminLayout>
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
