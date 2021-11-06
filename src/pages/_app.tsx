import '../styles/globals.css'
import { FunctionComponent } from 'react'
import type { AppProps } from 'next/app'
import AuthLayout from 'layouts/auth'
import AdminLayout from 'layouts/admin'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface StateType {
  loaded?: boolean
  token?: string | null
}

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps, router }) => {
  // const [state, setState] = useReducer(
  //   (state: StateType, newState: StateType) => ({ ...state, ...newState }),
  //   {
  //     loaded: false,
  //     token: null,
  //     notification: { text: '', open: false, color: 'error' }
  //   }
  // )

  // const showNotification = (text: string, color: AlertColor): void => {
  //   setState({
  //     notification: { text, open: true, color }
  //   })
  // }

  // const handleLogin = async (res: IJwt): Promise<void> => {
  //   const { token } = res
  //   saveState('token', token)
  //   init().catch(e => console.error(e))
  //   // setState({
  //   //   token
  //   // })
  // }

  // const init = async (): Promise<void> => {
  //   const token = await setup()
  //   setState({
  //     token,
  //     loaded: true
  //   })
  // }

  // useEffect(() => {
  //   init().catch(e => console.error(e))
  // }, [])

  // const setup = async (): Promise<string | undefined | null> => {
  //   let token: string | undefined | null = loadState('token')
  //   if (token !== undefined && token !== null) {
  //     try {
  //       const payload = jwt.decode(token) as IAuthToken
  //       const exp = dayjs.unix(payload.exp)
  //       const duration = exp.diff(dayjs(), 'hours')
  //       if (exp.isBefore(dayjs())) { // expired
  //         removeState('token')
  //         token = null
  //       }
  //     } catch (error) {
  //       console.error(error)
  //       removeState('token')
  //       token = null
  //     }
  //   }

  //   return token
  // }

  // if (!state.loaded) {
  //   return (
  //     <div style={{
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       height: '100vh'
  //     }}
  //     >
  //       <CircularProgress size={60} />
  //     </div>
  //   )
  // }

  const isAuthPath = router.pathname === '/login' || router.pathname === '/set-password' || router.pathname === '/forgot-password' || router.pathname === '/confirm-email'

  // if ((state.token === undefined || state.token === null) && !isAuthPath) {
  //   saveState('redirectPath', router.asPath)
  //   router.push('/login')
  //   return <div />
  // }

  // if ((state.token !== undefined && state.token !== null) && isAuthPath) {
  //   const redirectPath = loadState('redirectPath')
  //   if (redirectPath !== undefined && redirectPath !== null) {
  //     removeState('redirectPath')
  //     router.push(redirectPath)
  //   } else {
  //     router.push('/')
  //   }
  //   return <div />
  // }

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
